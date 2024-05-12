const express = require("express");
const fs = require("fs");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/create-link", (req, res) => {
  const { link } = req.body;

  if (!link) return res.status(400).send("Link is required");
  
  const data = fs.readFileSync("db.json");
  const links = JSON.parse(data);

  const existingLink = links.find((l) => l.url === link);
  if (existingLink) return res.json(existingLink);

  // Collision is possible but addressing this is out of the scope of this project
  const linkID = Math.random().toString(36).substring(2, 9);
  const newLink = { id: linkID, url: link };

  links.push(newLink);

  fs.writeFileSync("db.json", JSON.stringify(links));

  return res.json(newLink);
});

app.get("/:linkID", (req, res) => {
  const { linkID } = req.params;

  const data = fs.readFileSync("db.json");
  const links = JSON.parse(data);

  const link = links.find((link) => link.id === linkID);

  if (!link) return res.status(404).send("Link not found");

  return res.redirect(link.url);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
