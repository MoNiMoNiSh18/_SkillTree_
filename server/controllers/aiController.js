const fs = require("fs");
const pdf = require("pdf-parse");
const db = require("../config/db");

const SKILLS = [
  "C",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "React",
  "Node",
  "Express",
  "MongoDB",
  "MySQL",
  "SQL",
  "HTML",
  "CSS",
  "Tailwind",
  "Bootstrap",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Machine Learning",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "Data Structures",
  "Algorithms",
  "DSA",
  "Next.js",
  "TypeScript",
  "REST API",
  "Linux",
  "Firebase",
  "Redux",
  "Spring Boot"
];

exports.uploadResume = async (req, res) => {
  try {
    console.log("File received:", req.file);
    const student_id = req.body.student_id;
    if (!student_id) {
      return res.status(400).json({
        error: "Student ID missing"
      });
    }
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    let text = pdfData.text;
    console.log("RAW PDF TEXT:", text);
    text = text
      .replace(/\s+/g, " ")
      .toLowerCase();
    console.log("CLEAN TEXT:", text);
    const detectedSkills = [];
        SKILLS.forEach(skill => {

        const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(`\\b${escapedSkill.toLowerCase()}\\b`, "i");

        if (regex.test(text)) {
            detectedSkills.push(skill);
        }
        });    
    console.log("Detected Skills:", detectedSkills);
    for (let skill of detectedSkills) {
      const query = `
        INSERT INTO student_skills (student_id, skill_id, level)
        SELECT ?, id, 'intermediate'
        FROM skills
        WHERE name = ?
        AND NOT EXISTS (
          SELECT 1
          FROM student_skills
          WHERE student_id = ?
          AND skill_id = skills.id
        )
      `;
      db.query(query, [student_id, skill, student_id]);
    }
    fs.unlinkSync(filePath);
    res.json({
      message: "Resume analyzed successfully",
      detectedSkills
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Resume parsing failed"
    });
  }
};

exports.chatbot = (req, res) => {
    const { message, student_id } = req.body;

    const query = `
        SELECT s.cgpa, GROUP_CONCAT(sk.name) AS skills
        FROM students s
        LEFT JOIN student_skills ss ON s.id = ss.student_id
        LEFT JOIN skills sk ON ss.skill_id = sk.id
        WHERE s.id = ?
    `;

    db.query(query, [student_id], (err, results) => {
        if (err) return res.status(500).json(err);

        const student = results[0];
        const skills = student.skills
        ? [...new Set(student.skills.split(","))]
        : [];
        let reply = "";

        if (message.toLowerCase().includes("eligible")) {
            if (student.cgpa >= 7 && skills.includes("DSA")) {
                reply = "You are likely eligible for companies like TCS.";
            } else {
                reply = "Improve CGPA or add skills like DSA.";
            }
        } 
        else if (message.toLowerCase().includes("skills")) {
            reply = `Your skills: ${skills.join(", ")}`;
        } 
        else {
            reply = "Ask about eligibility or skills.";
        }

        res.json({ reply });
    });
};