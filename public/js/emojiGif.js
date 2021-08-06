//emojiGif.js
// gifAPIkey(global)
// emojiAPIkey(global)
import {mainchatMessageArea} from './client-socket.js';
const p = console.log;
const searchInput = document.getElementById("features-search-input");
const EmojiButton = document.getElementById("features-emojis-button");
const GifButton = document.getElementById("features-gifs-button");
const featuresMenu = document.getElementById("features-menu");
const ratings = ["g","pg","pg-13","r"];
var ratingSelected = ratings[3];
const emojiIconList = [
	"&#128169",
	"&#129324",
	"&#129326",
	"&#128406",
	"&#129315"
]
function randoEmojiIcon(){
	let rando = Math.floor(Math.random()*emojiIconList.length);
	let theChosenOne = emojiIconList[rando];
	EmojiButton.querySelector('span').innerHTML += `${theChosenOne}`;
}
async function randomGIF(){
	let url = `https://api.giphy.com/v1/gifs/random?api_key=${gifAPIkey}&tag=&rating=${ratingSelected}`;
	let data = await fetch(url);
	let gifInfo = await data.json();
	p(gifInfo)
}
async function searchGIF(){
	let query = searchInput.value;
	let url = `https://api.giphy.com/v1/gifs/search?api_key=${gifAPIkey}&q=${query}&limit=12&offset=0&rating=${ratingSelected}&lang=en`;
	let data = await fetch(url);
	let gifInfo = await data.json();
	p(gifInfo)
}

//////////////////ReferenceError: emojiAPIkey is not defined/////////////////
async function allEmojis(){
	let url = `https://emoji-api.com/emojis?access_key=${emojiAPIkey}`;
	p("url")
	let data = await fetch(url);
	let emojiInfo = await data.json();
	p(emojiInfo)
}
//////////////////////////////////////////////////////////////////////////
document.addEventListener('click',(e)=>{
	if(e.target === GifButton && searchInput.value){
		searchGIF();
	}
	if(e.target === GifButton && !searchInput.value){
		randomGIF()
	}
	if(e.target === EmojiButton && !searchInput.value){
		allEmojis();
	}
})


export {
	randoEmojiIcon
}