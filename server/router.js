const controler = require("./controler");
const express = require("express");
const router = express.Router();
const gameMod = require("./module/gameModule");
//App Icon
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../onlinegame/src/Image/Icon");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadpost = multer({ storage: storage });

router.post("/AddGame", uploadpost.single("file"), async (req, res) => {
  try {
    let data = await {
      appname: req.body.appname,
      appleUrl: req.body.appleUrl,
      category: req.body.category,
      developer: req.body.developer,
      discription: req.body.discription,
      googlePlayUrl: req.body.googlePlayUrl,
      size: req.body.size,
      icon: req.file.filename,
      version: req.file.version,
      lastup: req.file.lastup,
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
});

router.route("/AdminLogin").post(controler.AdminLogin);
router.route("/AdminCreate").post(controler.AdminCreate);
router.route("/Dashbord").get(controler.AdminDashbord);

router.route("/home").get(controler.Home);
router.route("/addCate").post(controler.AddCategory);
router.route("/allCate").get(controler.AllCategory);
router.route("/findCate").post(controler.FindGame);
router.route("/deleteCate").delete(controler.DeleteCategory);
router.route("/Allgame").get(controler.AllGame);
router.route("/deletegame").delete(controler.DeleteGame);
router.route("/updategame").post(controler.UpdateGame);
router.route("/serachgame").post(controler.SearchGame);
router.route("/addscrapdata").post(controler.AddscrapData);
router.route("/SimilarGame").post(controler.SimilarData);
router.route("/FindGameToCategory").post(controler.FindGameToCategory);
router.route("/top").post(controler.FindTopGame);

module.exports = router;
