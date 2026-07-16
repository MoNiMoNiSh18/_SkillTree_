const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Check whether email exists
exports.forgotPassword = (req, res) => {

    const { email } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Email not found"
                });
            }

            res.json({
                success: true
            });

        }
    );

};

// Update password
exports.resetPassword = (req, res) => {

    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(
        "UPDATE users SET password=? WHERE email=?",
        [hashedPassword, email],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Email not found"
                });
            }

            res.json({
                success: true,
                message: "Password updated successfully"
            });

        }
    );

};