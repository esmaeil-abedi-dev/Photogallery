class Photo {
  constructor(
    id,
    width,
    height,
    author,
    url,
    download_url,
    description,
    like,
    dislike
  ) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.author = author;
    this.url = url;
    this.download_url = download_url;
    this.description = description;
    this.like = like;
    this.dislike = dislike;
    this.userLike = false;
    this.userDislike = false;
  }
}

module.exports = Photo;
