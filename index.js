const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 220
let width = 34
let direction = 1
let asteroidsId
let goingRight = true
let asteroidsRemoved = []
let results = 0

for (let i = 0; i < 250; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const asteroids = [
  0,1,2,3,4,5,6,7,8,9,10,
  20,21,22,23,24,25,26,27,28,29,
  45,46,47,48,49,
  59,60,61,62,63,
]

function draw() {
  for (let i = 0; i < asteroids.length; i++) {
    if(!asteroidsRemoved.includes(i)) {
      squares[asteroids[i]].classList.add('asteroids')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < asteroids.length; i++) {
    squares[asteroids[i]].classList.remove('asteroids')
  }
}

squares[currentShooterIndex].classList.add('shooter')


function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function moveAsteroids() {
  const leftEdge = asteroids[0] % width === 0
  const rightEdge = asteroids[asteroids.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i] += direction
  }

  draw()

  if (squares[currentShooterIndex].classList.contains('asteroids', 'shooter')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(asteroidsId)
  }

  for (let i = 0; i < asteroids.length; i++) {
    if(asteroids[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(asteroidsId)
    }
  }
  if (asteroidsRemoved.length === asteroids.length) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(asteroidsId)
  }
}
asteroidsId = setInterval(moveAsteroids, 900)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('asteroids')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('asteroids')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const asteroidRemoved = asteroids.indexOf(currentLaserIndex)
      asteroidsRemoved.push(asteroidRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(asteroidsRemoved)

    }

  }
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)