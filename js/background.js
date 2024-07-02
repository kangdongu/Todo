const images = [
    "1.png","2.png","3.png","4.png","5.png","6.png","7.png"
]

const chosenImage = images[Math.floor(Math.random() * images.length)]
const backgroundImg = document.querySelector("#background")
const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`

backgroundImg.prepend(bgImage)
