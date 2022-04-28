let wave = [];
let env = [];
let slider;
let prevsy;
let t = 0;
let sy;

function setup() {
    createCanvas(1800, 400);
    amplitude = document.getElementById("amplitude");
    f = document.getElementById("frequency");
    b = document.getElementById("dampingconstant");
    m = document.getElementById("mass");
    k = document.getElementById("springconstant");
}

function draw() {
    let x = y = 0;
    background(0);
    strokeWeight(1.5);

    let r = amplitude.value * 200 * (4 / (3 * PI)); // radius/amplitude


    // Draw spring system
    line(1580, 50, 1720, 50); // ceiling 

    prevsy = sy;
    let coef = r * Math.pow(Math.E, -b.value * t / (2 * m.value))
    sy = coef * cos(sqrt(k.value / m.value) * PI * t)
    let sign;

    w = 60; // width of block
    fill(0);

    prevxpos = 30;
    prevypos = 0;
    lines = 18;

    // Draw the individual springs
    for (let i = 0; i < lines - 1; i++) {
        xpos = w / 4 * (i % 2 != 0 ? 1 : -1) // width times sign
        ypos = i * (200 + sy) / lines;
        line(1650 + prevxpos, 50 + prevypos, 1650 + xpos, 50 + ypos);
        prevypos = ypos
        prevxpos = xpos;
    }

    square(1620, sy / 2 + 200, w); // draw the block


    // begin drawing circle system
    translate(1100, 200);

    x = sy;
    (sy > prevsy) ? sign = -1 : sign = 1; // set the  sign of where the circle is
    y = (sign) * -sqrt((r - sy) * (r + sy)); // use geometric mean to find distance from diameter to point on circle

    stroke(255, 255, 255);
    noFill();

    ellipse(0, 0, r * 2); // draw the circle
    point(0, 0); // set the center

    strokeWeight(0.5)
    line(-r, 0, r, 0); // add the diameter line

    strokeWeight(1.5)
    ellipse(sy, 0, r / 5, r / 5); // mini circle on diameter
    ellipse(x, y, r / 5, r / 5); // mini circle around point
    line(x, y, sy, 0); // line connecting circle and diameter
    // line(x, y, -200, -wave[0]); // create a triangle

    wave.unshift(sy);
    env.unshift(coef);


    // begin drawing pendulum system
    line(220, -150, 360, -150); // ceiling 
    line(290, -150, x / 2 + 290, abs(y) / 3 + 85); // string
    fill(255);
    ellipse(x / 2 + 290, abs(y) / 3 + 85, r * m.value / 4); // pendulum ball


    // begin drawing wave system
    translate(-200, 0);
    strokeWeight(0.7);
    line(sy + 200, 0, 0, -wave[0]); // line connecting circle and graph

    // draw the wave pattern
    strokeWeight(1.5);
    for (let i = 0; i < wave.length; i++) {
        point(-i * f.value, -wave[i]);
    }

    // draw envelope functions
    strokeWeight(0.5);
    for (let i = 0; i < env.length; i += 15) {
        line(-i * f.value - 2, -env[i] - 2, -i * f.value + 2, -env[i] - 2);
        line(-i * f.value - 2, env[i] - 2, -i * f.value + 2, env[i] - 2);
    }
    t += 0.03 * f.value;

    if (wave.length > 20000) { // delete wave points for old values
        wave.pop();
    }
    if (env.length > 2000) { // delete envelope points for old values
        env.pop();
    }
}
