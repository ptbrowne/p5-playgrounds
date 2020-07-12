class Firework {
    constructor(x, y, letter) {
        this.firework = new Particle(x, y, 1, 50)
        this.exploded = false
        this.particles = []
        this.lifespan = 1
        this.explosionShape = getShape(letter)
    }

    explode() {
        this.exploded = true

        const nParticles = 20
        const points = getPointsOnShape(this.explosionShape, nParticles)

        for (let i = 0; i < nParticles; i++) {
            const hue = random(0, 255)
            const particle = new Particle(this.firework.pos.x, this.firework.pos.y, 2, hue)

            particle.lifespan = 1
            particle.mass = 0.15
            this.particles.push(particle)

            // explosion in random direction
            if (!this.explosionShape) {
                particle.applyForce(p5.Vector.random2D().mult(random(1, 1.5)))
            } else {
              const point = points[i]
              const initialForce = createVector(point.x, point.y).mult(1.5)
              particle.applyForce(initialForce)
            }
        }
        this.firework = null

        // sounds.explosion1.play();
    }

    applyGravity() {
      if (this.firework) {
        this.firework.applyGravity()
      }
    }

    applyForce(...args) {
        if (this.firework) {
            this.firework.applyForce(...args)
        }
    }

    update() {
        if (this.firework) {
            this.firework.update()
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i]
            particle.applyGravity()
            particle.update()
            particle.lifespan -= 2.5 / 255
           
            if (isOutside(particle) || particle.lifespan < 0) {
                this.particles.splice(i, 1)
            }
        }

        if (this.firework && this.firework.vel.y > 0 && !this.exploded) {
            this.explode()
        }

    }

    show() {
        if (this.firework) {
            this.firework.show()
        }

        for (let particle of this.particles) {
            particle.show()
        }
    }

    done() {
        if ((!this.firework || isOutside(this.firework)) && this.particles.length === 0) {
            return true
        }
    }
}
