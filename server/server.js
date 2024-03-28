const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {
  printDetails,
  GetAllData,
  GetData,
  WriteData,
  DeleteData,
} = require("./firebase/firebaseConfig");

//middlewares
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(bodyParser.json());

//testing route
app.get("/check", async (req, res) => {
  res.send({
    ServerStatus: "active",
  });
});

//server
const initServer = () => {
  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });
};

initServer();

// GetAllData().then((data) => {
//   console.log(data);
// });

// GetData("yilK7sb4nO6IsCEogZkF").then((data) => {
//   console.log(data);
// });

// WriteData(
//   {
//     age: "22",
//     name: "Test",
//     email: "test@gmail.com",
//   },
//   "123"
// );

// DeleteData("yilK7sb4nO6IsCEogZkF");
