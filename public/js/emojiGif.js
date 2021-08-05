//emojiGif.js
// gifAPIkey(global)
import {mainchatMessageArea} from './client-socket.js';
const p = console.log;
const searchInput = document.getElementById("features-search-input");
const EmojiButton = document.getElementById("features-emojis-button");
const GifButton = document.getElementById("features-gifs-button");
const featuresMenu = document.getElementById("features-menu");
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
document.addEventListener('click',(e)=>{
	if(e.target === GifButton){
		featuresProcess("gif");
	}
})
function featuresProcess($emoji_or_gif){
//@ generalAPIcall($call)=> result
//@ display($result)
	var call = $emoji_or_gif;
	var result;
///////////////////////API call/////////////////////////////////////
	function generalAPIcall($call){
		

		if($call === "emoji"){
			return;
		}
		if($call === "gif"){
			const rating = ["g","pg","pg-13","r"];
			//blank search field
			if(!searchInput.value){
				const apiCall = async()=>{
					let url = `https://api.giphy.com/v1/gifs/random?api_key=${gifAPIkey}&tag=&rating=${rating[3]}`;
					let data = await fetch(url);
					var gifInfo = await data.json();
					result = gifInfo;
					return result;
				};
				result = apiCall();
			}else{
				const apiCall = async ()=>{
					let query = searchInput.value;
					let url = `https://api.giphy.com/v1/gifs/search?api_key=${gifAPIkey}&q=${query}&limit=12&offset=0&rating=${rating[3]}&lang=en`;
					let data = await fetch(url);
					var gifInfo = await data.json();
					result = gifInfo;
					return result;
				};
				result = apiCall();
			}
		}
		return result
	}
	generalAPIcall(call)
	p(result[2])//<----HERE
//////////////////////DISPLAY////////////////////////////////////// <==
	function display(){}

}	



export {
	randoEmojiIcon
}