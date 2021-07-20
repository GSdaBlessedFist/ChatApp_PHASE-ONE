//signin.js;
import{
    mainchatInput,
    mainchatMessageArea
}from "./client-socket.js";

sessionStorage.clear();
const a = alert;
const p = console.log;
const url = "http://localhost:3400";
// const socket = io.connect(url);
const socket = io();
document.title += "";
var clientNumber;
const signinModal = document.getElementById("signin-modal"),
      siginModalScreen = document.getElementById("sigin-modal-screen"),
      signinModalMessageBox = document.getElementById("signin-modal-message-box"),
      signinModalMessageBoxInput = document.getElementById("signin-modal-message-box--input"),
      mainchatGridSendComponent= document.getElementById("mainchat-grid_send-component");
const styles = getComputedStyle(document.documentElement);
const lazyFadeOutTime = styles.getPropertyValue('--lazy').slice(0, -1);
const quickFadeOutTime = styles.getPropertyValue('--quick').slice(0, -1);
var si = true;


////////////// SETTING DEFAULT SCREENNAME //////////////
const randomDefaultScreenNames = ["TypieTech", "Cesars_Salad", "Lazarus_Lu",
    "Salazar_One", "Dollar_Bunny", "Grimmace2020",
    "Plot_Lover", "Kill_em_with_wine-ness"
];
const randomNameSelection = function() {
    return randomDefaultScreenNames[Math.floor(Math.random() * randomDefaultScreenNames.length)];
}
const noSpaces = function(str) {
        let x = str.replace(/ /g, "_").trim();
        return x;
    }
    // signinModalMessageBoxInput.placeholder = randomNameSelection();
    // const screenname = noSpaces(signinModalMessageBoxInput.value) || signinModalMessageBoxInput.placeholder;
signinModalMessageBoxInput.placeholder = randomNameSelection();
var screenname = signinModalMessageBoxInput.placeholder;
signinModalMessageBoxInput.addEventListener('change', (e) => {
    e.preventDefault();
    screenname = noSpaces(e.target.value)
    return null;
});

//////////////////////// COMMs ////////////////////////
document.body.addEventListener("keyup", (e) => {
    //IF ENTER IS PRESSED
    if (e.keyCode === 13) {
        if(si == true){
            socket.emit("add-client", {
                screenname,
                socketinfo: socket.id
            })
            p("%cUsername registered", "color:green;font-size:1.25em");
            gsap.to(signinModalMessageBox, {
                opacity: 0,
                duration: lazyFadeOutTime
            });
            gsap.to(siginModalScreen, {
                opacity: 0,
                duration: lazyFadeOutTime,
                delay: .45
            });
            /////////// CLOSES SIGNIN MODAL ///////////
            setTimeout(() => {
                signinModal.classList.add("x");
                signinModal.remove();
                si = false;
            }, lazyFadeOutTime)
            document.title= `ChatApp : ${screenname}`
        }
        if(si==false){
            p("Signin modal is closed.")
            if (mainchatInput.value.length > 3) {
                socket.emit('message.chat', {
                    screenname,
                    message: mainchatInput.value,
                    image: null
                })
            }
            mainchatInput.autofocus = true;
            mainchatInput.value = "";        
        }
    }
})

export {
    url,
    socket,
    styles,
    noSpaces,
    screenname,
    lazyFadeOutTime,
    quickFadeOutTime,
    si //<signin interface on/off
}