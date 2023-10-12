const db = require("../models/Main");

const Comment = db.comments;
const addcomment = async (req, res) => {
  console.log(req.body);
  const { description } = req.body;

  let info = {
    Description: req.body.description,
    Post_id: req.body.post_id,
  };

  const comments = await Comment.create(info);
  res.send(comments);
};

const getallcomment = async (req, res) => {
  const getcomment = await Comment.findAll({});
  res.send(getcomment);
};

module.exports = { addcomment, getallcomment };
