const getInput = async function(){
    let input = await fetch("./input")
    let inputText = await input.text()
    var inputvars = inputText.replace("\r\n", ",");
    inputvars = inputvars.replace(/\n/g, ",");
    let inputArray = inputvars.split(",")
    return inputArray
}

const getTestInput = async function(){
    let input = await fetch("./testInput")
    let inputText = await input.text()
    var inputvars = inputText.replace("\r\n", ",");
    inputvars = inputvars.replace(/\n/g, ",");
    let inputArray = inputvars.split(",")
    return inputArray
}

const getScript = async function(){
    let script = await fetch("script.js");
    let scriptText = await script.text()
    return scriptText;
}
const getHtml = async function(){
    let html = await fetch("index.html");
    let htmlText = await html.text()
    return htmlText;
}
const getCss = async function(){
    let css = await fetch("./../style.css");
    let cssText = await css.text()
    return cssText;
}
const getHelpers = async function(){
    try {
        let helpers = await fetch("./../helpers.js");
        console.log(helpers);
        let helpersText = await helpers.text()
        return helpersText;
    } catch (error) {
        console.error("Error logging fetch attempt:", error);
        return "";
    }
   
}
const getinputView = async function(){
    let input = await fetch("input");
    let inputText = await input.text()
    return inputText;
}
const getTestInputView = async function(){
    let input = await fetch("testInput");
    let inputText = await input.text()
    console.log(inputText);
    return inputText;
}
const sleep = async function (msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
const getNumberClass = (number) => {
    switch(number){
        case 0:
            return "zero";
        case 1:
            return "one";
        case 2:
            return "two";
        case 3: 
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        case 6:
            return "six";
        case 7:
            return "seven";
        case 8:
            return "eight";
        case 9:
            return "nine";
        default:
            return "";
    }
}
const setCodeView = async(code) => {
    let codeBlock = document.querySelector(".codeView");
    console.log(code);
    if(code == "js"){
        codeBlock.innerHTML = await getScript();
    }
    else if(code == "html"){
        codeBlock.innerText = await getHtml();
    }
    else if(code == "css"){
        codeBlock.innerHTML = await getCss();
    }
    else if(code == "helpers.js"){
        codeBlock.innerHTML = await getHelpers();
        console.log(await getHelpers());
    }
    else if(code == "input"){
        codeBlock.innerHTML = await getinputView();
    }
    else if(code == "testinput"){
        codeBlock.innerHTML = await getTestInputView();
    }
}