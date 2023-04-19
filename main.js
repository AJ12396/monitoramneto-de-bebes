var img = ""
var status = ""
var objects = []

function preload() {
    img = loadImage("dog_cat.jpg")
    song = loadSong("alert.mp3")
}

function setup() {
    canvas = createCanvas(470,380)
    canvas.center()
    objectToDetector = ml5.objectDetector("cocossd", modelLoaded)
    camera = createCapture(VIDEO)
    camera.hide()
    camera.size(470,380)
}

function draw() {
    image(camera, 0, 0, 470, 380)
    objectToDetector.detect(camera, gotResults)
    if (status != "") {
        var r = Math.random(255)
        var b = Math.random(255)
        var g = Math.random(255)
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: detectando objetos"
            fill(r,g,b)
            percent = Math.floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if (objects[i].label == "person") {
                document.getElementById("numberOfObjects").innerHTML = "Bebe encontrado!" 
                song.stop()
            } else {
                document.getElementById("numberOfObjects").innerHTML = "Bebe não encontrado!" 
                song.play()
            }
            if (objects[i].length == 0) {
                document.getElementById("numberOfObjects").innerHTML = "Bebe não encontrado!" 
                song.play()
            }
        }
    }
}

function modelLoaded() {
    console.log("O modelo foi carregado corretamente!")
    status = true
    objectToDetector.detect(camera, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }
    
}