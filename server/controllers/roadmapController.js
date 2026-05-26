const ROADMAPS = {
  "Full Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node",
    "MongoDB",
    "SQL",
    "Git",
    "Docker",
    "AWS"
  ],

  "AI Engineer": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "SQL",
    "Git"
  ],

  "Blockchain Developer": [
    "JavaScript",
    "React",
    "Node",
    "Solidity",
    "Hardhat",
    "Git"
  ]
};

exports.getSkillGap = (req, res) => {

  const { role } = req.body;

  const db = require("../config/db");

  const student_id = req.params.student_id;

  const requiredSkills = ROADMAPS[role];

  if (!requiredSkills) {
    return res.status(400).json({
      message: "Role not found"
    });
  }

  const query = `
    SELECT sk.name
    FROM student_skills ss
    JOIN skills sk ON ss.skill_id = sk.id
    WHERE ss.student_id = ?
  `;

  db.query(query, [student_id], (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    const studentSkills = results.map(r => r.name);

    const have = [];
    const missing = [];

    requiredSkills.forEach(skill => {

      if (studentSkills.includes(skill)) {
        have.push(skill);
      } else {
        missing.push(skill);
      }

    });

    res.json({
      role,
      have,
      missing
    });

  });

};