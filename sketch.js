class Datapoint {
	constructor(x,y,type) {
		this.x = x
		this.y = y
		this.type = type //0 for negative, 1 for positive 
	}
}

class Distance {
	constructor(distance,type) {
		this.distance = distance
		this.type = type
	}
}

class KNN {
	constructor() {
		this.dataset = []
		this.k = 2
	}

	addPoint(x,y,type) {
		this.dataset.push(new Datapoint(x,y,type))
	}

	renderPoints() {
		// stroke(1)
		for (let datapoint of this.dataset) {
			if (datapoint.type == 0) {
				fill("#ff0000")
			} else {
				fill("#0000ff")
			}
			ellipse(datapoint.x, datapoint.y, 5, 5)
		}
	}

	renderDecisionBoundary() {
		let gridSize = 4
		noStroke()
		for (let x = 0; x < width/gridSize; x++) {
			for (let y = 0; y < height/gridSize; y++) {
				let type = this.predict(x*gridSize, y*gridSize)
				if (type == 0) {
					fill("#f2938d")
				} else {
					fill("#c4daf5")
				}
				rect(x*gridSize, y*gridSize, gridSize, gridSize)
			}
		}
	}

	predict(x,y) {
		let distances = []
		for (let datapoint of this.dataset) {
			let dist = Math.sqrt(Math.pow(x-datapoint.x, 2) + Math.pow(y-datapoint.y, 2))
			let distance = new Distance(dist, datapoint.type)
			// console.log(distance)
			distances.push(distance)
		}
		distances.sort(function(a, b) {return a.distance - b.distance})
		// console.log(distances)
		let positive, negative
		positive = negative = 0
		// ((distances.length < this.k) ? distances.length : this.k)
		for (let i = 0; i < ((distances.length < this.k) ? distances.length : this.k); i++) {
			if (distances[i].type == 1) {
				positive++
			} else {
				negative++
			}
		}		
		return (positive >= negative) ? 1 : 0
	}
}
let typeRadio, knn
function setup() {
	createCanvas(600, 600)
	typeRadio = createRadio()
	typeRadio.option(0)
	typeRadio.attribute("checked", "checked")
	typeRadio.option(1)
	typeRadio.position(5, 10)
	knn = new KNN()
}

function draw() {
	background(230)
	knn.renderDecisionBoundary()
	knn.renderPoints()
	
}

function mousePressed() {
	if ((mouseX < width && mouseX > 0) && (mouseY < height && mouseY > 20)) {
		knn.addPoint(mouseX, mouseY, typeRadio.value())
		console.log(typeRadio.value())
	}
}



/* 
	Brute force knn algorithm
	Number of classes = 2
	k will be taken as input


	Datapoint{x,y,class}
	Dataset=[Datapoints]
	Closeness is going to be the euclidean distance, sqrt((x1-x2)^2 + (y1-y2)^2)
	In drawing the decision boundary, we divide the whole screen into a grid and colour every cell
	depending on how close the cell is to the datapoint

	KNN {
		Dataset
		drawBoundary()
		addPoint()
	}
*/