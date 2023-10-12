const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const db = require("../models/Main");
const { Op } = require("sequelize");
const sendMail = require("../utils/sendEmail");
const nodemailer = require("nodemailer");
const userToken = db.token;
const Login = db.register;
const post = db.posts;

const Loginuser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    if (req.body) {
      const login = await Login.findOne({
        where: {
          [Op.and]: [
            { Email: req.body.email },
            { Password: req.body.password },
          ],
        },
      });
      if (login) {
        const token = jwt.sign({ email, password }, "Sahil2002");
        res.send({ token, login });
      } else {
        res.json({ message: "invalid email and password" });
      }
    }
  } catch (error) {
    res.send("invalid email and password");
  }

  // const loginquery = "select * from users where Email=? and Password=? ";

  // connection.query(loginquery, [email, password], (err, rows) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     if (rows.length > 0) {
  //       const token = jwt.sign({ email, password }, "Sahil2002");
  //       res.json({ token, rows });
  //     } else {
  //       console.log("invalid password");
  //       res.json({ message: "invalid rmail and password" });
  //     }
  //   }
  // });
};

const ForgotPassword = async (req, res) => {
  const { email, password } = req.body;

  const find = await Login.findOne({ where: { Email: req.body.email } });
  console.log("@@@@@@@@@@@@", find);

  if (find != null) {
    const token = await jwt.sign({ email, password }, "Sahil2002");
    const OTP = Math.floor(1000 + Math.random() * 9000);
    const usetoken = await userToken.create({
      userId: find.id,
      token: token,
      otp: OTP,
    });
    console.log("enter in send email");
    // const url = `http://192.168.0.100:5000/api/${data.id}/verify/${usetoken.token}`;
    await sendMail(email, "verify email", OTP);
    res.json({ response: 1, message: "Verification code send on email", find });
    // const change = await find.update({ Password: req.body.password });
    // console.log("change", change);
    // await sendMail(email, "password updated successfully");
  } else {
    res.json({ response: 0, message: "user not found" });
  }
};

const UserDetails = async (req, res) => {
  console.log("444444444 enter in user details");
  const { id } = req.params;
  console.log("user", id);
  try {
    // const user = await Login.findOne({ where: { id: id } });
    const data = await Login.findOne({
      include: [
        {
          model: post,
        },
      ],
      where: { id: id },
    });
    res.send({ data });
  } catch (error) {
    console.log("222222222222", error);
    res.send("user not found");
  }
};

const forgotVerify = async (req, res) => {
  const { id, otp, email, password } = req.body;
  try {
    const user = await userToken.findOne({ where: { userId: id } });
    console.log("aftwer user find");
    if (!user) {
      console.log("invalid register user");
      res.send("Invalid link");
    }
    const verify = user.otp == otp;
    if (verify) {
      const find = await Login.findOne({ where: { Email: req.body.email } });
      const change = await find.update({ Password: req.body.password });
      console.log("change", change);

      console.log("after verification");
      await userToken.destroy({ where: { userId: id } });
      console.log("after all process complete");
      res.json({ response: 1, message: "password update successfully" });
      try {
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "sahilalagiya104@gmail.com",
            pass: "oyvwtsylfexkookl",
          },
        });
        //console.log(email, subject, text);
        await transport.sendMail({
          from: "sahilalagiya104@gmail.com",
          to: req.body.email,
          subject: "password Update",
          text: "password updated successfully",
        });
        console.log("email send");
      } catch (error) {
        console.log("email not send successfully");
        console.log(error);
      }
    } else {
      res.status("401").json({ message: "OTP is not correct" });
    }
  } catch (error) {}
};

module.exports = { Loginuser, ForgotPassword, UserDetails, forgotVerify };
