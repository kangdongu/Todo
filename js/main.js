const loginInput = document.querySelector("#login-form input")
const loginForm = document.querySelector("#login-form")
const greeting = document.querySelector("#greeting")
const wrap = document.querySelector("#wrap")
const background = document.querySelector("#background")

const HIDDEN_CLASSNAME = "hidden"
const USERNAME_KEY = "username"

function onLoginSubmit(event){
    event.preventDefault()
    loginForm.classList.add(HIDDEN_CLASSNAME)
    const username = loginInput.value
    localStorage.setItem(USERNAME_KEY,username)
    paintGreeting(username)
}

function paintGreeting(username){
    greeting.innerText = `환영합니다. ${username}님`
    greeting.classList.remove(HIDDEN_CLASSNAME)
    wrap.classList.remove(HIDDEN_CLASSNAME)
    background.classList.remove(HIDDEN_CLASSNAME)
}
// loginForm.addEventListener("submit", onLoginSubmit)

const savedUsername = localStorage.getItem(USERNAME_KEY)

if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME)
    loginForm.addEventListener("submit", onLoginSubmit)
}else{
    paintGreeting(savedUsername)
}

