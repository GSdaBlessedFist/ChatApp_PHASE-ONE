import {
    socket,
    url,
    styles,
    noSpaces,
    screenname,
    lazyFadeOutTime,
    quickFadeOutTime
} from "./signin-modal.js";

const p = console.log;
const a = alert;
// localStorage.clear();

const chatArea = document.getElementById("chat-area"),
    mainchatExpand = document.getElementById("mainchat-expand"),
    mainchatSendButton = document.getElementById("mainchat-sendButton"),
    mainchatInput = document.getElementById("mainchat-input"),
    mainchatMessageArea = document.getElementById("mainchat-messageArea");
mainchatExpand.style.display = "none";
mainchatMessageArea.innerHTML = "";

var sidechat1Socket;

////////////////////EVENT HANDLERS/////////////////////////
if (document.addEventListener) {
    p('please')
}
document.addEventListener('click', (e) => {
    var target = e.target;

    if (target.matches("#mainchat-sendButton")) {
        e.preventDefault();
        if (mainchatInput.value.length > 3) {
            socket.emit('message.chat', {
                // screenname: noSpaces(mdlScreenNameInput.value) || mdlScreenNameInput.placeholder,
                // message: scMessageInput.value,
                // action: "a message was sent"
                screenname,
                message: mainchatInput.value,
                image: null
            })
        }
        mainchatInput.value = "";
    } //#mainchat-sendButton


})


socket.on('chat', (data) => {
        mainchatMessageArea.innerHTML += `
        <div class="messageObj ${socket.id==data.socketInfo?"":"others-message"}">
             <div class="messageObj--screenname"><div>${data.screenname}</div></a>
             <div class="messageObj--message">${data.message}</div>
             <div class="messageObj--image x">${data.image}</div>
        </div>
    `;
        // var links = Array.from(document.getElementsByClassName("messageObj--screenname"));
        


        
    })
    ///////////////////////////////////////////////////////
