const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    Aid: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
  },
  { timestamps: true }
);

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = { Admin };
