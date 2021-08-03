//emojiGif.js

const p = console.log;
const searchInput = document.getElementById("features-search-input");
const EmojiButton = document.getElementById("features-emojis-button");
const GifButton = document.getElementById("features-gifs-button");

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

	if(e.target === EmojiButton || e.target === GifButton ){
		if(!searchInput.value) return;
	}
})







export {
	randoEmojiIcon
}