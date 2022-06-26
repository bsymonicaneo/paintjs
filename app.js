const canvas = document.getElementById("jsCanvas"); // 캔버스 불러오기
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "##2c2c2c";
ctx.lineWidth = "2.5"; // 그리는 선의 굵기

let painting = false; // 클릭 이벤트에 대해서 페인팅 추가

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) { // 마우스 이벤트 주기
    const x = event.offsetX; // 캔버스 위 마우스 좌표 정보 가져오기
    const y = event.offsetY;
    // console.log(x, y); // x와 y의 값을 브라우저 콘솔 로그에 찍어줌
}

function onMouseDown(event) {
    painting = true; // 마우스 클릭 상태에서 그려지도록 기능 줌
}

function onMouseUp(event) {
    stopPainting() // 마우스 클릭 완료 시 그려지지 않도록 기능 줌
}


if (canvas) { // 캔버스가 있는지 찾기
    canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직였을때 설정
    canvas.addEventListener("mousedown", onMouseDown); // 마우스 클릭했을때 발생하는 설정
    canvas.addEventListener("mouseup", onMouseUp); //마우스 클릭 후 땠을때 발생하는 설정
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 벗어나면 발생하는 설정, stopPainting을 직접 입력
}
