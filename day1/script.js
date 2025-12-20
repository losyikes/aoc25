

// const runDay1 = async() => {
    
//     await enterInput(inputArray);
// }
const  enterInput = async(inputArray) => {
    console.log(inputArray)
    let startPos = 50;
    let currentPos = startPos;
    let zeroCountRule1 = 0;
    let zeroCountRule2 = 0;
    for(let input of inputArray){
        let direction = input.slice(0, 1);
        let amount = input.slice(1);
        if(direction == "R"){
            moveDial("up");
            for(let i = 0; i < amount; i++){
                currentPos++;
                if(currentPos > 99){
                    currentPos = 0;
                }
                if(currentPos == 0){
                    zeroCountRule2++;
                    lightCorrectLed();
                    await sleep(200);
                    shutOffLeds();
                }
                showOnDisplay(currentPos)
                await sleep(50)
            }
            
        }
        else{
            moveDial("down");
            for(let i = amount; i > 0; i--){
                currentPos--;
                if(currentPos < 0){
                    currentPos = 99;
                }
                if(currentPos == 0){
                    zeroCountRule2++;
                    lightCorrectLed();
                    await sleep(200);
                    shutOffLeds();
                }
                showOnDisplay(currentPos)
                await sleep(50)

            }
        }
        if(currentPos == 0){
            zeroCountRule1++;
            lightCorrectLed();
            await sleep(200);
            shutOffLeds();
        }
        moveDial("center");
        await sleep(200)
    }
    let testResult1 = document.querySelector("#testResult1");
    testResult1.innerText = "Rule 1 Zero Count: " + zeroCountRule1;
    let testResult2 = document.querySelector("#testResult2");
    testResult2.innerText = "Rule 2 Zero Count: " + zeroCountRule2;
}
const moveDial = (direction) => {
        console.log("setting dial to " + direction);

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
    console.log("set dial to " + direction);
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
var init = async () => {
    moveDial("center");
    let codeBlock = document.querySelector(".codeView");
    codeBlock.innerHTML = await getScript();
}
const runDay1 = async() => {
    const inputArray = await getTestInput()
    await enterInput(inputArray);
}
init();