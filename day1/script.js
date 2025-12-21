

// const runDay1 = async() => {
    
//     await enterInput(inputArray);
// }
var AnimationStatus = false;
var UseOfficialInput = false;
var animationDelay = 20;
var pause = 200;
const  enterInput = async(inputArray) => {
    let startPos = 50;
    let currentPos = startPos;
    let zeroCountRule1 = 0;
    let zeroCountRule2 = 0;
    if(AnimationStatus){
        resetDial();
        rotateDial(currentPos);
        showOnDisplay(currentPos);
    }
    for(let input of inputArray){
        let direction = input.slice(0, 1);
        let amount = input.slice(1);
        if(direction == "R"){
            for(let i = 0; i < amount; i++){
                currentPos++;
                if(currentPos > 99){
                    currentPos = 0;
                }
                if(currentPos == 0){
                    zeroCountRule2++;
                    if(AnimationStatus){
                        lightCorrectLed();
                        await sleep(animationDelay);
                        shutOffLeds();
                    }
                }
                if(AnimationStatus){
                    rotateDial(1);
                    showOnDisplay(currentPos)
                    await sleep(animationDelay)
                }
            }
        }
        else{
            for(let i = amount; i > 0; i--){
                currentPos--;
                if(currentPos < 0)
                    currentPos = 99;

                if(currentPos == 0){
                    zeroCountRule2++;
                    if(AnimationStatus){
                        lightCorrectLed();
                        await sleep(animationDelay);
                        shutOffLeds();
                    }
                }
                if(AnimationStatus){
                    rotateDial(-1);
                    showOnDisplay(currentPos)
                    await sleep(animationDelay)
                }
            }
        }
        if(currentPos == 0){
            zeroCountRule1++;
            if(AnimationStatus){
                lightCorrectLed();
                await sleep(pause);
                shutOffLeds();
            }
        }
        if(AnimationStatus){
            await sleep(pause);
        }
    }
    let testResult1 = document.querySelector("#testResult1");
    testResult1.innerText = "Question 1 Zero Count: " + zeroCountRule1;
    let testResult2 = document.querySelector("#testResult2");
    testResult2.innerText = "Question 2 Zero Count: " + zeroCountRule2;
}
const moveDial = (direction) => {

    let dial = document.querySelector("#dial");
    let line = document.createElement("div");
    if(direction == "up"){
        line.className = "dialLine upLine"
    }
    else if(direction == "down"){
        line.className = "dialLine downLine"
    }
    else{
        line.className = "dialLine"
    }
    dial.replaceChildren();
    dial.appendChild(line);
}
const showOnDisplay = (number) => {
    if(number.toString().length < 2){
        setFirstDigit(0)
        setSecondDigit(number)
    }
    else{
        setFirstDigit(number.toString().split('').map(Number)[0])
        setSecondDigit(number.toString().split('').map(Number)[1])
    }


}
const setFirstDigit = (number) => {
    var firstDigit = document.querySelector("#firstDigit");
    firstDigit.className = getNumberClass(number);
}
const setSecondDigit = (number) => {
    var setSecondDigit = document.querySelector("#secondDigit");
    setSecondDigit.className = getNumberClass(number);
}
const lightCorrectLed = () => {
    let correctLed = document.querySelector("#correct");
    correctLed.className = "led correctOn";
}
const lightErrorLed = () => {
    let errorLed = document.querySelector("#error");
    errorLed.className = "led errorOn";
}
const shutOffLeds = () => {
    let correctLed = document.querySelector("#correct");
    correctLed.className = "led";
    let errorLed = document.querySelector("#error");
    errorLed.className = "led";
}
const toggleAnimation = (checkBox) => {
    AnimationStatus = checkBox.checked;
}
const toggleInput = (checkBox) => {
    UseOfficialInput = checkBox.checked;
}
const createNotches = () =>{
    let notchLines = document.querySelector("#notchLines");
    for(let i = 0; i < 100; i++){
        let notchline = document.querySelector(".notchLine2").cloneNode();
        if(i %5 == 0){
            notchline.className = "notchLine";
        }
        notchline.style.transform = `rotate(${(i * (360/100))}deg)`;
        notchLines.appendChild(notchline);
    }
}
const rotateDial = (degree) => {
    let dialLine = document.querySelector(".dialLine");
    let style = window.getComputedStyle(dialLine);
    var currentTransform = style.getPropertyValue("-webkit-transform") ||
         style.getPropertyValue("-moz-transform") ||
         style.getPropertyValue("-ms-transform") ||
         style.getPropertyValue("-o-transform") ||
         style.getPropertyValue("transform");
    let currentRotation = parseFloat(currentTransform.match(/rotate\(\s*([+-]?\d+(?:\.\d+)?)\s*deg\s*\)/i)?.[1]) || 0;
    degree = currentRotation + degree * (360/100);
    dialLine.style.transform = `rotate(${degree}deg)`;
}
const resetDial = () => {
    let dialLine = document.querySelector(".dialLine");
    dialLine.style.transform = `rotate(-90deg)`;
}
var init = async () => {
    moveDial("center");
    createNotches();
    let codeBlock = document.querySelector(".codeView");
    codeBlock.innerHTML = await getQuestion();
}
const runDay1 = async() => {
    if(UseOfficialInput){
        var inputArray = await getInput()
    }
    else{
        var inputArray = await getTestInput()
    }
    await enterInput(inputArray);
}
init();