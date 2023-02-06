const express = require("express");

const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const apiURL = "https://api.adviceslip.com/advice";
  https.get(apiURL, (response) => {
    // console.log(response);
    response.on("data", (data) => {
      const adviceSlip = JSON.parse(data);
      const advice = adviceSlip.slip.advice;
      const id = adviceSlip.slip.id.toString();

      res.render("index", { adviceID: id, adviceText: advice });
    });
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
