const { where } = require("sequelize");
const db = require("../models/Main");
const { Op } = require("sequelize");

const Post = db.posts;
const Comment = db.comments;
const Like = db.likes;
const Register = db.register;
const Postsave = db.postsave;

const addpost = async (req, res) => {
  try {
    console.log("inside add post");
    console.log(req.query);
    let info = {
      registerId: req.query.email,
      Title: req.body.title,
      Description: req.body.description,
      Image: req.body.image,
      published: req.body.published ? req.body.published : false,
    };

    await Post.create(info);

    return res.status(200).json({ message: "Post liked" });
  } catch (error) {
    console.log("333333333333", error);
  }

  //console.log(product);
};

const findallpost = async (req, res) => {
  try {
    const allpost = await Post.findAll({
      include: [
        {
          model: Like,
        },
        {
          model: Register,
        },
        {
          model: Postsave,
        },
      ],
      order: [["id", "DESC"]],
    });
    res.send(allpost);
  } catch (error) {
    console.log("err============", error);
  }
};

const getallproductcomment = async (req, res) => {
  console.log(req.query);
  const id = req.query._id;
  console.log(id);
  const data = await Post.findAll({
    include: [
      {
        model: Comment,
        as: "comment",
      },
    ],
    where: { id: id },
  });
  res.send(data);
};

const getlike = async (req, res) => {
  try {
    const { postid } = req.query;
    const data = await Post.findByPk(postid);
    console.log("====================", data);

    let info = {
      postId: req.query.postid,
      Email: req.body.email,
    };
    await Like.create(info);
    return res.status(200).json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const savepost = async (req, res) => {
  try {
    const { postid } = req.query;
    // const data = await Post.findByPk(postid);
    // console.log("====================", data);

    let info = {
      postId: req.query.postid,
      Email: req.body.email,
    };
    await Postsave.create(info);
    return res.status(200).json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getdislike = async (req, res) => {
  try {
    //console.log("=================+++++++++++", req.body);
    const dislike = await Like.destroy({
      where: {
        [Op.and]: [{ Email: req.body.email }, { postId: req.query.postid }],
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
    res.status(500).json({ error: "Internal server error" });
  }
};

const removesave = async (req, res) => {
  try {
    //console.log("=================+++++++++++", req.body);
    const dislike = await Postsave.destroy({
      where: {
        [Op.and]: [{ Email: req.body.email }, { postId: req.query.postid }],
      },
    });
    //console.log(dislike);
    // const id = await dislike.id;
    // await Like.destroy({
    //   where: { id: id },
    // });
    console.log("data destroy");
    return res.status(200).json({ message: "remove from save" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getalllike = async (req, res) => {
  try {
    const id = req.query._id;
    console.log(id);
    const data = await Post.findAll({
      include: [
        {
          model: Like,
        },
      ],
      where: { id: id },
    });
    res.send(data);
  } catch (error) {
    console.log("error========", error);
  }
};

module.exports = {
  addpost,
  findallpost,
  getallproductcomment,
  getlike,
  getalllike,
  getdislike,
  savepost,
  removesave,
};
