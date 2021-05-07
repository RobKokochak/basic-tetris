document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  // querySelector is a javascript method that
  // looks through the html file (document) and searches
  // for the class name grid. (. indicates we're looking for a class name)
  // Now when we do things with 'grid' here,
  // it affects the grid class in the html file.

  let squares = Array.from(document.querySelectorAll('.grid div'))
  // this querySelectorAll is telling javascript
  // to find all the divs in the class 'grid' in the html file
  // Array.from is a method that sorts a selection into an array
  // we're using this to essentially create an array of our divs, this
  // way each of our divs has a specific index number.

  const ScoreDisplay = document.querySelector('#score')
  // # indicates we're looking for an id in the html file
  // here we're using querySelector to search for an id

  const StartBtn = document.querySelector('#start-button')

  const width = 10

  //The Tetrominos
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width*2, width*2+1, width*2 + 2]
  ]
  const zTetromino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
  ]
  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1],
  ]
  const sqTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
  ]
  const logTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, sqTetromino, logTetromino]

  let currentPosition = 4 // This is our starting position for drawing
  let currentRotation = 0

  // randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  // Math.random returns a random float from 0 to <1
  let currentTet = theTetrominoes[random][currentRotation]
  // Here we've let a random value from 0-4 choose our tetromino to be drawn, always in its first rotation

// draw the Tetromino
  function draw() { // forEach executes a provided function once per array element
    currentTet.forEach(index => { //calling the forEach on our current array defined above
      // index = 1, the first element of the first element of theTetrominoes array
      squares[currentPosition + index].classList.add('tetromino')
      // Using forEach to color the squares array (the divs in the other file)
      // based on instructions from the 'current' array
      // classList.add accesses the .css stylesheet and 'adds' the style
      // we defined as 'tetromino' to the squares being drawn
    })
  }
   draw()
  // undraw the Tetromino
  function undraw() {
    currentTet.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  //make the tetromino move down every second
  timerId = setInterval(moveDown, 750)

  //assigns functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft()
    }
    else if (e.keyCode === 38) {
      rotate()
    }
    else if (e.keyCode === 39) {
      moveRight()
    }
    else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

  //move down function
  function moveDown() {
    undraw()
    currentPosition += width // this is what moves it down one space
    draw()
    freezeCurrentDrawNew()
  }

  //freeze function
  function freezeCurrentDrawNew() {
    if(currentTet.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      //.some tests whether some element in the array passes the test given by the function
      // we use + width to test the next space down from the current position
      currentTet.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // so if some divs (indicated by currentPosition + index) in the squares div array (from html file)
      // have taken, we change them all to having taken
      random = Math.floor(Math.random()*theTetrominoes.length)
      currentTet = theTetrominoes[random][currentRotation] // and here starting up a new div from the top
      currentPosition = 4
      draw()
    }
  }

  function moveLeft() {
    undraw()
    const isAtLeftEdge = currentTet.some(index => (currentPosition + index) % width === 0) //checks if currentTet is at the left edge

    if(!isAtLeftEdge) currentPosition -=1 // if it's not at the left edge, move it 1 left

    if(currentTet.some(index => squares[currentPosition + index].classList.contains('taken')))
    currentPosition +=1 // if there's already a Tetromino there, revert the move left decision

    draw()
  }
  function moveRight() {
    undraw()
    const isAtRightEdge = currentTet.some(index => (currentPosition + index) % width === width - 1) //checks if currentTet is at the right edge

    if(!isAtRightEdge) currentPosition +=1 // if it's not at the right edge, move it 1 right

    if(currentTet.some(index => squares[currentPosition + index].classList.contains('taken')))
    currentPosition -=1 // if there's already a Tetromino there, revert the move right decision

    draw()
  }

  //rotate the Tetromino
  function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === currentTet.length) { // if the current rotation gets to 4, go back to rotation 0
      currentRotation = 0
    }
    currentTet = theTetrominoes[random][currentRotation]
    draw()
  }
})
