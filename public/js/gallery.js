const imgSection = document.querySelector(".img-section");
const mainContainer = document.querySelector(".main-container");

fetch("/photos")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      let likeIconClass = element.userLike ? "fas fa-heart " : "far fa-heart";
      let dislikeIconClass = element.userDislike
        ? "fas fa-heart-broken"
        : "fal fa-heart-broken";
      const imgBox = builder
        .create("article")
        .className("img-box")
        .appendTo(imgSection);

      const a = builder
        .create("a")
        .url(`/single/${element.id}`)
        .appendTo(imgBox);

      builder
        .create("img")
        .src(element.download_url)
        .alt(element.author)
        .appendTo(a);

      const bagBtn = builder
        .create("div")
        .className("bag-btn")
        .appendTo(imgBox);

      const likeSection = builder
        .create("a")
        .className("like-section")
        .addEvent("click", () => {
          fetch("/like", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: element.id,
            }),
          })
            .then((result) => result.json())
            .then((value) => {
              if (!value.userLike) {
                likeIcon.className("far fa-heart");
                likeNumber.html(value.like);
              } else {
                likeIcon.className("fas fa-heart");
                likeNumber.html(value.like);
                if (!value.userDislike) {
                  dislikeIcon.className("fal fa-heart-broken");
                  dislikeNumber.html(value.dislike);
                }
              }
            });
        })
        .appendTo(bagBtn);

      const likeIcon = builder
        .create("i")
        .className(likeIconClass)
        .appendTo(likeSection);

      const likeNumber = builder
        .create("div")
        .className("like-number number")
        .html(element.like)
        .appendTo(likeSection);

      const dislikeSection = builder
        .create("a")
        .className("dislike-section")
        .addEvent("click", () => {
          fetch("/dislike", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: element.id,
            }),
          })
            .then((result) => result.json())
            .then((value) => {
              if (!value.userDislike) {
                dislikeIcon.className("fal fa-heart-broken");
                dislikeNumber.html(value.dislike);
              } else {
                dislikeIcon.className("fas fa-heart-broken");
                dislikeNumber.html(value.dislike);
                if (!value.userLike) {
                  likeIcon.className("far fa-heart");
                  likeNumber.html(value.like);
                }
              }
            });
        })
        .appendTo(bagBtn);

      const dislikeIcon = builder
        .create("i")
        .className(dislikeIconClass)
        .appendTo(dislikeSection);

      const dislikeNumber = builder
        .create("div")
        .className("dislike-number number")
        .html(element.dislike)
        .appendTo(dislikeSection);
    });
  });
