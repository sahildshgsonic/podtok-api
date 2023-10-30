const db = require("../models/Main");

const Reelcomment = db.reelcomment;

const reelcomment = async (req, res) => {
  console.log("inside reelcomment &&&&&&&", req.body.description);
  const { description } = req.body;

  let info = {
    Description: req.body.description,
    Reel_id: req.body.reel_id,
    reelId: req.body.reel_id,
  };

  const comments = await Reelcomment.create(info);
  console.log("comment added");
  res.send(comments);
};

const getallreelcomment = async (req, res) => {
  const id = req.query.reel_id;
  await Reelcomment.findAll({ where: { Reel_id: id } })
    .then((data) => res.json(data))
    .catch((error) => {
      console.log("^^^^^^6", error);
    });
};

module.exports = { reelcomment, getallreelcomment };
