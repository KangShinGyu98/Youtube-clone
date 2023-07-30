const videoContainer = document.querySelector(".video-container");
let api_key = "AIzaSyAi_tTwru70jYqm_7oN7KThSbWle4CjHdg";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
// https://www.googleapis.com/youtube/v3/channel?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyAi_tTwru70jYqm_7oN7KThSbWle4CjHdg
fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "KR",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));
const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(video_data.channelThumbnail);
      // console.log(data);
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      // console.log(data.items[0].snippet.thumbnails.default.url);
      makeVideoCard(video_data);
    })
    .catch((err) => console.log(err));
};
const makeVideoCard = (data) => {
  videoContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
      <img src="${data.snippet.thumbnails.high.url}" class = "thumbnail" alt="">
      <div class="content">
        <img src="${data.channelThumbnail}" class="channel-icon" alt="">
        <div class="info">
          <h4 class="title">${data.snippet.title}</h4>
          <p class="channel-name">${data.snippet.channelTitle}</p>
        </div> 
      </div>
    </div>`;
};
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://youtube.com/results?search_query=";
searchBtn.addEventListener("click", () => {
  if (searchInput.ariaValueMax.length) {
    location.href = searchLink + searchInput.value;
  }
});
