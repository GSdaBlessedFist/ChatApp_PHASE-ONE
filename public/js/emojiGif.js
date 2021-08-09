//emojiGif.js
// gifAPIkey(global)
// emojiAPIkey(global)
//emojiAPIkey = "7c1a8fdba401fa696373ff67213109114f05e1f1";
//gifAPIkey = "wd4XV1dNHMoJGtWlJ6r6n8xPpCZ1h6XC";
import {
    socket,
    screenname
} from "./signin-modal.js";
import {
    mainchatMessageArea,
    mainchatInput
} from './client-socket.js';
const p = console.log;
const searchInput = document.getElementById("features-search-input");
const EmojiButton = document.getElementById("features-emojis-button");
const GifButton = document.getElementById("features-gifs-button");
const featuresMenu = document.getElementById("features-menu");
const ratings = ["g", "pg", "pg-13", "r"];
var ratingSelected = ratings[3];
const emojiIconList = [
    "&#128169",
    "&#129324",
    "&#129326",
    "&#128406",
    "&#129315"
]
//////////////////////////////////////////////////////////////
document.addEventListener('click', (e) => {
    if (e.target === GifButton && searchInput.value) {
        (async () => {
            let search = await searchGIF();
            await searchGIFmenuDisplay(search);
            let searchPicLinks = document.querySelectorAll('.mainchat-grid_send-component--features__menu--gifSearchItems');
            searchPicLinks.forEach((e)=>{
            	e.addEventListener('click',(e)=>{
            		console.log('yes')
            		// socket.emit('gif.message', {
              //               screenname,
              //               // message: mainchatInput.value,
              //               image: e.dataset.original
              //       })
            	})
            })
        })()
    }
    if (e.target === GifButton && !searchInput.value) {
        (async () => {
                var randomGif = await randomGIF();
                await randomGIFmenuDisplay(randomGif.preview);
                let randPicLink = document.querySelector('.mainchat-grid_send-component--features__menu--randomGIF');
                randPicLink.addEventListener('click', (e) => {
                    socket.emit('gif.message', {
                            screenname,
                            // message: mainchatInput.value,
                            image: randomGif.original
                    })
                })
            }
        )()
	}
	if (e.target === EmojiButton && searchInput.value) {
	    searchEmojis();
	}
})
////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
function randoEmojiIcon() {
    let rando = Math.floor(Math.random() * emojiIconList.length);
    let theChosenOne = emojiIconList[rando];
    EmojiButton.querySelector('span').innerHTML += `${theChosenOne}`;
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
async function randomGIF() {
    // https://api.giphy.com/v1/gifs/random?api_key=wd4XV1dNHMoJGtWlJ6r6n8xPpCZ1h6XC&tag=&rating=r
    let url = `https://api.giphy.com/v1/gifs/random?api_key=${gifAPIkey}&tag=&rating=${ratingSelected}`;
    let data = await fetch(url);
    let gifInfo = await data.json();
    return {
        preview: gifInfo.data.images.fixed_width_downsampled.url,
        original: gifInfo.data.images.original.url
    };
}
async function randomGIFmenuDisplay(randomGif) {
    if (featuresMenu.hasChildNodes) {
        featuresMenu.innerHTML = ""
    }
    var gif = randomGif;
    const html = `
		<a href="#">
			<img class="mainchat-grid_send-component--features__menu--randomGIF" src=${gif}/>
		</a>
	`;
    featuresMenu.innerHTML += html;
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
async function searchGIF() {
    // https://api.giphy.com/v1/gifs/search?api_key=wd4XV1dNHMoJGtWlJ6r6n8xPpCZ1h6XC&q=treasure&limit=12&offset=0&rating=r&lang=en`
    p(gifAPIkey)
    let query = searchInput.value;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${gifAPIkey}&q=${query}&limit=12&offset=0&rating=${ratingSelected}&lang=en`;
    let data = await fetch(url);
    var gifInfo = await data.json();
    var gifs = gifInfo.data;
    return gifs;
    //p(gifInfo.data[0].images.fixed_width_small.url)
}
async function searchGIFmenuDisplay(gifs) {
    if (featuresMenu.hasChildNodes) {
        featuresMenu.innerHTML = ""
    }
    for (var i = 0; i < gifs.length; i++) {
        featuresMenu.innerHTML += `
		<a href="#" >
			<img class="mainchat-grid_send-component--features__menu--gifSearchItems" data-original=${gifs[i].images.original.url} src=${gifs[i].images.fixed_width_small.url}/>
		</a>`
		console.log(featuresMenu)
    }

}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
async function searchEmojis() {
    let query = searchInput.value;
    let url = `https://emoji-api.com/emojis?search=${query}&access_key=${emojiAPIkey}`;
    let data = await fetch(url);
    let emojiInfo = await data.json();
    p(emojiInfo)
}
//////////////////////////////////////////////////////////////////////////
export {
    randoEmojiIcon
}