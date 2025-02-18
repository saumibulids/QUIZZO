let currentQuestion = 0;  // Start from 0
const totalQuestions = 6;

const questions = [
    {
        image: "/static/images/openquiz.png",
        text: "WHAT IS THE SUM OF 130+125+191 ?",
        options: ["335", "456", "446"],
        correctIndex: 2
    },
    {
        image: "/static/images/openquiz.png",
        text: "IF WE MINUS 712 FROM 1500, HOW MUCH DO WE GET ?",
        options: ["788", "778", "758"],
        correctIndex: 0
    },
    {
        image: "/static/images/openquiz.png",
        text: "50 TIMES OF 8 IS EQUAL TO ?",
        options: ["800", "400", "4000"],
        correctIndex: 1
    },
    {
        image: "/static/images/openquiz.png",
        text: "110 DIVIDED BY 10 IS ?",
        options: ["11", "5", "10"],
        correctIndex: 0
    },
    {
        image: "/static/images/openquiz.png",
        text: "20+(90÷2) IS EQUAL TO:",
        options: ["50", "55", "65"],
        correctIndex: 2
    },
    {
        image: "/static/images/openquiz.png",
        text: "SOLVE: 300 – (150×2)",
        options: ["0", "150", "100"],
        correctIndex: 0
    },
];

let score = [];

        function nextQuestion() {
            if (currentQuestion < totalQuestions) {
                currentQuestion++;

                let q = questions[currentQuestion - 1];

               
                document.getElementById("question-text").innerText = q.text;

                let answers = document.querySelectorAll("h3");
                let buttons = document.querySelectorAll(".option");

                // Reset button images and enable buttons
                buttons.forEach((button, index) => {
                    button.querySelector("img").src = "/static/images/openquiz1.png";
                    button.onclick = () => checkAnswer(button, index === q.correctIndex);
                    answers[index].innerText = q.options[index];
                    button.disabled = false;
                });

            } else {
                window.location.href = "/templates/score.html";

            }
        }

        

function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;

        let q = questions[currentQuestion];

        // Update question text
        document.getElementById("question-text").innerText = q.text;

        let answers = document.querySelectorAll("h3");
        let buttons = document.querySelectorAll(".option");

        // Reset button images and enable buttons
        buttons.forEach((button, index) => {
            button.querySelector("img").src = "/static/images/openquiz1.png";
            button.onclick = () => checkAnswer(button, index === q.correctIndex);
            answers[index].innerText = q.options[index];
            button.disabled = false;
        });

    } else {
        // Redirect to home page after last question
        window.location.href = "/score";
    }
}


function checkAnswer(button, isCorrect) {
    let image = button.querySelector("img");
    let options = document.querySelectorAll(".option");

    // Disable all buttons
    options.forEach(btn => btn.disabled = true);

    // Change image based on correctness
    image.src = isCorrect ? "/static/images/openquizc.png" : "/static/images/openquizw.png";

    // Play the correct or incorrect sound
    let correctSound = document.getElementById("correctSound");
    let incorrectSound = document.getElementById("incorrectSound");
    
    if (isCorrect) {
        correctSound.currentTime = 0;  // Reset audio to start
        correctSound.play();  // Play correct sound
    } else {
        incorrectSound.currentTime = 0;  // Reset audio to start
        incorrectSound.play();  // Play incorrect sound
    }

    // Store the result (1 for correct, 0 for incorrect)
    score.push(isCorrect ? 1 : 0);
    localStorage.setItem("quizScore", JSON.stringify(score));

    // Move to next question after 2 seconds
    setTimeout(nextQuestion, 1000);
}