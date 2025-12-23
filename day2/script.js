

const runDay2 = async() => {
    if(UseOfficialInput){
        var inputArray = await getInput()
    }
    else{
        var inputArray = await getTestInput()
    }
    var question1InvalidIds = [];
    var question2InvalidIds = []

    inputArray.forEach(element => {
        let startValue = parseInt(element.split("-")[0]);
        let endValue = parseInt(element.split("-")[1]);
        let values = []

        for(var i = startValue; i <= endValue; i++){
            let value = i;
            let valueString = i.toString();
            let valueLength = valueString.length;
            values = []
            if(valueLength > 1){
                if(valueLength % 2 == 0){
                    let splitPoint = valueLength/2;
                    let value1 = valueString.slice(0, splitPoint);
                    let value2 = valueString.slice(splitPoint, valueLength)
                    if(value1 == value2){
                        question1InvalidIds.push(value)
                    }
                }
                var storedChar = "";
                for(let l = 0; l < Math.floor(valueLength/2); l++){
                    values.push([])
                }
                for(var v = 1; v <= values.length; v++){
                    storedChar = ""
                    for(let l = 1; l <= valueLength; l++){
                        let currentChar = valueString.charAt(l-1);
                        storedChar = storedChar + currentChar
                        if(l % v == 0){
                            values[v-1].push(storedChar)
                            storedChar = ""
                        }
                    }
                }
                for(const val of values){
                    if(arrayIsAllEqual(val)){
                        if(val.join("").length == valueLength)
                            question2InvalidIds.push(parseInt(val.join("")))
                        break;
                    }
                }
            }
        }
    });
    const sumQuestion1 = question1InvalidIds.reduce((a, b) => a+b, 0)
    console.log("Question 1 sum: " + sumQuestion1);
    const sumQuestion2 = question2InvalidIds.reduce((a,b) => a+b, 0)
    console.log("Question2 sum: " + sumQuestion2);
}
var init = async () => {
    let codeBlock = document.querySelector(".codeView");
    codeBlock.innerHTML = await getQuestion();
}
init()