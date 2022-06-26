// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D 사용
const canvas = document.getElementById("jsCanvas"); // 캔버스 불러오기
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange"); // 선 굵기 
const mode = document.getElementById("jsMode"); // 버튼
const saveBtn = document.getElementById("jsSave"); // save 버튼 기능 만들기

const INITIAL_COLOR = "#2c2c2c"; // 디폴트 값
const CANVAS_SIZE = 700;

// canvas element는 2개의 사이즈를 가져야함(css와 이것) css로 캔버스를 그리고 있으나, 픽셀을 다루는 엘리먼트로 그리고 있으니까 엘리멘트에도 canvas의 사이즈를 지정해줘야 선을 그릴 수 있음
// pixel modifier에 사이즈를 줌
canvas.width = CANVAS_SIZE; 
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; //fill과 stroke을 검은색 디폴트로 하기 전에 캔버스 배경색 설정
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // 선 색의 디폴트값
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = "2.5"; // 그리는 선의 굵기

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
    ctx.fillStyle = color;
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
        ctx.fillStyle = ctx.strokeStyle; // 색채우기와 색상버튼의 색이 같도록
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


function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // FILL 모드가 아닐 경우, 페인팅 되도록 
    }
}


function handleCM(event) {
    event.preventDefault(); // 마우스 오른쪽 이미지 저장 키이벤트 불가
} 


function handleSaveClick() {
    const image = canvas.toDataURL(); // 이미지 저장 타입을 만듬, 기본 png
    const link = document.createElement("a"); // 이미지 링크를 만듬
    link.href = image; // href는 image(url)가 되어야 하고
    link.download = "PaintJS[EXPORT]"; // 다운로드는 이름을 가지고 있어야 저장 네임이 설정됨
    link.click();
}


if (canvas) { // 캔버스가 있는지 찾기
    canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직였을때 설정
    canvas.addEventListener("mousedown", startPainting); // 마우스 클릭했을때 발생하는 설정
    canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 후 땠을때 발생하는 설정
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 벗어나면 발생하는 설정, stopPainting을 직접 입력
    canvas.addEventListener("click", handleCanvasClick); // 색채워넣기 fill
    canvas.addEventListener("contextmenu", handleCM); // 마우스 오른쪽 금지
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

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
