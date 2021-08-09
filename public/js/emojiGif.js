//emojiGif.js
// gifAPIkey(global)
// emojiAPIkey(global)
//emojiAPIkey = "7c1a8fdba401fa696373ff67213109114f05e1f1";
//gifAPIkey = "wd4XV1dNHMoJGtWlJ6r6n8xPpCZ1h6XC";
import {
    socket,
    screenname
} from "./signin-modal.js";
import {mainchatMessageArea,mainchatInput} from './client-socket.js';
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
//////////////////////////////////////////////////////////////
document.addEventListener('click',(e)=>{
	if(e.target === GifButton && searchInput.value){
		(async()=>{
			let search = await searchGIF();	
			await searchGIFdisplay(search);
		})()
	}
	if(e.target === GifButton && !searchInput.value){
		(async()=>{
			let randomGif = await randomGIF();
			await randomGIFdisplay(randomGif);
		})()
	}
	if(e.target.matches(".mainchat-grid_send-component--features__menu--gifSearchItems")||e.target.matches(".mainchat-grid_send-component--features__menu--randomGIF")){
		
		p(e.target.src)
		if(mainchatInput.value.length>3){
			socket.emit('gif.message', {
                screenname,
                message: mainchatInput.value,
                image: e.target.src
            })	
		}
	}
	if(e.target === EmojiButton && searchInput.value){
		searchEmojis();
	}
})
////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
function randoEmojiIcon(){
	let rando = Math.floor(Math.random()*emojiIconList.length);
	let theChosenOne = emojiIconList[rando];
	EmojiButton.querySelector('span').innerHTML += `${theChosenOne}`;
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
async function randomGIF(){
	// https://api.giphy.com/v1/gifs/random?api_key=wd4XV1dNHMoJGtWlJ6r6n8xPpCZ1h6XC&tag=&rating=r
	let url = `https://api.giphy.com/v1/gifs/random?api_key=${gifAPIkey}&tag=&rating=${ratingSelected}`;
	let data = await fetch(url);
	let gifInfo = await data.json();
	return gifInfo.data.images.fixed_width_downsampled.url;
}
async function randomGIFdisplay(randomGif){
	if(featuresMenu.hasChildNodes){
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
async function searchGIF(){
	// https://api.giphy.com/v1/gifs/search?api_key=wd4XV1dNHMoJGtWlJ6r6n8xPpCZ1h6XC&q=treasure&limit=12&offset=0&rating=r&lang=en`
	p(gifAPIkey)
	let query = searchInput.value;
	let url = `https://api.giphy.com/v1/gifs/search?api_key=${gifAPIkey}&q=${query}&limit=12&offset=0&rating=${ratingSelected}&lang=en`;
	let data = await fetch(url);
	var gifInfo = await data.json();
	var gifs = gifInfo.data;
	return gifs
	//p(gifInfo.data[0].images.fixed_width_small.url)
}
async function searchGIFdisplay(gifs){
	if(featuresMenu.hasChildNodes){
		featuresMenu.innerHTML = ""
	}
	for(var i =0;i<gifs.length;i++ ){
		featuresMenu.innerHTML+=`
		<a href="#" >
			<img class="mainchat-grid_send-component--features__menu--gifSearchItems" src=${gifs[i].images.fixed_width_small.url}/>
		</a>`
	}
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
async function searchEmojis(){
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