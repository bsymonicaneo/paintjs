// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D 사용
const canvas = document.getElementById("jsCanvas"); // 캔버스 불러오기
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange"); // 선 굵기 
const mode = document.getElementById("jsMode"); // 버튼

// canvas element는 2개의 사이즈를 가져야함(css와 이것) css로 캔버스를 그리고 있으나, 픽셀을 다루는 엘리먼트로 그리고 있으니까 엘리멘트에도 canvas의 사이즈를 지정해줘야 선을 그릴 수 있음
// pixel modifier에 사이즈를 줌
canvas.width = 700; 
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // 선 색의 디폴트값
ctx.lineWidth = "2.5"; // 그리는 선의 굵기

ctx.fillRect(50, 20, 100, 40); // 캔버스에 색상 박스 생성   

let painting = false; // 클릭 이벤트에 대해서 페인팅 추가
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) { // 마우스 이벤트 주기
    const x = event.offsetX; // 캔버스 위 마우스 좌표 정보 가져오기
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    // console.log(x, y); // x와 y의 값을 브라우저 콘솔 로그에 찍어줌
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size; 
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerHTML = "Fill"; // paint 동작 시 버튼 노출
    } else {
        filling = true;
        mode.innerText = "Paint"; // fill 동작 시 버튼 노출
    }
}


function handleModeClick() {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
}


if (canvas) { // 캔버스가 있는지 찾기
    canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직였을때 설정
    canvas.addEventListener("mousedown", startPainting); // 마우스 클릭했을때 발생하는 설정
    canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 후 땠을때 발생하는 설정
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 벗어나면 발생하는 설정, stopPainting을 직접 입력
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
); 
// object로 부터 array 만드는 array.form 메소드 호출
// color네임은 array안에 있는 각 아이템들을 대표하는 것 아무거나 넣어줘도 됨

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}
