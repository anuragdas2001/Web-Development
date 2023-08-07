let rod = document.querySelectorAll('.rod');
let ball = document.querySelector('#ball');
let boundary = document.getElementById('boundary');

let score = 0; // Initialize the score

boundary.addEventListener('mousemove', MoveRod);

function MoveRod(event) {
    const mouseX = event.clientX - boundary.getBoundingClientRect().left;

    for (let i = 0; i < rod.length; i++) {
        const rodWidth = rod[i].clientWidth;
        const maxPositionX = boundary.clientWidth - rodWidth;

        const newPositionX = Math.max(0, Math.min(mouseX - rodWidth / 2, maxPositionX));

        rod[i].style.left = `${newPositionX}px`;
    }
}

let ballSpeedX = 7;
let ballSpeedY = 7;

function MoveBall() {
    let ballX = parseFloat(ball.style.left) || 0;
    let ballY = parseFloat(ball.style.top) || 0;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <= 0 || ballX >= boundary.clientWidth - ball.clientWidth) {
        ballSpeedX = -ballSpeedX;
        score++; // Increment the score on boundary bounce
    }
    if (ballY <= 0 || ballY >= boundary.clientHeight - ball.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    let missed = true; // Flag to track if ball missed touching the rod

    for (let i = 0; i < rod.length; i++) {
        const rodLeft = parseFloat(rod[i].style.left);
        const rodTop = boundary.clientHeight - rod[i].clientHeight;
        const rodRight = rodLeft + rod[i].clientWidth;

        if (
            ballY + ball.clientHeight >= rodTop &&
            ballX + ball.clientWidth >= rodLeft &&
            ballX <= rodRight
        ) {
            ballSpeedY = -ballSpeedY;
            score++; // Increment the score on rod bounce
            missed = false; // Ball touched the rod
        }

        // Check if the ball hit the top rod
        if (
            ballY <= 0 &&
            ballX + ball.clientWidth >= rodLeft &&
            ballX <= rodRight
        ) {
            ballSpeedY = -ballSpeedY;
        }
    }

    if (missed && ballY >= boundary.clientHeight - ball.clientHeight) {
        alert(`Game Over! Your Score: ${score}`);
        score = 0; // Reset the score
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    
    requestAnimationFrame(MoveBall);
}

MoveBall();
