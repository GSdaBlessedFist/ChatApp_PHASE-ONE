import {
    socket,
    url,
    styles,
    noSpaces,
    screenname,
    lazyFadeOutTime,
    quickFadeOutTime,
    si
} from "./signin-modal.js";
const p = console.log;
const a = alert;


const chatArea = document.getElementById("chat-area"),
    mainchatExpand = document.getElementById("mainchat-expand"),
    mainchatSendButton = document.getElementById("mainchat-sendButton"),
    mainchatInput = document.getElementById("mainchat-input"),
    mainchatMessageArea = document.getElementById("mainchat-messageArea");
mainchatExpand.style.display = "none";
mainchatMessageArea.innerHTML = "";
mainchatMessageArea.scrollTop = mainchatMessageArea.scrollHeight;
var sidechat1Socket;
////////////////////EVENT HANDLERS////////////////////////
document.addEventListener('click', (e) => {
    var target = e.target;
    if (target.matches("#mainchat-sendButton")) {
        e.preventDefault();
        if (mainchatInput.value.length > 3) {
            socket.emit('message.chat', {
                screenname,
                message: mainchatInput.value,
                image: null
            })
        }
        mainchatInput.value = "";
        mainchatInput.autoResize();
    } //#mainchat-sendButton
})

socket.on('chat', (data) => {
    function updateScroll(){
        mainchatMessageArea.scrollTop = mainchatMessageArea.scrollHeight;
    }
    function dateFormat(){
        var date = new Date();
        return `${date.toLocaleTimeString()}`;
    }
    mainchatMessageArea.innerHTML += `
        <div class="messageObj ${socket.id==data.socketInfo?"":"others-message"}">
                <div class="messageObj--screenname"><div>${data.screenname}
                    <span class="messageObj--message-date" id="message-date">${dateFormat()}</span>
                </div>
                <div class="messageObj--message">${data.message}</div>
                <div class="messageObj--image ">${data.image}</div>
        </div>
    `;
    updateScroll();
        // var links = Array.from(document.getElementsByClassName("messageObj--screenname"));
})


export{
    mainchatInput,
    mainchatMessageArea
}