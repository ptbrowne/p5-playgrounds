class Particle {
    constructor(x, y, size, hue) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
        this.size = size
        this.hue = hue
    }

    applyForce(force) {
        this.acc.add(force)
    }

    applyGravity() {
        this.acc.add(gravity.copy().mult(this.mass || 1))
    }

    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.acc.mult(0)
    }

    show() {
        colorMode(HSB)

        stroke(this.hue, 255, 255, this.lifespan || 1)
        fill(this.hue, 255, 255, this.lifespan || 1)
        ellipse(this.pos.x, this.pos.y, this.size)
        colorMode(RGB)
    }
}
