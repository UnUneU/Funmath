document.addEventListener("DOMContentLoaded", function() {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const startButton = document.getElementById('start');
    const messageElement = document.getElementById('message');
    const timerElement = document.getElementById('timer');

    let timerInterval;
    let time = 0;
    let correctAnswer;

    function generateQuestion() {
        const operators = ['+', '-', '*', '/'];
        const num1 = Math.floor(Math.random() * 100);
        const num2 = Math.floor(Math.random() * 100);
        const operator = operators[Math.floor(Math.random() * operators.length)];

        switch (operator) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            case '/':
                // Make sure the denominator is not zero
                const denominator = Math.floor(Math.random() * 99) + 1;
                correctAnswer = (num1 / denominator).toFixed(2); // Round to 2 decimal places
                break;
            default:
                break;
        }

        return `${num1} ${operator} ${num2}`;
    }

    function startGame() {
        const question = generateQuestion();
        questionElement.textContent = `คำถาม: ${question}`;
        answerElement.value = '';
        messageElement.textContent = '';
        clearInterval(timerInterval);
        time = 0;
        timerInterval = setInterval(() => {
            time++;
            timerElement.textContent = time;
        }, 1000);
        answerElement.focus();

        startButton.disabled = true;
    }

    function checkAnswer() {
        const userAnswer = answerElement.value;
        if (userAnswer === correctAnswer.toString()) {
            messageElement.textContent = 'ถูกต้อง!';
        } else {
            messageElement.textContent = 'ผิด! ลองใหม่อีกครั้ง';
        }
        clearInterval(timerInterval);
        startButton.disabled = false;
    }

    startButton.addEventListener('click', startGame);
    answerElement.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});
