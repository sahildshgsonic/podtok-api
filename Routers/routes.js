const express = require("express");
const registeruser = require("../controller/Registeruser");
const {
  Loginuser,
  ForgotPassword,
  UserDetails,
  forgotVerify,
} = require("../controller/Loginuser");
const {
  addpost,
  findallpost,
  getallproductcomment,
  getlike,
  getalllike,
  getdislike,
} = require("../controller/Addpost");
const multer = require("multer");
const {
  addreel,
  getallreel,
  likeReel,
  getdislikereel,
} = require("../controller/AddReel");
const comment = require("../controller/Comment");
const mpconvert = require("../controller/mp4convert");
const { addcomment, getallcomment } = require("../controller/Addcomment");

const router = express.Router();

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${Date.now()}.${ext}`);
//   },
// });

// const multerfilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("err while uploading", false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerfilter,
// });

router.post("/createuser", registeruser.registeruser);
router.get("/users", registeruser.alluser);
router.delete("/delete-user", registeruser.deleteuser);
router.post("/login", Loginuser);
router.post("/addpost", addpost);
router.get("/getallpost", findallpost);
router.post("/addreel", addreel);
router.get("/getallreel", getallreel);
//router.post("/comment", comment);
router.get("/convert", mpconvert);
router.post("/addcomm", addcomment);
router.get("/getallcomment", getallcomment);
router.get("/getcomment", getallproductcomment);
router.post("/post", getlike);
router.get("/getalllike", getalllike);
router.delete("/dislike", getdislike);
router.post("/verify", registeruser.verifyuser);
router.post("/forgot", ForgotPassword);
router.get("/user-details/:id", UserDetails);
router.post("/likereel", likeReel);
router.delete("/reeldislike", getdislikereel);
router.post("/forgotverify", forgotVerify);

module.exports = router;
