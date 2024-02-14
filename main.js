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
let taskList = [];
addButton.addEventListener("click", addTask);


function addTask(){
    let task={
        id: randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        if (taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div>
        
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
    </div>`;
        }else {
            resultHTML += `<div class="task">
        <div>
            ${taskList[i].taskContent}
        </div>
        
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
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
            break;
        }
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

