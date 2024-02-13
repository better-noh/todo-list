// 1️⃣ input 태그에 유저가 값을 입력한다.
// 2️⃣ + 버튼을 클릭하면, 할 일이 추가된다.
// 3️⃣ 유저가 Delete 버튼을 누르면, 할 일이 삭제된다.
// 4️⃣ 유저가 Check 버튼을 누르면, 할 일이 끝나면서 취소선이 생긴다.
// 5️⃣ All → not Done → Done 탭을 누르면, 언더바가 이동한다.
// 6️⃣ not Done 탭은 진행 중인 아이템만, Done 탭은 끝난 아이템만 나온다.
// 7️⃣ All 탭을 누르면, 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);


function addTask(){
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        resultHTML += `<div class="task">
        <div>
            ${taskList[i]}
        </div>
        
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}