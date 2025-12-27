

const runDay3 = async() => {
    if(UseOfficialInput){
        var inputArray = await getInput()
    }
    else{
        var inputArray = await getTestInput()
    }
     inputArray = ["234234234234278"]
    let sanitizedInput = sanitizeInput(inputArray);
    // let question1Values = getMax2Values(sanitizedInput);
    let question2Values = getMax12Values(sanitizedInput);
    // console.log(question1Values.reduce((a,b) => { return a+b}))
    console.log(question2Values)
}
const getMax12Values = (input) => {
    let returnValues = []
    let values = [];
    let amount = 12;
    for(let line of input){
        let currentValue = ""
        let lineObject = [...line].map(Number)
        console.log(lineObject)
        for(let i = 0; i < amount;i++){
            var maxObject = Math.max(...lineObject);
            var maxObjectIndex = lineObject.indexOf(maxObject);
            values.push({index: maxObjectIndex, value: maxObject })
            lineObject = removeItem(lineObject, maxObject)
            console.log(...lineObject)
            console.log(...values)
        }
        
        values = sortObjects(values)
        console.log(...values)
        let currentValues =values.map(a => a.value)
        currentValue = currentValues.join("")
        returnValues.push(parseInt(currentValue))
        values = []
        // console.log(currentValue)
    }
    return returnValues;
}
function removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr[index] = 0;
  }
  return arr;
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
    codeBlock.innerHTML = await getQuestion();
}
init()