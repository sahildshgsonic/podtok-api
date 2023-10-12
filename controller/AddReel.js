const db = require("../models/Main");
const { Op } = require("sequelize");
const fs = require("fs");
const ytdl = require("ytdl-core");
const multer = require("multer");

const Reel = db.reels;
const ReelLike = db.reellikes;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addreel = async (req, res) => {
  let info = {
    Title: req.body.title,
    Description: req.body.description,
    Reel: req.body.reel,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Reel.create(info);
  res.send(product);
};

const getallreel = async (req, res) => {
  const getreel = await Reel.findAll({
    include: [
      {
        model: ReelLike,
      },
    ],
    order: [["id", "DESC"]],
  });
  res.send(getreel);
};

const likeReel = async (req, res) => {
  try {
    const { reelid } = req.query;
    //const data = await Post.findByPk(postid);
    //console.log("====================", data);

    let info = {
      reelId: req.query.reelid,
      Email: req.body.email,
    };
    await ReelLike.create(info);
    return res.status(200).json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getdislikereel = async (req, res) => {
  try {
    console.log("=================+++++++++++", req.body);
    console.log("=====================", req.query.reelid);
    const dislike = await ReelLike.destroy({
      where: {
        [Op.and]: [{ Email: req.body.email }, { reelId: req.query.reelid }],
      },
    });
    //console.log(dislike);
    // const id = await dislike.id;
    // await Like.destroy({
    //   where: { id: id },
    // });
    console.log("data destroy");
    return res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    console.log("%%%%%%%%%%", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addreel, getallreel, likeReel, getdislikereel };
