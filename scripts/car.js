let ran = 0;
let mpg1 = 0;
let mpg2 = 0;
let answer = 'undefined';
let car1 = getRandomCar()
let car2 = getRandomCar()
let car1img = JSON.parse(sendImgRequest(car1))
let car2img = JSON.parse(sendImgRequest(car2))



console.log(mpg1)
console.log(mpg2)
console.log(answer)

if(car1img['total'] !== 0) {
    document.getElementById("car1img").src = car1img['hits'][0]['largeImageURL'];
}
if(car2img['total'] !== 0) {
    document.getElementById("car2img").src = car2img['hits'][0]['largeImageURL'];
}


document.getElementById("car1").textContent = car1
document.getElementById("car2").textContent = car2


function getRandomCar() {
    let jsonParsed = JSON.parse(sendRequest())
    let randomNumber = randomIntFromInterval(0, 49)
    let jsonForCar = jsonParsed[randomNumber]
    if(ran === 0) {
        mpg1 = jsonForCar['highway_mpg']
        ran++
    }else {
        mpg2 = jsonForCar['highway_mpg']
        if(mpg1 > mpg2) {
            answer = "Car_1"
        }else {
            answer = "Car_2"
        }
    }
    return jsonForCar['make'] + " " + jsonForCar['model'] + " (" + jsonForCar['class'] + ")";
}

function sendRequest() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.api-ninjas.com/v1/cars?year=" + randomIntFromInterval(2000, 2023) + "&limit=50", false)
    xmlHttp.setRequestHeader("X-Api-Key", "NoxbYPcjMYT44vbigJY8ow==3RMmOQFcIK6Onr4q")
    xmlHttp.send(null)
    return xmlHttp.responseText;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function sendImgRequest(car) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://pixabay.com/api/?key=31652097-84635f53f416f23c3df1adb92&q=" + car + "&tbm=isch&ijn=0", false)
    xmlHttp.send(null)
    return xmlHttp.responseText;
}

function vote1() {
    let result = document.getElementById("result");
    if(answer === "Car_1") {
        result.textContent = "Correct! It has " + mpg1 + " MPG while the other has " + mpg2;
        result.style.visibility = "visible";
    }else {
        result.textContent = "Wrong! It has " + mpg1 + " MPG while the other has " + mpg2;
        result.style.visibility = "visible";
    }
}

function vote2() {
    let result = document.getElementById("result");
    if(answer === "Car_2") {
        result.textContent = "Correct! It has " + mpg2 + " MPG while the other has " + mpg1;
        result.style.visibility = "visible";
    }else {
        result.textContent = "Wrong! It has " + mpg2 + " MPG while the other has " + mpg1;
        result.style.visibility = "visible";
    }
}
