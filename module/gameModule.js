const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
    appname: String,
    category: {
      type: String,
      required: true,
    },
    size: { type: String, required: true },
    discription: { type: String, required: true },
    appleUrl: { type: String, required: true },
    googlePlayUrl: { type: String, required: true },
    developer: { type: String },
    platform: { type: String, required: true },
    icon: { type: String, require: true },
    age: { type: String, require: true },
    reating: { type: String, require: true },
    version: { type: String, require: true },
    lastup: { type: String, require: true },
    top: { type: String },
    post1: { type: String },
    post2: { type: String },
    post3: { type: String },
    post4: { type: String },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = { Game };
