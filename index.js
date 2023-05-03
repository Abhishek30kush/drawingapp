const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

let isDrawing=false;
let tool="pen";
let lineWidth=5;
let opacity=1;
let strokeColor="#000000";
let fillColor="#ffffff"

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);

const penButton=document.getElementById("pen-button")
const brushButton=document.getElementById("brush-button")
const lineWidthInput=document.getElementById("line-width-input");
const opacityInput=document.getElementById("opacity-input");
const strokeColorInput=document.getElementById("stroke-color-input");
const fillColorInput=document.getElementById("fill-color-input");

penButton.addEventListener("click", ()=>{
    tool="pen";
});

brushButton.addEventListener("click", ()=>{
    tool="brush";
});

lineWidthInput.addEventListener("change",()=>{
    lineWidth=parseInt(lineWidthInput.value);
});

opacityInput.addEventListener("change", ()=>{
    opacity=parseFloat(opacityInput.value);
});

strokeColorInput.addEventListener("change", ()=>{
    strokeColor=strokeColorInput.value;
});

fillColorInput.addEventListener("change",()=>{
    fillColor=fillColorInput.value;
});


function startDrawing(event){
    isDrawing=true;
    draw(event);
}

function draw(event){
    if(!isDrawing) return;
    ctx.lineWidth=lineWidth;
    ctx.lineCap="round";
    ctx.strokeStyle=strokeColor;
    ctx.fillStyle=fillColor;
    ctx.globalAlpha=opacity;

    if(tool==="pen"){
        ctx.lineTo(event.clientX-canvas.offsetLeft, event.clientY-canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX-canvas.offsetLeft, event.clientY-canvas.offsetTop);
    } else if(tool==="brush") {
        ctx.beginPath();
        ctx.arc(event.clientX-canvas.offsetLeft, event.clientY-canvas.offsetTop, lineWidth / 2, 0, 2*Math.PI);
        ctx.fill();
    }

}
function stopDrawing(){
    isDrawing=false;
    ctx.beginPath();
}
