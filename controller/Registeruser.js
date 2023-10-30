//const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const db = require("../models/Main");
const Token = require("../models/token");
const sendMail = require("../utils/sendEmail");
const Register = db.register;
const userToken = db.token;

const registeruser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    if (req.body.email) {
      const checkmail = await Register.findOne({
        where: { Email: req.body.email },
      });
      if (checkmail) {
        res.send("email exist");
      } else {
        let info = {
          Name: req.body.name,
          Email: req.body.email,
          Password: req.body.password,
          Profile: req.body.profile,
        };
        const data = await Register.create(info);
        const token = await jwt.sign({ name, email, password }, "Sahil2002");
        const OTP = Math.floor(1000 + Math.random() * 9000);
        const usetoken = await userToken.create({
          userId: data.id,
          token: token,
          otp: OTP,
        });
        console.log("enter in send email");
        // const url = `http://192.168.0.100:5000/api/${data.id}/verify/${usetoken.token}`;
        await sendMail(email, "verify email", OTP);
        res.send({ token, data });
      }
    }
  } catch (error) {
    console.log("======", error);
  }

  // try {
  //   connection.query(
  //     "select * from users where Email=?",
  //     [email],
  //     (err, rows) => {
  //       if (err) {
  //         res.send(err);
  //       } else {
  //         if (rows.length > 0) {
  //           res.status(400);
  //         } else {
  //           connection.query(
  //             "INSERT into users (Name,Email,Password) values(?,?,?)",
  //             [name, email, password],
  //             (err, rows) => {
  //               if (err) {
  //                 throw err;
  //               } else {
  //                 const token = jwt.sign(
  //                   { name, email, password },
  //                   "Sahil2002"
  //                 );
  //                 res.send({ token });
  //               }
  //             }
  //           );
  //         }
  //       }
  //     }
  //   );
  // } catch (error) {
  //   console.log("email error", error);
  // }
};

const alluser = (req, res) => {
  connection.query("select * from users", (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
};

const deleteuser = async (req, res) => {
  console.log(req.query);
  const deleteone = await Register.destroy({ where: { id: req.query.id } });
  res.send("user deleted");
};

const verifyuser = async (req, res) => {
  const { id, otp } = req.body;
  console.log("frgbgnfd", otp);
  try {
    const user = await userToken.findOne({ where: { userId: id } });
    console.log("aftwer user find");
    if (!user) {
      console.log("invalid register user");
      res.send("Invalid link");
    }
    const verify = user.otp == otp;
    if (verify) {
      await Register.update(
        { Verify: true }, // Set the field you want to update
        { where: { id: id } } // Specify the condition
      );
      console.log("after verification");
      await userToken.destroy({ where: { userId: id } });
      console.log("after all process complete");
      res.json({ response: 1, message: "verification complete" });
    } else {
      res.status("401").json({ message: "OTP is not correct" });
    }
  } catch (error) {}
};

const updateUser = async (req, res) => {
  const change = await Register.update(
    { Name: req.body.name, Profile: req.body.profile },
    { where: { id: req.body.id } }
  );
  console.log("555555555", change);
  res.send("update successfully");
};

module.exports = { alluser, registeruser, deleteuser, verifyuser, updateUser };
