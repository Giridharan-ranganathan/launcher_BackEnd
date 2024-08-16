const express = require("express");
const bodyParser = require("body-parser");
const { execFile } = require("child_process");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/run", (req, res) => {
  const { applicationPath, parameter } = req.body;

  execFile(applicationPath, [parameter], (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error.message}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`stderr: ${stderr}`);
    }
    res.send(`Success: ${stdout}`);
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
