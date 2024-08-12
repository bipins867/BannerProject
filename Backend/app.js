const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bipinsingh",
  database: "bannerDB",
});

app.get("/api/banner", (req, res) => {
  const query = "SELECT * FROM bannerContent LIMIT 1";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/api/banner", (req, res) => {
  const { description, timer, link, isVisible } = req.body;
  const query =
    "UPDATE bannerContent SET description = ?, timer = ?, link = ?, isVisible = ?";
  db.query(query, [description, timer, link, isVisible], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// app.post("/api/banner", (req, res) => {
//   const { description, timer, link, isVisible } = req.body;
//   const query =
//     "INSERT INTO bannerContent (description, timer, link, isVisible) VALUES (?, ?, ?, ?)";
//   db.query(query, [description, timer, link, isVisible], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.put("/api/banner", (req, res) => {
  const { description, timer, link, isVisible } = req.body;
  const query =
    "UPDATE bannerContent SET description=?, timer=?, link=?, isVisible=? WHERE id=1";
  db.query(query, [description, timer, link, isVisible], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
