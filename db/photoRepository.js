const Photo = require("./photo");
const photos = require("./images.json");

class PhotoRepository {
  constructor() {
    this.photos = photos;
  }
  add = (
    id,
    width,
    height,
    author,
    url,
    download_url,
    description,
    like,
    dislike
  ) => {
    const photo = new Photo(
      id,
      width,
      height,
      author,
      url,
      download_url,
      description,
      like,
      dislike
    );
    this.photos.push(photo);
  };

  like(id) {
    const findPhoto = this.getObj(id);

    if (!findPhoto.userLike) {
      findPhoto.userLike = true;
      findPhoto.like++;
      if (findPhoto.userDislike) {
        findPhoto.userDislike = false;
        findPhoto.dislike--;
      }
    } else {
      findPhoto.userLike = false;
      findPhoto.like--;
    }
    return findPhoto;
  }

  dislike(id) {
    const findPhoto = this.getObj(id);

    if (!findPhoto.userDislike) {
      findPhoto.userDislike = true;
      findPhoto.dislike++;
      if (findPhoto.userLike) {
        findPhoto.userLike = false;
        findPhoto.like--;
      }
    } else {
      findPhoto.userDislike = false;
      findPhoto.dislike--;
    }
    return findPhoto;
  }

  getObj(id) {
    const findPhoto = this.photos.find((photo) => photo.id === id);
    return findPhoto;
  }

  mostLikedPhoto(number) {
    let temp = [...this.photos];
    let mostLikePhotos = [];
    for (let i = 1; i <= number; i++) {
      const res = Math.max.apply(
        Math,
        temp.map((max) => max.like)
      );
      const photo = temp.find((photo) => photo.like == res);
      mostLikePhotos.push(photo);
      temp.splice(temp.indexOf(photo), 1);
    }
    return [...mostLikePhotos];
  }

  getAll() {
    return [...this.photos];
  }
}

module.exports = new PhotoRepository();
