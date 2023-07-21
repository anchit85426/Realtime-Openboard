
let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let mouseDown=false;
let pencilColor=document.querySelectorAll(".pencil-color");
let pencilWidthEle=document.querySelector(".pencil-width");
let eraseWidthEle=document.querySelector(".erase-width");
// canvas is used for drawing purpose
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let tool=canvas.getContext("2d");
let pencolor="red";
let eraseColor="white";
let penWidth=pencilWidthEle.value;
let eraseWidth=eraseWidthEle.value;
tool.strokeStyle=pencolor;
tool.lineWidth=penWidth;
let download = document.querySelector(".download");

// canvas.clearRect(0, 0, canvas.width, canvas.height);

let undoRedoTracker = []; //Data
let track = 0; // Represent which action from tracker array
let url = canvas.toDataURL();
undoRedoTracker.push(url);
canvas.addEventListener("mousedown",(e)=>{
    // object pressed(canvas)
    mouseDown=true;
    // passing object
    let data={
        x:e.clientX,
        y:e.clientY,
        
    }
    // beginPath({
    //     x:e.clientX,
    //     y:e.clientY,
        
    // });
    // send data to server
    socket.emit("beginPath",data);
})
canvas.addEventListener("mousemove",(e)=>{
    // dragging
    if(mouseDown){
       let data={
            x:e.clientX,
            y:e.clientY,
            color: eraseflag ? eraseColor:pencolor,
            width: eraseflag ? eraseWidth:penWidth
        }
        socket.emit("drawStroke",data);
    }
})
canvas.addEventListener("mouseup",(e)=>{
    //release
    mouseDown=false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
})

undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    // track action
    let data= {
        trackValue: track,
        undoRedoTracker
    }
    // undoRedoCanvas(Trackdata);
    socket.emit("redoUndo",data);
})
redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length-1) track++;
    // track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    // undoRedoCanvas(Trackdata);
    socket.emit("redoUndo",data);
   
})

function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}
function beginPath(StrokeObj){
    tool.beginPath();
    tool.moveTo(StrokeObj.x,StrokeObj.y);
}
function drawStroke(StrokeObj){
    tool.strokeStyle=StrokeObj.color;
   
    tool.lineWidth=StrokeObj.width;
    tool.lineTo(StrokeObj.x,StrokeObj.y);
    tool.stroke();
}
pencilColor.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
        let color=colorElem.classList[0];
        pencolor=color;
        tool.strokeStyle=pencolor;
    })
})
pencilWidthEle.addEventListener("change",(e)=>{
    penWidth=pencilWidthEle.value;
    tool.lineWidth=penWidth;

})
eraseWidthEle.addEventListener("change",(e)=>{
    eraseWidth=eraseWidthEle.value;
    tool.lineWidth=eraseWidth;

})
erase.addEventListener("click",(e)=>{
    console.log("erase");
    if(eraseflag){
        tool.strokeStyle=eraseColor;
        tool.lineWidth=eraseWidth;
    }
    else{
        tool.strokeStyle=pencolor;
        tool.linewidth=penWidth;
    }
})

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})
socket.on("beginPath",(data)=>{
    beginPath(data);
})
socket.on("drawStroke",(data)=>{
    drawStroke(data);
})
socket.on("redoUndo",(data)=>{
    undoRedoCanvas(data);
})