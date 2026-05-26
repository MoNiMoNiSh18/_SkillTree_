import { useState } from "react";

import Editor from "@monaco-editor/react";

function Practice() {

    const [code, setCode] = useState(
`print("Hello SkillTree")`
    );

    const [language, setLanguage] = useState("python");

    return (
        <div style={{ padding: "20px" }}>

            <h2>Practice Arena</h2>

            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="python">Python</option>

                <option value="javascript">
                    JavaScript
                </option>

                <option value="cpp">C++
                </option>
            </select>

            <br /><br />

            <Editor
                height="500px"
                language={language}
                value={code}
                onChange={(value) => setCode(value)}
            />

            <br />

            <button>
                Run Code
            </button>

        </div>
    );
}

export default Practice;