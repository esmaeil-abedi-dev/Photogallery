var express = require("express");
var router = express.Router();
const PhotoRepository = require("../db/photoRepository");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/gallery", function (req, res, next) {
  res.render("gallery");
});

router.get("/single/:id", function (req, res, next) {
  const photoId = req.params.id;
  res.render("single", { photoId });
});

router.post("/like", (req, res, next) => {
  const photo = PhotoRepository.like(req.body.id);
  res.json(photo);
});

router.post("/dislike", (req, res, next) => {
  const photo = PhotoRepository.dislike(req.body.id);
  res.json(photo);
});

module.exports = router;
