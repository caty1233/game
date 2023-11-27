const canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

var canvas_width = canvas.width;
var canvas_height = canvas.height;

ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let animationId = undefined;

let positionx = false;

let positiony = false ; 

class Make{
    constructor(x,y,velocity,radius){
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.radius = radius
    }
}

let particles = [{
    x: 10,
    y: 100,
    velocity: 5,
    radius: 10
}];

function movement(particle) {
    if (positionx) {
        particle.x = particle.x - particle.velocity;
    } else {
        particle.x = particle.x + particle.velocity;
    }
    
    if (positiony){
    particle.y = particle.y - Math.abs(Math.sin(particle.x));
    } else {
        particle.y = particle.y + Math.abs(Math.sin(particle.x))
    }
}

function addParticle() {
    let new_particle = new Make(Math.floor(Math.random() * canvas_width), Math.floor(Math.random() * canvas_height), Math.floor(Math.random() * 5), Math.floor(Math.random() * 10));
    particles.push(new_particle);
}

function animate(particles) {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas_width, canvas_height);

    for (var particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        if (particle.x + particle.radius > canvas_width) {
            positionx = true;
        } else if (particle.x - particle.radius < 0) {
            positionx = false;
        }
        
        if (particle.y+particle.radius > canvas_height){
            positiony = true
        }
        else if (particle.y - particle.radius < 0){
            positiony = false
        }

        movement(particle);
    }
    
    animationId = requestAnimationFrame(() => animate(particles));
}


document.getElementById("start").addEventListener("click", startAnimation);
document.getElementById("stop").addEventListener("click", stopAnimation);

function startAnimation() {
    if (!animationId) {
        animate(particles);
    }
}

function stopAnimation() {
    cancelAnimationFrame(animationId);
    animationId = undefined;
}
