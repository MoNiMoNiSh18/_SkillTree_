const db = require("../config/db");

exports.getTasks = (req, res) => {

    const { role } = req.params;
    const { student_id } = req.query;

    const query = `
        SELECT 
            dt.*,
            CASE
                WHEN ct.task_id IS NOT NULL THEN 1
                ELSE 0
            END AS completed
        FROM daily_tasks dt
        LEFT JOIN completed_tasks ct
        ON dt.id = ct.task_id
        AND ct.student_id = ?
        WHERE dt.role_name = ?
        ORDER BY dt.day_number
    `;

    db.query(query, [student_id, role], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

exports.completeTask = (req, res) => {

    const { student_id, task_id } = req.body;

    const insertTaskQuery = `
        INSERT IGNORE INTO completed_tasks (student_id, task_id)
        VALUES (?, ?)
    `;

    db.query(insertTaskQuery, [student_id, task_id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }
        const progressQuery = `
    SELECT streak, last_completed
    FROM student_progress
    WHERE student_id = ?
`;

db.query(progressQuery, [student_id], (err2, progressResults) => {

    if (err2) {
        return res.status(500).json(err2);
    }

    const progress = progressResults[0];

    let newStreak = 1;

    const today = new Date();

    const lastDate = progress.last_completed
        ? new Date(progress.last_completed)
        : null;

    if (lastDate) {

        const diffTime = today - lastDate;

        const diffDays = Math.floor(
            diffTime / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
            newStreak = progress.streak + 1;
        }
        else if (diffDays === 0) {
            newStreak = progress.streak;
        }
    }

    const updateQuery = `
        UPDATE student_progress
        SET 
            xp = xp + 50,
            level_no = FLOOR((xp + 50) / 100) + 1,
            streak = ?,
            last_completed = CURDATE()
        WHERE student_id = ?
    `;

    db.query(
        updateQuery,
        [newStreak, student_id],
        (err3) => {

            if (err3) {
                return res.status(500).json(err3);
            }

            res.json({
                message: "Task completed + XP + streak updated"
            });
        }
    );
});
    });
};

exports.getProgress = (req, res) => {

    const { student_id } = req.params;

    const query = `
        SELECT *
        FROM student_progress
        WHERE student_id = ?
    `;

    db.query(query, [student_id], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results[0]);
    });
};
