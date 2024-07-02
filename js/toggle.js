const toggleButton = document.querySelector(".toggle_button")
const toggleWrap = document.querySelector("#wrap")
const toggleImg = document.querySelector(".toggle_button img")
let t = true
function toggleEvent(){
    
    if(t == true){
        toggleWrap.style.display = "none"
        toggleImg.src = "./img/toggle2.png"
        t = false
    }else if(t == false){
        toggleWrap.style.display = "block"
        toggleImg.src = "./img/toggle1.png"
        t = true
    }
    
}

toggleButton.addEventListener("click",toggleEvent)