// write your code here!
const likeButton = document.getElementById("duck-display-likes")
const formSubmit = document.getElementById("new-duck-form")
let currentDuck

likeButton.addEventListener("click", ()=>{
    currentDuck.likes = currentDuck.likes+1
    document.getElementById("duck-display-likes").innerText = `${currentDuck.likes} likes`
})

formSubmit.addEventListener("submit", (e)=>{
    e.preventDefault()
    const newDuck = { 
        name: e.target[0].value,
        img_url: e.target[1].value,
        likes: 0
    }

    renderNavElement(newDuck)
    renderCurrentDuck(newDuck)
})

function initialize(){
    fetch("http://localhost:3000/ducks")
    .then(r=>r.json())
    .then((data)=>{
        data.forEach((duck)=>{
            renderNavElement(duck)
        })
        renderCurrentDuck(data[0])
    })
}

function renderNavElement(duck){
    const duckNav = document.getElementById("duck-nav")
    const newDuck = document.createElement("img")
    newDuck.src = duck.img_url
    newDuck.addEventListener("click", ()=>{
        renderCurrentDuck(duck)
    })
    duckNav.append(newDuck)
}

function renderCurrentDuck(duck){
    currentDuck = duck
    document.getElementById("duck-display-name").innerText = duck.name
    document.getElementById("duck-display-image").src = duck.img_url
    document.getElementById("duck-display-likes").innerText = `${duck.likes} likes`
}

initialize()