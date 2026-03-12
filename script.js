const quizData = [
    {
        question: "Which of the following is the start tag of an HTML paragraph element?",
        options: [
            "<h1>",
            "<p>",
            "<paragraph>",
            "<p1>"
        ],
        correct: 1
    },
    {
        question: "Which of the following HTML element is used to wrap the HTML elements?",
        options: ["h1", "p", "div", "button"],
        correct: 2
    },
    {
        question: "Which direction is default for linear gradients?",
        options: ["bottom to top", "left to right", "right to left", "top to bottom"],
        correct: 3
    },
    {
        question: "Which approach bootstrap follows first?",
        options: ["Mobile", "Laptop", "iPad", "None of above"],
        correct: 0
    },
    {
        question: "Which method is used to select element by ID?",
        options: [
            "querySelector()",
            "getElementById()",
            "getElementsByClassName()",
            "getElementsByTagName()"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answered = false;

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option-btn");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const resultEl = document.getElementById("result");
const questionCounter = document.getElementById("questionCounter");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progressBar.style.width = ((currentQuestion) / quizData.length) * 100 + "%";

    optionBtns.forEach((btn, index) => {
        btn.textContent = current.options[index];
        btn.className = "option-btn";
        btn.disabled = false;
    });

    selectedOption = null;
    answered = false;
}

optionBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (answered) return;

        optionBtns.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedOption = index;
    });
});

submitBtn.addEventListener("click", () => {
    if (selectedOption === null) {
        alert("Please select an answer before submitting!");
        return;
    }

    answered = true;
    const correctIndex = quizData[currentQuestion].correct;

    optionBtns.forEach((btn, index) => {
        btn.disabled = true;

        if (index === correctIndex) {
            btn.classList.add("correct");
        }

        if (index === selectedOption && selectedOption !== correctIndex) {
            btn.classList.add("wrong");
        }
    });

    if (selectedOption === correctIndex) score++;
});

nextBtn.addEventListener("click", () => {
    if (!answered) {
        alert("Please submit your answer first!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        questionEl.textContent = "🎉 Quiz Completed!";
        questionCounter.textContent = "";
        progressBar.style.width = "100%";
        resultEl.textContent = `Your Score: ${score} / ${quizData.length}`;
        submitBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
});

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultEl.textContent = "";
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    loadQuestion();
});

loadQuestion();