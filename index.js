const express = require("express");
const router = require("./Routers/routes");
const connect = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const { stdout } = require("process");
const fs = require("fs");
const ytdl = require("ytdl-core");

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const corsOptions = {
//   origin: "exp://ur-mza.sahil003.podtoks.exp.direct:80", // Replace with your Expo app's IP address and port
// };
app.use(cors());
require("./models/Main");

app.use("/api", router);

app.post("/user", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    connect.query(
      "INSERT into users (Name,Email,Password) values(?,?,?)",
      [name, email, password],
      (err, rows) => {
        if (err) {
          throw err;
        } else {
          res.send(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.post("/video", async (req, res) => {
  exec(
    `youtube-dl --get-description ${req.body.url} --skip-download`,
    (err, stdout) => {
      if (err) {
        console.log(err);
      } else {
        console.log(stdout);
        res.send;
      }
    }
  );
});

app.post("/url", async (req, res) => {
  try {
    const info = await ytdl.getInfo(req.body.url);
    // console.log("++++++++++++++++++", info.formats);

    const forma = ytdl.chooseFormat(info.formats, { quality: "highest" });

    const data = forma.url;
    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`app start on ${PORT}`);
});
