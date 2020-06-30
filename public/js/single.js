const imgSection = document.querySelector(".img-section");
const infoSection = document.querySelector(".info-section");
const photoId = document.querySelector("#photoId").value;

fetch(`/photos/${photoId}`)
  .then((res) => res.json())
  .then((data) => {
    let likeIconHtml = data.userLike
      ? '<i class="fas fa-heart"></i>'
      : '<i class="far fa-heart"></i>';
    let dislikeIconHtml = data.userDislike
      ? '<i class="fas fa-heart-broken"></i>'
      : '<i class="fal fa-heart-broken"></i>';

    builder.create("img").src(data.download_url).appendTo(imgSection);

    const metaInfo = builder
      .create("div")
      .className("meta-info")
      .appendTo(infoSection);

    const photographer = builder
      .create("div")
      .className("photographer")
      .html("Photo By: ")
      .appendTo(metaInfo);

    builder
      .create("span")
      .className("photographer-name")
      .html(data.author)
      .appendTo(photographer);

    const actions = builder
      .create("div")
      .className("actions")
      .appendTo(metaInfo);

    const likeSection = builder
      .create("div")
      .className("like-section")
      .appendTo(actions);

    const likeIcon = builder
      .create("a")
      .addEvent("click", () => {
        fetch("/like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: data.id,
          }),
        })
          .then((result) => result.json())
          .then((value) => {
            if (!value.userLike) {
              likeIcon.html('<i class="far fa-heart"></i>');
              likeNumber.html(value.like);
            } else {
              likeIcon.html('<i class="fas fa-heart"></i>');
              likeNumber.html(value.like);
              if (!value.userDislike) {
                dislikeIcon.html('<i class="fal fa-heart-broken"></i>');
                dislikeNumber.html(value.dislike);
              }
            }
          });
      })
      .html(likeIconHtml)
      .appendTo(likeSection);

    const likeNumber = builder
      .create("span")
      .className("like-number number")
      .html(data.like)
      .appendTo(likeSection);

    const dislikeSection = builder
      .create("div")
      .className("dislike-section")
      .appendTo(actions);

    const dislikeIcon = builder
      .create("a")
      .addEvent("click", () => {
        fetch("/dislike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: data.id,
          }),
        })
          .then((result) => result.json())
          .then((value) => {
            if (!value.userDislike) {
              dislikeIcon.html('<i class="fal fa-heart-broken"></i>');
              dislikeNumber.html(value.dislike);
            } else {
              dislikeIcon.html('<i class="fas fa-heart-broken"></i>');
              dislikeNumber.html(value.dislike);
              if (!value.userLike) {
                likeIcon.html('<i class="far fa-heart"></i>');
                likeNumber.html(value.like);
              }
            }
          });
      })
      .html(dislikeIconHtml)
      .appendTo(dislikeSection);

    const dislikeNumber = builder
      .create("span")
      .className("dislike-number number")
      .html(data.dislike)
      .appendTo(dislikeSection);

    const downloadSection = builder
      .create("div")
      .className("download-section")
      .appendTo(actions);

    builder
      .create("a")
      .url(data.download_url)
      .html('<i class="fas fa-download"></i>')
      .appendTo(downloadSection);

    builder
      .create("div")
      .className("discription")
      .html(data.discription)
      .appendTo(infoSection);
  });
