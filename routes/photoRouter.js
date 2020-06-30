const express = require("express");
const router = express.Router();
const PhotoRepository = require("../db/photoRepository");

router.get("/", function (req, res, next) {
  const photos = PhotoRepository.getAll();
  res.json(photos);
});

router.get("/mostLike", function (req, res, next) {
  const photos = PhotoRepository.mostLikedPhoto(10);
  res.json(photos);
});

router.get("/:id", function (req, res, next) {
  let photoId = req.params.id;
  let photo = PhotoRepository.getObj(photoId);
  res.json(photo)
});

module.exports = router;
