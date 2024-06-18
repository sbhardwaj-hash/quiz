const quizzes = {
    technology: [
        {
            question: "What does CPU stand for?",
            options: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
            answer: 0
        },
        {
            question: "Which company developed the Windows operating system?",
            options: ["Apple", "Microsoft", "Google", "IBM"],
            answer: 1
        },
        {
            question: "What is the main function of a web browser?",
            options: ["To provide email services", "To store files", "To access and display websites", "To run operating systems"],
            answer: 2
        },
        {
            question: "What is the primary language used for web development?",
            options: ["HTML", "Python", "Java", "C++"],
            answer: 0
        },
        {
            question: "What does RAM stand for in computer terminology?",
            options: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Real-time Access Memory"],
            answer: 0
        },
        // Add more technology questions here...
    ],
    language: [
        {
            question: "What is the synonym of 'happy'?",
            options: ["Sad", "Elated", "Angry", "Mad"],
            answer: 1
        },
        {
            question: "What is the antonym of 'quick'?",
            options: ["Fast", "Slow", "Rapid", "Swift"],
            answer: 1
        },
        {
            question: "What is the past tense of the verb 'go'?",
            options: ["Go", "Gone", "Going", "Went"],
            answer: 3
        },
        {
            question: "Which word is the opposite of 'joyful'?",
            options: ["Happy", "Ecstatic", "Sad", "Cheerful"],
            answer: 2
        },
        {
            question: "Choose the correctly spelled word:",
            options: ["Receive", "Recieve", "Recive", "Receeve"],
            answer: 0
        },
        // Add more language & grammar questions here...
    ],
    general_knowledge: [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Rome", "Berlin"],
            answer: 0
        },
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
            answer: 2
        },
        {
            question: "What is the smallest prime number?",
            options: ["0", "1", "2", "3"],
            answer: 2
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            answer: 2
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
            answer: 1
        },
        // Add more general knowledge questions here...
    ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let answers = [];
let currentTopic = '';

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const topic = button.dataset.topic;
        startQuiz(topic);
    });
});

function startQuiz(topic) {
    currentTopic = topic;
    currentQuiz = quizzes[topic];
    currentQuestionIndex = 0;
    answers = new Array(currentQuiz.length).fill(null);
    renderQuiz();
}

function renderQuiz() {
    const quizTitle = capitalizeFirstLetter(currentTopic);
    document.body.innerHTML = `
        <header>
            <h1>${capitalizeFirstLetter(document.querySelector('.button.active')?.textContent ?? '')} Quiz</h1>
        </header>
        <main>
            <div class="container">
                <div class="box">
                    <div class="question">${currentQuiz[currentQuestionIndex].question}</div>
                    <div class="options">
                        ${currentQuiz[currentQuestionIndex].options.map((option, index) => `
                            <button class="option" data-index="${index}">${option}</button>
                        `).join('')}
                    </div>
                    <div class="navigation">
                        <button class="nav-button" id="prev">Prev</button>
                        <button class="nav-button" id="next">Next</button>
                    </div>
                    <div class="progress">
                        <span>Answered: ${answers.filter(a => a !== null).length}</span>
                        <span>Remaining: ${answers.filter(a => a === null).length}</span>
                    </div>
                </div>
            </div>
        </main>
    `;

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', (event) => {
            const selectedIndex = parseInt(event.target.dataset.index, 10);
            answers[currentQuestionIndex] = selectedIndex;
            checkAnswer(selectedIndex);
            updateProgress();
        });
    });

    document.getElementById('prev').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuiz();
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        if (currentQuestionIndex < currentQuiz.length - 1) {
            currentQuestionIndex++;
            renderQuiz();
        } else {
            showResults();
        }
    });

    updateProgress();
}

function checkAnswer(selectedIndex) {
    const correctIndex = currentQuiz[currentQuestionIndex].answer;
    const options = document.querySelectorAll('.option');

    options[selectedIndex].classList.add('selected');

    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add('correct');
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[correctIndex].classList.add('correct');
    }
}

function updateProgress() {
    document.querySelector('.progress').innerHTML = `
        <span>Answered: ${answers.filter(a => a !== null).length}</span>
        <span>Remaining: ${answers.filter(a => a === null).length}</span>
    `;
}

function showResults() {
    const score = answers.reduce((total, answer, index) => (
        total + (answer === currentQuiz[index].answer ? 1 : 0)
    ), 0);

    document.body.innerHTML = `
        <header>
            <h1>Quiz Results</h1>
        </header>
        <main>
            <div class="container">
                <div class="box">
                    <p>You answered ${score} out of ${currentQuiz.length} questions correctly!</p>
                    <button onclick="location.reload()">Restart Quiz</button>
                </div>
            </div>
        </main>
    `;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
