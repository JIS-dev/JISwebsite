
var angle;
var axiom = "F"; // start with string F
var sentence = axiom;
var len = 200;

var rules = [];
rules[0] = {
  a: "F",
  // b: "FF+[+F-F-F]-[-F+F+F]"
  //b: "F[+F]F[-F]F"
  b: "F[+F]F[-F][F]"
  //b: "FF-[-F+F+F]+[+F-F-F]"
}

function setup() {
  createCanvas(400, 400);
  //angle = radians(25);
  angle = radians(20);
  background(0, 0, 200, 20); // background color rgb + opacity value
  // background(51); // background colour, 51 = grayscale value
  //createP(axiom); // Skriv ut axiom (creates a <p></p> element in DOM with given inner HTML)
  createP("");
  turtle();
  //var button = createButton("generate");
  //button.mousePressed(generate);
  for (var k = 0; k < 5; k++) {
  generate();
  }
}

function generate() {
  len *= 0.5; // length of line halfed for every generation
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  //createP(sentence); // skriv ut regel
  turtle();

}

function turtle() {
  //background(51);
  resetMatrix(); // replace current matrix with identity matrix
  translate(width / 2, height); // Move zero position to the bottom middle 
  //stroke(255, 100); 
  stroke(80);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == "F") {
      line(0, 0, 0, -len); // draw a vertical line of length len from current position
      translate(0, -len);  // move current position to end of line
    } else if (current == "+") {  // + = rotate to the left
      rotate(-angle);
    } else if (current == "-") {  // - = rotate to the right
      rotate(angle)
    } else if (current == "[") {  // [ = push states to stack
      push();
    } else if (current == "]") {  // ] = pull states from stack
      pop();
    }
  }
}


