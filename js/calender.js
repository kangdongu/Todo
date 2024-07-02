        const form = document.querySelector("#todos_list_box form")
        const ul = document.querySelector("#todos_list_box ul")
        const todosDay = document.querySelector("#todos_day")
        const todosMonth = document.querySelector("#todos_month")
        const input = document.querySelector("#todo_form input")
        const todolistMonth = document.querySelector("#todo_list_month")
        const monthText = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      
        window.onload = function () { 
            buildCalendar(); // 웹 페이지가 로드되면 buildCalendar 실행 
        }    

        let td = document.querySelector("td")

        let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
        let today = new Date();     // 페이지를 로드한 날짜를 저장
        let todayMonth = nowMonth.getMonth()
        today.setHours(0,0,0,0);    // 비교 편의를 위해 today의 시간을 초기화

        // 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
        function buildCalendar() {

            let firstDate = new Date(nowMonth.getFullYear(), todayMonth, 1);     // 이번달 1일
            let lastDate = new Date(nowMonth.getFullYear(), todayMonth + 1, 0);  // 이번달 마지막날
            
            let tbody_Calendar = document.querySelector(".Calendar > tbody");
            document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
            document.getElementById("calMonth").innerText = monthText[todayMonth] ;  // 월 숫자 갱신

            while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
                tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
            }

            let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

            for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
                let nowColumn = nowRow.insertCell();        // 열 추가
            }

            for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

                let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
                nowColumn.innerText = leftPad(nowDay.getDate());      // 추가한 열에 날짜 입력

            
                if (nowDay.getDay() == 0) {                 // 일요일인 경우 글자색 빨강으로
                    nowColumn.style.color = "#DC143C";
                }
                if (nowDay.getDay() == 6) {                 // 토요일인 경우 글자색 파랑으로 하고
                    nowColumn.style.color = "#0000CD";
                    nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
                }
                if (nowDay < today) {                       // 지난날인 경우
                    nowColumn.className = "pastDay";
                    nowColumn.onclick = function () { choiceDate(this); }
                }
                else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                    nowColumn.className = "today";
                    nowColumn.onclick = function () { choiceDate(this); }
                }
                else {                                      // 미래인 경우
                    nowColumn.className = "futureDay";
                    nowColumn.onclick = function () { choiceDate(this); }
                }
            }
        }


        todosMonth.innerText = monthText[todayMonth]
        todosDay.innerText = today.getDate()
        
        if(todosDay.innerText < 10){
             todosDay.innerText = `0${todosDay.innerText}`
        }

        let tdDayText = todosDay.innerText
        let dateToDos = loadAllToDosFromLocalStorage() || {};


        function saveToDos() {
            const key = `${monthText[todayMonth]}${tdDayText}`;
            localStorage.setItem(key, JSON.stringify(dateToDos[key])); // 저장할 때 키를 사용하여 날짜에 맞는 To-Do 목록 가져오기
        }

        function inputSubmit(event) {
            event.preventDefault();
            const inputVal = input.value;
            input.value = "";
            if(inputVal !== ""){
            const newTodoObj = {
                text: inputVal,
                id: Date.now(),
            };
        
            const key = `${monthText[todayMonth]}${tdDayText}`;
            if (!dateToDos[key]) {
                dateToDos[key] = [];
            }
            dateToDos[key].push(newTodoObj);
        
            saveToDos();
            paintTodo(newTodoObj);
            }else{
                alert("내용을 입력해 주세요.")
            }
        }

        function paintTodo(newTodo) {
            const li = document.createElement("li");
            li.id = newTodo.id;
            const check = document.createElement("input")
            check.type = "checkbox"
            check.className = "todo_checkbox"
            const span = document.createElement("span");
            span.innerText = newTodo.text;
            const button = document.createElement("button");
            button.innerText = "x";
            button.addEventListener("click", () => deleteToDoForCurrentDate(newTodo.id));
            check.addEventListener("change",function(){
                if (this.checked) {
                    span.style.opacity = 0.5;
                } else {
                    span.style.opacity = 1;
                }
            })
            li.appendChild(check)
            li.appendChild(span);
            li.appendChild(button);
            ul.appendChild(li);
        }

        function paintToDosForCurrentDate() {
            const key = `${monthText[todayMonth]}${tdDayText}`;
            const savedToDos = localStorage.getItem(key);
            if (savedToDos !== null) {
                const parsedToDos = JSON.parse(savedToDos);
                parsedToDos.forEach(paintTodo);
            }
        }
        
        // 날짜 선택
        function choiceDate(nowColumn) {
            if (document.getElementsByClassName("choiceDay")[0]) {
                document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
            }
            nowColumn.classList.add("choiceDay");
        
            const li = document.querySelectorAll("ul li");
            for (let i = 0; i < li.length; i++) {
                li[i].remove();
            }
        
            todosMonth.innerText = monthText[todayMonth];
            todosDay.innerText = nowColumn.innerText;
            tdDayText = nowColumn.innerText;
        
            paintToDosForCurrentDate();
        }

        // 이전달 버튼 클릭
        function prevCalendar() {
            nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
            todayMonth = todayMonth -1
            if(todayMonth < 0){
                todayMonth = 11;
            }
            buildCalendar();    // 달력 다시 생성
            const prevMonthFirstDay = document.querySelector(".futureDay");
            const nowMonthDay = document.querySelector(".today")
            if (nowMonthDay){
                nowMonthDay.click();
            }else if (prevMonthFirstDay) {
                prevMonthFirstDay.click();
            }
            
        }
        // 다음달 버튼 클릭
        
        function nextCalendar() {
            nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
            todayMonth = todayMonth+1
            if(todayMonth > 11){
                todayMonth = 0;
            }
            buildCalendar();    // 달력 다시 생성
            const nextMonthFirstDay = document.querySelector(".futureDay");
            const nowMonthDay = document.querySelector(".today")
            if (nowMonthDay){
                nowMonthDay.click();
            }else if (nextMonthFirstDay) {
                nextMonthFirstDay.click();
            }
        }

        // input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
        function leftPad(value) {
            if (value < 10) {
                value = "0" + value;
                return value;
            }
            return value;
        }

        let savedToDos = localStorage.getItem(`${monthText[todayMonth]}${tdDayText}`)
        if(savedToDos !== null){
            const key = `${monthText[todayMonth]}${tdDayText}`
        const parsedToDos = JSON.parse(savedToDos);
        dateToDos[key] = parsedToDos;
        parsedToDos.forEach(paintTodo)
    }

    function deleteToDoForCurrentDate(todoId) {
        const key = `${monthText[todayMonth]}${tdDayText}`;
        dateToDos[key] = dateToDos[key].filter((todo) => todo.id !== todoId);
    
        saveToDos();
        ul.removeChild(document.getElementById(todoId));
    }
    function loadAllToDosFromLocalStorage() {
        const allToDos = {};
        for (let i = 0; i < monthText.length; i++) {
            for (let j = 1; j <= 31; j++) {
                const key = `${monthText[i]}${leftPad(j)}`;
                const savedToDos = localStorage.getItem(key);
                if (savedToDos !== null) {
                    allToDos[key] = JSON.parse(savedToDos);
                }
            }
        }
        return allToDos;
    }

        form.addEventListener("submit", inputSubmit)