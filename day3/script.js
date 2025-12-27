

const runDay3 = async() => {
    if(UseOfficialInput){
        var inputArray = await getInput()
    }
    else{
        var inputArray = await getTestInput()
    }
    let sanitizedInput = sanitizeInput(inputArray);
    let question1Values = getMax2Values(sanitizedInput);
    console.log(question1Values.reduce((a,b) => { return a+b}))

}
const remove2MinValues = (input) => {
    let values = [];
}
const getMax2Values = (input) =>{
    let values = []
    for(let line of input){
        let maxValue = 0;
        let maxPos = 0;
        maxValue = Math.max(...line);
        maxPos = line.indexOf(maxValue);
        let remainingLine = line;
        let secondValue = "";
        if(maxPos < line.length -1){
            remainingLine = line.slice(maxPos+1)
            secondValue = Math.max(...remainingLine)
        }
        else{
            let digits = line.slice(0,maxPos).split("")
            maxValue = Math.max(...digits)
            maxPos = line.indexOf(maxValue);
            remainingLine = line.slice(maxPos)
            secondValue = Math.max(...remainingLine)

        }
        let combinedValue = maxValue + "" + secondValue
        values.push(parseInt(combinedValue))
    }
    return values;
}
const sanitizeInput = (inputArray) => {
    let sanitizedInput = [];
    for(let line of inputArray ){
        line = line.replace("\r", "");
        sanitizedInput.push(line)
    }
    return sanitizedInput;
}
var init = async () => {
    let codeBlock = document.querySelector(".codeView");
    console.log(codeBlock)
    codeBlock.innerHTML = await getQuestion();
}
init()