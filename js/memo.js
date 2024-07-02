const memoInput = document.querySelector(".memo_input")
const memoButton = document.querySelector(".memo_button")
const memoList = document.querySelector("#memo_list")

const MEMO_KEY = "memos"

let memos = []

function saveMemos(){
    localStorage.setItem(MEMO_KEY, JSON.stringify(memos))
}

function deleteMemo(event){
    const memoli = event.target.parentElement;
    memoli.remove();
    memos = memos.filter((memo) => memo.id !== parseInt(memoli.id))
    saveMemos();
}

function paintMemo(newMemo){
    const memoli = document.createElement("li");
    memoli.id = newMemo.id;
    const span = document.createElement("span");
    span.innerText = newMemo.text;
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", deleteMemo);
    memoli.appendChild(span);
    memoli.appendChild(button);
    memoList.appendChild(memoli);
}

function memoButtonEvent(){
    const newMemo = memoInput.value;
    memoInput.value = "";
    if(newMemo !== ""){
    const newMemoObj = {
        text: newMemo,
        id: Date.now(),
    };
    memos.push(newMemoObj);
    paintMemo(newMemoObj);
    saveMemos();
    }else{
        alert("메모를 작성해주세요.")
    }
}

const savedMemos = localStorage.getItem(MEMO_KEY)

if(savedMemos !== null){
    const parsedMemos = JSON.parse(savedMemos);
    memos = parsedMemos;
    parsedMemos.forEach(paintMemo)
}

memoButton.addEventListener("click",memoButtonEvent)