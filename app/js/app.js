const cardContainer = document.querySelector('.card-container');
const inputContainer = document.querySelector('input');
const searchButton = document.querySelector('#search');



const api_key = 'AIzaSyB2hbofkj-C5W9JVOdqAXmWeoGSQuFB044';
let channelId;

fetch('https://www.googleapis.com/youtube/v3/videos?' + new URLSearchParams({
    chart: 'mostPopular',
    key: 'AIzaSyB2hbofkj-C5W9JVOdqAXmWeoGSQuFB044',
    part:'snippet',
    maxResults: 70,
    order: 'viewCount',
    regionCode: 'MY'
    
})).then(res => res.json())
.then(data => {

    data.items.forEach(item => {
        // console.log(item);
        getChannelIcon(item);
    });
    

});


const getChannelIcon = (video_data) => {
    fetch('https://www.googleapis.com/youtube/v3/channels?' + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        // console.log(video_data);
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        // console.log(video_data.channelThumbnail);
        renderCart(video_data);
    });
};


const renderCart = (data) => {

    

    cardContainer.innerHTML += `

    <div class="card" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" alt="">
    <div class="desc">
        <img src="${data.channelThumbnail}" alt="">
        <div class="about-desc">
            <h6>${_.truncate(data.snippet.title)}</h6>
            <div class="about-vid">
                <p>${data.snippet.channelTitle}</p>
                <p>1 weeks ago</p>
            </div>
        </div>
    </div>
</div>
    
    `;

};

renderCart();




 



