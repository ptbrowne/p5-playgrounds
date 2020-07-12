const fireworks = []
const width = 1050
const height = 400
const sounds = {}
let gravity

const isOutside = particle => {
    return particle.pos.x > width || particle.pos.x < 0 || particle.pos.y > height || particle.pos.y < 0
}

function addFirework (x, letter) {
    x = x || random(0, width)
    const firework = new Firework(x, height, letter)
    fireworks.push(firework)
    // initial velocity shooting up
    firework.applyForce(createVector(0, random(-5.5, -6)))

}

function preload() {
  soundFormats('mp3', 'ogg');
  sounds.explosion1 = loadSound('./explosion1.mp3');
}

function addLetterFireworks() {
    const letters = input.value().toUpperCase().replace(/[^A-Z ]/g, '').split('')
    const nInitialFireworks = letters.length
    for (let i = 0; i < nInitialFireworks; i++) {
        const x = i * width / nInitialFireworks + (width / nInitialFireworks / 2)
        const index = Math.floor(map(x, 0, width, 0, letters.length))
        const letter = letters[index]
        if (letter == ' ') {
            continue
        }
        addFirework(x, letter)
    }
}

function setup() {
    gravity = createVector(0, 0.05)
    createCanvas(width, height);

    input = createInput();
    input.value('FIREWORKS ROCK');

    addLetterFireworks()
}

function draw() {
    background(50)

    for (const firework of fireworks) {
        firework.applyGravity()
        firework.update()
        firework.show()
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i]
        if (firework.done()) {
            fireworks.splice(i, 1)
        }
    }

    if (fireworks.length === 0) {
        addLetterFireworks()
    }
}
