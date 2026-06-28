const db = require("../config/db");

exports.addCompany = (req, res) => {
    const { name, min_cgpa, required_skill } = req.body;

    const sql = "INSERT INTO companies (name, min_cgpa, required_skill) VALUES (?, ?, ?)";

    db.query(sql, [name, min_cgpa, required_skill], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Company added" });
    });
};

exports.getCompanies = (req, res) => {
    const sql = "SELECT * FROM companies";

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results);
    });
};

exports.checkEligibility = (req, res) => {

    const { student_id } = req.params;

    const query = `

        SELECT
            c.id,
            c.name,
            c.min_cgpa,
            c.required_skill,
            s.cgpa,

            CASE
                WHEN s.cgpa >= c.min_cgpa
                THEN 1
                ELSE 0
            END AS cgpa_match,

            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM student_skills ss
                    JOIN skills sk
                    ON ss.skill_id = sk.id
                    WHERE ss.student_id = s.id
                    AND LOWER(sk.name) =
                    LOWER(c.required_skill)
                )
                THEN 1
                ELSE 0
            END AS skill_match

        FROM companies c

        JOIN students s
        ON s.id = ?
    `;

    db.query(
        query,
        [student_id],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            const formatted = results.map((c) => {

                let readiness = 0;

                if (c.cgpa_match) readiness += 40;

                if (c.skill_match) readiness += 60;

                return {

                    ...c,

                    readiness,

                    status:
                        readiness >= 80
                        ? "Eligible"
                        : "Locked",

                    strengths: [
                        ...(c.cgpa_match
                            ? ["CGPA Match"]
                            : []),

                        ...(c.skill_match
                            ? [c.required_skill]
                            : [])
                    ],

                    missing: [
                        ...(!c.skill_match
                            ? [c.required_skill]
                            : [])
                    ]
                };
            });

            res.json(formatted);
        }
    );
};

exports.dashboardStats = (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM students) AS total_students,
            (SELECT COUNT(*) FROM companies) AS total_companies,
            (SELECT COUNT(*) FROM applications) AS total_applications
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results[0]);
    });
};
