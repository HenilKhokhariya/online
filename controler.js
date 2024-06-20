const categoryMod = require("./module/categoryModule");
const gameMod = require("./module/gameModule");
const AdminMod = require("./module/adminModule");

const Home = async (req, res) => {
  try {
    res.status(200).send({ msg: "Home Page" });
  } catch (error) {
    res.status(400).send({ msg: "Error" });
  }
};

const AddCategory = async (req, res) => {
  try {
    const name = await req.body.name;
    const categoryExist = await categoryMod.Category.findOne({ name });
    if (categoryExist) {
      return res.status(400).send({ msg: "Category Already Exist" });
    }
    await categoryMod.Category.create({ name });
    res.status(200).send({ msg: "Insert" });
  } catch (error) {
    res.status(400).send({ msg: "Not Insert" });
  }
};

const AllCategory = async (req, res) => {
  try {
    const data = await categoryMod.Category.find({});
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ msg: "Data Not Found" });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const id = await req.body.aid;
    await categoryMod.Category.deleteOne({ _id: id });
    res.status(200).send({ msg: "Delete Record" });
  } catch (error) {
    res.status(400).send({ msg: "Not Delete" });
  }
};

const AllGame = async (req, res) => {
  try {
    const data = await gameMod.Game.find({});
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ msg: "Data Not Found" });
  }
};

const DeleteGame = async (req, res) => {
  try {
    const id = await req.body.aid;
    await gameMod.Game.deleteOne({ _id: id });
    res.status(200).send({ msg: "Delete Game" });
  } catch (error) {
    res.status(400).send({ msg: "Not Delete" });
  }
};
const FindGame = async (req, res) => {
  try {
    const id = await req.body.id;
    const data = await gameMod.Game.find({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ msg: "Data Not Found" });
  }
};

const UpdateGame = async (req, res) => {
  try {
    let uid = await req.body.id;
    let data = await {
      appname: req.body.appname,
      appleUrl: req.body.appleUrl,
      category: req.body.category,
      developer: req.body.developer,
      discription: req.body.discription,
      googlePlayUrl: req.body.googlePlayUrl,
      size: req.body.size,
      version: req.body.version,
      lastup: req.body.lastup,
      reating: req.body.reating,
      age: req.body.age,
      platform: req.body.platform,
      icon: req.body.icon,
      post1: req.body.post1,
      post2: req.body.post2,
      post3: req.body.post3,
      post4: req.body.post4,
      top: req.body.top,
    };

    await gameMod.Game.updateOne({ _id: uid }, { $set: data });
    res.status(200).send({ msg: "Update Record" });
  } catch (error) {
    res.status(400).send({ msg: "Not Update" });
    console.log(error);
  }
};
const SearchGame = async (req, res) => {
  try {
    const cate = await req.body.data;
    const apname = await req.body.data;
    var pattern = "^" + apname;
    const data = await gameMod.Game.find({
      $or: [
        { category: cate },
        { appname: { $regex: pattern, $options: "i" } },
      ],
    });
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ msg: "Data Not Found" });
  }
};

const AddscrapData = async (req, res) => {
  try {
    let data = await {
      appname: req.body.appname,
      category: req.body.category,
      size: req.body.size,
      discription: req.body.discription,
      appleUrl: req.body.appleUrl,
      googlePlayUrl: req.body.googlePlayUrl,
      developer: req.body.developer,
      platform: req.body.platform,
      icon: req.body.icon,
      age: req.body.age,
      reating: req.body.reating,
      version: req.body.version,
      lastup: req.body.lastupdate,
      post1: req.body.post1,
      post2: req.body.post2,
      post3: req.body.post3,
      post4: req.body.post4,
      post5: req.body.post5,
      post6: req.body.post6,
      post7: req.body.post7,
      post8: req.body.post8,

      top: req.body.top,
    };

    const gameExist = await gameMod.Game.findOne({ appname: data.appname });
    if (gameExist) {
      return res.status(400).send({ msg: "Game Already Exist" });
    }
    await gameMod.Game.create(data);
    res.status(200).send({ msg: "Insert" });
  } catch (error) {
    console.log(error);
  }
};

const SimilarData = async (req, res) => {
  try {
    const cat = await req.body.category;

    const data = await gameMod.Game.find(
      { category: cat },
      { id: 1, icon: 1, appname: 1 }
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const FindGameToCategory = async (req, res) => {
  try {
    const cate = await req.body.cate;

    const data = await gameMod.Game.find({ category: cate });
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ msg: "Data Not Found" });
  }
};

const FindTopGame = async (req, res) => {
  try {
    const top = await req.body.data;

    const data = await gameMod.Game.find({ top: top });
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ msg: "Data Not Found" });
  }
};

const AdminCreate = async (req, res) => {
  try {
    const { Aid, password, name, email } = await req.body;
    const admin = await AdminMod.Admin.create({ Aid, password, name, email });

    if (admin) {
      return res.status(200).send({ msg: "Login Success" });
    } else {
      return res.status(400).send({ msg: "Enter Valid ID" });
    }
  } catch (error) {
    return res.status(400).send({ msg: "Error" });
  }
};

const AdminLogin = async (req, res) => {
  try {
    const { Aid, password } = await req.body;
    const admin = await AdminMod.Admin.findOne({ Aid });

    if (admin) {
      if (admin.password === password) {
        return res.status(200).json({ msg: "Login Success" });
      } else {
        return res.status(400).json({ msg: "Enter Valid Password" });
      }
    } else {
      return res.status(400).json({ msg: "Enter Valid ID" });
    }
  } catch (error) {
    return res.status(400).send({ msg: "Error" });
  }
};

const AdminDashbord = async (req, res) => {
  try {
    const game = await gameMod.Game.find({});
    const cat = await categoryMod.Category.find({});
    const top = await gameMod.Game.find({ top: "Top" });
    return res
      .status(200)
      .json({ game: game.length, cat: cat.length, top: top.length });
  } catch (error) {
    return res.status(400).send(error);
  }
};
module.exports = {
  Home,
  AddCategory,
  AllCategory,
  DeleteCategory,
  AllGame,
  DeleteGame,
  FindGame,
  UpdateGame,
  SearchGame,
  AddscrapData,
  SimilarData,
  FindGameToCategory,
  FindTopGame,
  AdminCreate,
  AdminLogin,
  AdminDashbord,
};
