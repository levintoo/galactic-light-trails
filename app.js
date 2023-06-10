// utilis file functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// main .js

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})
let mouseDown = false
addEventListener('mousedown', (event) => {
    mouseDown = true
})
addEventListener('mouseup', (event) => {
    mouseDown = false
})

// Objects
class Particle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.shadowColor = this.color
        c.shadowBlur = 15
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}

// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 1500; i++) {
        const canvasWidth = canvas.width + 300
        const canvasHeight = canvas.height + 300
        const myCanvasDimensions = Math.pow(((canvas.width * canvas.width) + (canvas.height * canvas.height)), 0.5)
        const color = colors[Math.floor(Math.random() * colors.length)]
        const x = Math.random() * canvasWidth - canvasWidth / 2
        const y = Math.random() * canvasHeight - canvasHeight / 2
        const myx = Math.random() * myCanvasDimensions - canvasWidth / 2
        const myy = Math.random() * myCanvasDimensions - canvasWidth / 2
        console.log(`default x = ${x}, my x = ${myx}`)
        console.log(`default y = ${y}, my y = ${myy}`)
        const radius = Math.random() * 3
        particles.push(new Particle(myx,myy,radius,color))
    }
}

// Animation Loop
let radians = 0
let alpha = 1
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = `rgba(10, 10, 10, ${alpha})`
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.translate(canvas.width /2 , canvas.height /2)
    c.rotate(radians)

    particles.forEach(particle => {
        particle.update()
    })

    c.restore()
    radians += 0.001

    if(mouseDown && alpha >= 0.1){
        alpha -= 0.01
    } else if(!mouseDown && alpha < 1)
    {
        alpha += 0.01
    }
}

init()
animate()

console.log(particles);