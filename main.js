const element = document.querySelector('#file');
const mid = document.querySelector("#mid > div")
const head = document.querySelector("#head")
const bot = document.querySelector("#bot")
const midForm = document.querySelector("#midForm")
const saveBtn = document.querySelector("#saveBtn")
const loadBtn = document.querySelector("#loadBtn")
let value = null
let count = 0

// 파일 선택 기능
element.addEventListener('input', (event) => {
    const target = event.target;
    const files = target.files;
    const file = files[0]
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    
    reader.addEventListener('load', () => {
        let temp = reader.result.split("\n")
        let final = []
        for(let i =0; i<temp.length; i++){
            if(isNaN(Number(temp[i][0]))){
                final.push(temp[i])
            }
        }
        console.log(temp)
        value = final
        head.innerHTML = ""
        mid.innerHTML = '<form action="#" onsubmit="return false" id="midForm"><input type="text"></form>'
        bot.innerHTML = ""
        count = 0
        for(let i =1; i<final.length ; i++){
            const a = document.createElement("p")
            a.innerText = final[i]
            bot.appendChild(a)
        }
        const p = document.createElement("p")
        p.innerText = value[count]
        console.log(value)
        mid.prepend(p)
        count ++
    });
});

function showMainTyping(event){
    event.preventDefault()
    const oldP = document.querySelector("#mid > div > p")
    if(oldP!=null){
          oldP.remove();
    }
    const p = document.createElement("p")
    p.innerText = value[count]
    mid.prepend(p)
    count ++
    showBot()
    submitTranslation()
}

function showBot(){
    bot.firstChild.remove();
}

function submitTranslation(){
    const inputValue = document.querySelector("#midForm > input").value
    document.querySelector("#midForm > input").value = ""
    showTop(inputValue)
}

function showTop(inputValue){
    const pWrap = document.createElement("div")
    const p = document.createElement("p")
    p.innerText = value[count-2]
    pWrap.appendChild(p)
    const p2 = document.createElement("p")
    p2.innerText = inputValue
    pWrap.appendChild(p2)
    head.appendChild(pWrap)
    head.scrollTop = head.scrollHeight;
}

function localSave(){
    localStorage.setItem("head",head.innerHTML)
    localStorage.setItem("mid",mid.innerHTML)
    localStorage.setItem("bot",bot.innerHTML)
    localStorage.setItem("count",count)
    localStorage.setItem("value", JSON.stringify(value))
}

function localLoad(){
    value = JSON.parse(localStorage.getItem("value"))
    if(value!=null){
        head.innerHTML = localStorage.getItem("head")
        mid.innerHTML = localStorage.getItem("mid")
        bot.innerHTML = localStorage.getItem("bot")
        count = localStorage.getItem("count")
    }
}

mid.addEventListener("submit",showMainTyping)
saveBtn.addEventListener("click",localSave)
loadBtn.addEventListener("click",localLoad)
// document.querySelector("#removeLocal").addEventListener("click",()=>window.localStorage.clear())
