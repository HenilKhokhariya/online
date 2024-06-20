require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");
const connectDb = require("./connection");
const axios = require("axios");
const cheerio = require("cheerio");
let data = [];
const corsObject = {
  origin: "https://onlinegame-f05ihdpr8-henilkhokhariyas-projects.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  methods: "POST,GET,PUT,DELETE",
};
app.use(cors(corsObject));
app.use(express.json());
app.use("/api", router);

app.post("/api/data", async (req, res) => {
  try {
    const Url = await req.body.url;
    await axios
      .get(Url)
      .then(async (res) => {
        let $ = cheerio.load(res.data);
        //Icon And AppName
        $("div .Rbox").each(function (index, el) {
          let img = $(this).find("div .thumb img").attr("data-src");

          let appname = $(this).find("div .info div h4").text();

          let category = $(this).find("div ul li span").text();

          let reating = $(this).find("div .con ul li p").text().substring(0, 1);

          let Age = $(this).find("div .con ul li span").text();

          data.push({
            img: img,
            appname: appname.substring(1),
            category: category.split("\n")[1],
            reating: reating,
            Age: Age.split(" ")[2].substring(1),
          });
        });

        //App Detailes
        $("div .content").each(function (index, el) {
          let datalist = $(this).find("ul li p small").text().split("\n");
          let lastupdate = datalist[1];
          let currentversion = datalist[5];
          let platform = datalist[2] + " " + datalist[3];
          let size = datalist[6];
          let developer = datalist[7];
          data.push({
            lastupdate: lastupdate,
            currentversion,
            size: size,
            developer,
            platform,
          });
        });

        //App Apple And Android Link
        $("a.link").each((index, element) => {
          const dataHref = $(element).attr("data-href");

          if (index == 0) {
            data.push({
              googleplay: dataHref,
            });
          } else {
            data.push({
              appstor: dataHref,
            });
          }
        });

        //Discription
        $("div .des").each(function (index, el) {
          let discription = $(this).text();
          data.push({ discription: discription });
        });
        //More Image
        $("div .swiper-slide").each(function (index, elm) {
          let datalist = $(this).find("img").attr("src");
          let name = "image" + index;
          switch (index) {
            case 0:
              data.push({
                postimg1: datalist,
              });
              break;
            case 1:
              data.push({
                postimg2: datalist,
              });
              break;

            case 2:
              data.push({
                postimg3: datalist,
              });
              break;

            case 3:
              data.push({
                postimg4: datalist,
              });
              break;

            case 4:
              data.push({
                postimg5: datalist,
              });
              break;

            case 5:
              data.push({
                postimg6: datalist,
              });
              break;

            case 6:
              data.push({
                postimg7: datalist,
              });
              break;

            case 7:
              data.push({
                postimg8: datalist,
              });
              break;

            case 8:
              data.push({
                postimg9: datalist,
              });
              break;

            case 9:
              data.push({
                postimg10: datalist,
              });
              break;

            default:
          }
        });
        return false;
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({ data });
    data = [];
  } catch (error) {
    console.log(data);
  }
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is Start");
    });
  })
  .catch((err) => {
    console.log(err);
  });
