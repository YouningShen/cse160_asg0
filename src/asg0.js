// DrawRectangle.js
function main() {
	// Retrieve <canvas> element
	var canvas = document.getElementById('example');
	if (!canvas) {
		console.log('Failed to retrieve the <canvas> element')
		return;
	}

	// Get the rendering context for 2DCG
	var ctx = canvas.getContext('2d');

	/*
	// Draw a blue rectangle
	ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set a blue color
	ctx.fillRect(120, 10, 150, 150); // Fill a rectangle with the color
	*/

	// Draw a black rectangle
	ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
	ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

	// Create a red vector v1
	let v1 = new Vector3([0, 0, 0]);
	drawVector(ctx, v1, "red");

	// Create a red vector v1
	let v2 = new Vector3([0, 0, 0]);
	drawVector(ctx, v2, "blue");
}

// Draw vector function
function drawVector(ctx, v, color) {
	const scale = 20;
	const centerX = 200; // canvas.width / 2
	const centerY = 200; // canvas.height / 2

	let x = v.elements[0] * scale;
	let y = v.elements[1] * scale;

	//console.log(`Drawing vector: (${x}, ${y})`);

	ctx.beginPath();
	ctx.moveTo(centerX, centerY); // start from canvas center
	ctx.lineTo(centerX + x, centerY - y); // invert y to match canvas coordinates
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	ctx.stroke();
}

function handleDrawEvent() {
	var canvas = document.getElementById('example');
	var ctx = canvas.getContext('2d');
  
	// Clear and repaint black canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
  
	// v1 values
	let x1 = parseFloat(document.getElementById("x1Input").value);
	let y1 = parseFloat(document.getElementById("y1Input").value);
	//console.log('v1 input:', x1, y1);
	if (isNaN(x1)) x1 = 0;
	if (isNaN(y1)) y1 = 0;
	let v1 = new Vector3([x1, y1, 0]);
  
	// v2 values
	let x2 = parseFloat(document.getElementById("x2Input").value);
	let y2 = parseFloat(document.getElementById("y2Input").value);
	//console.log('v2 input:', x2, y2);
	if (isNaN(x2)) x2 = 0;
	if (isNaN(y2)) y2 = 0;
	let v2 = new Vector3([x2, y2, 0]);
  
	// Draw both vectors
	drawVector(ctx, v1, "red");
	drawVector(ctx, v2, "blue");
  }

function handleDrawOperationEvent(){
	var canvas = document.getElementById('example');
	var ctx = canvas.getContext('2d');

	// Clear and repaint black canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

	// v1 values
	let x1 = parseFloat(document.getElementById("x1Input").value);
	let y1 = parseFloat(document.getElementById("y1Input").value);
	if (isNaN(x1)) x1 = 0;
	if (isNaN(y1)) y1 = 0;
	let v1 = new Vector3([x1, y1, 0]);
  
	// v2 values
	let x2 = parseFloat(document.getElementById("x2Input").value);
	let y2 = parseFloat(document.getElementById("y2Input").value);
	if (isNaN(x2)) x2 = 0;
	if (isNaN(y2)) y2 = 0;
	let v2 = new Vector3([x2, y2, 0]);

	// Scalar value
    let scalar = parseFloat(document.getElementById("scalarInput").value);
	//console.log('Scalar input:', scalar);
    if (isNaN(scalar)) scalar = 1; // Default to 1 if not provided
  
    // Get the selected operation
    let operation = document.getElementById("operationSelect").value;
	//console.log('Selected operation:', operation);

    // Perform the selected operation
    let v3, v4;
    if (operation === "add") {
		v3 = new Vector3([0, 0, 0]);
        v3.set(v1).add(v2);
		drawVector(ctx, v1, "red");
		drawVector(ctx, v2, "blue");
        drawVector(ctx, v3, "green");
    }
	else if (operation === "sub") {
        v3 = new Vector3([0, 0, 0]);
        v3.set(v1).sub(v2);
		drawVector(ctx, v1, "red");
		drawVector(ctx, v2, "blue");
        drawVector(ctx, v3, "green");
    }
	else if (operation === "mul") {
        v3 = new Vector3([0, 0, 0]);
        v3.set(v1).mul(scalar);
        v4 = new Vector3([0, 0, 0]);
        v4.set(v2).mul(scalar);
		drawVector(ctx, v1, "red");
		drawVector(ctx, v2, "blue");
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    }
	else if (operation === "div") {
        v3 = new Vector3([0, 0, 0]);
        v3.set(v1).div(scalar);
        v4 = new Vector3([0, 0, 0]);
        v4.set(v2).div(scalar);
		drawVector(ctx, v1, "red");
		drawVector(ctx, v2, "blue");
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    }
	else if (operation === "angle") {
		drawVector(ctx, v1, "red");
		drawVector(ctx, v2, "blue");
		angleBetween(v1, v2);
	}	
	else if (operation === "area") {
		drawVector(ctx, v1, "red");
		drawVector(ctx, v2, "blue");
		areaTriangle(v1, v2);
	}	
	else if (operation === "magnitude") {
		console.log("Magnitude of v1:", v1.magnitude());
		console.log("Magnitude of v2:", v2.magnitude());
		drawVector(ctx, v1, "red");
		drawVector(ctx, v2, "blue");
	}
	else if (operation === "normalize") {
		let normV1 = new Vector3([0, 0, 0]).set(v1).normalize();
		let normV2 = new Vector3([0, 0, 0]).set(v2).normalize();
	
		//console.log("Normalized v1 magnitude:", normV1.magnitude());
		//console.log("Normalized v2 magnitude:", normV2.magnitude());
	
		drawVector(ctx, v1, "red");
		drawVector(ctx, v2, "blue");
		drawVector(ctx, normV1, "green");
		drawVector(ctx, normV2, "green");
	}	
}

function angleBetween(v1, v2) {
    const dotProduct = Vector3.dot(v1, v2);
    const mag1 = v1.magnitude();
    const mag2 = v2.magnitude();

    if (mag1 === 0 || mag2 === 0) {
        console.log("Angle undefined: one of the vectors has zero magnitude.");
        return;
    }

    let cosTheta = dotProduct / (mag1 * mag2);

    // Clamp to prevent NaN due to floating point rounding errors
    cosTheta = Math.max(-1, Math.min(1, cosTheta));

    const angleRad = Math.acos(cosTheta);
    const angleDeg = angleRad * (180 / Math.PI);

    console.log("Angle between v1 and v2:", angleDeg.toFixed(2), "degrees");
}

function areaTriangle(v1, v2) {
    const cross = Vector3.cross(v1, v2);
    const area = 0.5 * cross.magnitude();
    console.log("Area of triangle formed by v1 and v2:", area.toFixed(2));
}

