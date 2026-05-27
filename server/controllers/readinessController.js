const db = require("../config/db");

exports.getReadinessScore = (req, res) => {

  const { student_id } = req.params;

  const query = `

    SELECT

      (
        SELECT COUNT(*)
        FROM student_skills
        WHERE student_id = ?
      ) AS skills_count,

      (
        SELECT xp
        FROM student_progress
        WHERE student_id = ?
      ) AS xp,

      (
        SELECT streak
        FROM student_progress
        WHERE student_id = ?
      ) AS streak,

      (
        SELECT COUNT(*)
        FROM completed_tasks
        WHERE student_id = ?
      ) AS completed_tasks,

      (
        SELECT COUNT(*)
        FROM resumes
        WHERE student_id = ?
      ) AS resume_count
  `;

  db.query(
    query,
    [
      student_id,
      student_id,
      student_id,
      student_id,
      student_id
    ],
    (err, results) => {

      if (err) {
        return res.status(500).json(err);
      }

      const data = results[0] || {};

      let score = 0;

      score += Math.min(
        (data.skills_count || 0) * 10,
        40
      );

      score += Math.min(
        Math.floor((data.xp || 0) / 50),
        20
      );

      score += Math.min(
        (data.streak || 0) * 2,
        10
      );

      score += Math.min(
        (data.completed_tasks || 0) * 5,
        20
      );

      if ((data.resume_count || 0) > 0) {
        score += 10;
      }
      if (score > 100) {
        score = 100;
      }

      res.json({
        readiness_score: score
      });
    }
  );
};