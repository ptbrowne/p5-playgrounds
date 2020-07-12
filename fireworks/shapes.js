const shapes = Array.from(document.querySelectorAll('path'))

const getShape = letter => {
  const shape = document.querySelector(`#${letter.toUpperCase()}`)
  if (!shape) {
     throw new Error(`${letter} is not available`)
  }
  return shape
}

const SHAPE_SIZE = 300

const getPointsOnShape = (shape, n) => {
  const tl = shape.getTotalLength()
  const points = []
  for (let i = 0; i < n; i++) {
    const { x, y } = shape.getPointAtLength(i / n * tl)
    points.push(createVector( (x - SHAPE_SIZE / 2) / SHAPE_SIZE, (y - SHAPE_SIZE / 2) / SHAPE_SIZE))
  }
  return points
}
