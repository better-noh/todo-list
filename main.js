// 1️⃣ input 태그에 유저가 값을 입력한다.
// 2️⃣ + 버튼을 클릭하면, 할 일이 추가된다.
// 3️⃣ 유저가 Delete 버튼을 누르면, 할 일이 삭제된다.
// 4️⃣ 유저가 Check 버튼을 누르면, 할 일이 끝나면서 취소선이 생긴다.
//  - check 버튼을 클릭하는 순간 false → true 
//  - true 이면 끝난 걸로 간주하고 취소선 보여주기
//  - false 이면 안 끝난 걸로 간주하고 그대로 보여주기
// 5️⃣ All → not Done → Done 탭을 누르면, 언더바가 이동한다.
// 6️⃣ not Done 탭은 진행 중인 아이템만, Done 탭은 끝난 아이템만 나온다.
// 7️⃣ All 탭을 누르면, 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");
addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function() {
    taskInput.value = "";
})

for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
}

function addTask(){
    let taskValue = taskInput.value;
    if (taskValue === "") return alert("할 일을 입력해주세요 :)");
    let task={
        id: randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
    };
    taskList.push(task);
    console.log(taskList);
    taskInput.value = "";
    render();
}

function enterkey() {
    if (window.event.keyCode == 13){
    // 엔터키가 눌렸을 때 실행할 내용
    addTask();
    }
}


function render(){
    // 1️⃣ 내가 선택한 탭에 따라서 
    // 2️⃣ 리스트를 달리 보여준다.
    let list = [];
    if(mode === "all") {
        // All → taskList
        list = taskList;
    }else if(mode === "ongoing" || mode ==="done") {
        // `not Done` 또는 `Done` → filterList
        list = filterList;
    }
    

    let resultHTML = '';
    for(let i=0;i<list.length;i++){
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        
        <div class="button-box">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-circle-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>`;
        }else {
            resultHTML += `<div class="task">
        <div>
            ${list[i].taskContent}
        </div>
        
        <div class="button-box">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-circle-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>`;
        }  
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}


function deleteTask(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            // break;
        }
    }
    filter();
}

function filter(event) {
    // 밑줄 이동
    if (event) {
        mode = event.target.id;
        // left 의 시작값
        underLine.style.left = event.target.offsetLeft + "px";
        // 밑줄의 넓이[길이]
        underLine.style.width = event.target.offsetWidth + "px";
        // 밑줄의 top 으로부터 떨어진 위치 
        underLine.style.top = 
        event.target.offsetTop + (event.target.offsetHeight - 4) +"px";
    } 

    filterList = [];
    if(mode === "all") {
        // 전체 리스트를 보여준다.
        render();
    }else if(mode === "ongoing") {
        // 진행 중인 아이템을 보여준다.
        // 진행 중: task.isComplete = false
        for(let i=0; i<taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList);
    }else if(mode === "done") {
        // 끝난 아이템을 보여준다.
        // 끝남: task.isComplete = true
        for(let i=0 ; i<taskList.length; i++) {
            if (taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        render(); 
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

