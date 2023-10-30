const dbconfing = require("../config/db.js");

const { Sequelize, DataTypes } = require("sequelize");

// sequelize = new Sequelize("sqlite::memory:");

const sequelize = new Sequelize(
  dbconfing.DB,
  dbconfing.USER,
  dbconfing.PASSWORD,
  {
    host: dbconfing.HOST,
    dialect: dbconfing.dialect,
    port: "3306",
    logging: false,

    //     pool: {
    //       max: dbconfing.pool.max,
    //       min: dbconfing.pool.min,
    //       acquire: dbconfing.pool.acquire,
    //       idle: dbconfing.pool.idle,
    //     },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("err", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.register = require("./registermodel.js")(sequelize, DataTypes);
db.posts = require("./postmodel.js")(sequelize, DataTypes);
db.comments = require("./commnetmodel.js")(sequelize, DataTypes);
db.reels = require("./reelsmodel.js")(sequelize, DataTypes);
db.likes = require("./likesmodel.js")(sequelize, DataTypes);
db.token = require("./token.js")(sequelize, DataTypes);
db.reellikes = require("./reellike.js")(sequelize, DataTypes);
db.reelcomment = require("./reelcomment.js")(sequelize, DataTypes);
db.postsave = require("./savemodel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("re sync is done");
});

db.posts.hasMany(db.comments, {
  foreignKey: "post_id",
  as: "comment",
});

db.comments.belongsTo(db.posts, {
  foreignKey: "post_id",
  as: "post",
});

db.likes.belongsTo(db.posts);
db.posts.hasMany(db.likes);

db.postsave.belongsTo(db.posts);
db.posts.hasMany(db.postsave);

db.reellikes.belongsTo(db.reels);
db.reels.hasMany(db.reellikes);

db.posts.belongsTo(db.register);
db.register.hasMany(db.posts);

db.reels.belongsTo(db.register);
db.register.hasMany(db.reels);

db.reels.hasMany(db.reelcomment);
db.reelcomment.belongsTo(db.reels);

module.exports = db;
