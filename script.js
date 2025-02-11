let selectedAnswers = []; // Array to hold the user's selected answers
document.getElementById('generateBtn').addEventListener('click', function() {
    document.getElementById("checkAnswersBtn").style.display = 'none';
    const startNumber = parseInt(document.getElementById('startNumber').value) || 1; // Get starting number
    const numQuestions = document.getElementById('numQuestions').value;
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // Clear previous questions
    selectedAnswers = []; // Reset selected answers

    for (let i = 0; i < numQuestions; i++) {
        const questionNumber = startNumber + i; // Calculate question number
        const questionHTML = `
            <div class="question">
                <p id="${questionNumber}">${questionNumber}. <label data-label='a'><input type="radio" name="q${questionNumber}" value="A"></label> 
                <label data-label='b'><input type="radio" name="q${questionNumber}" value="B"> </label> 
                <label data-label='c'><input type="radio" name="q${questionNumber}" value="C"> </label> 
                <label data-label='d'><input type="radio" name="q${questionNumber}" value="D"> </label></p>
            </div>
        `;
        questionsContainer.innerHTML += questionHTML;
    }

    document.getElementById('omrForm').style.display = 'block'; // Show the form
    document.getElementById('results').style.display = 'none'; // Hide results
});

document.getElementById('omrForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    document.getElementById("submitbtn").style.display = 'none';
    document.getElementById("checkAnswersBtn").style.display = 'block';
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = ''; // Clear previous answers
    selectedAnswers = []; // Reset selected answers

    const numQuestions = document.getElementById('numQuestions').value;
    const startNumber = parseInt(document.getElementById('startNumber').value) || 1; // Get starting number

    for (let i = 0; i < numQuestions; i++) {
        const questionNumber = startNumber + i; // Calculate question number
        const answer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
        if (answer) {
            selectedAnswers.push(answer.value); // Store the selected answer
        } else {
            selectedAnswers.push(null); // Store null for unanswered questions
        }
    }

    document.getElementById('results').style.display = 'block'; // Show results
});

document.getElementById('checkAnswersBtn').addEventListener('click', function() {
    document.getElementById("submitbtn").style.display = 'show';
    const numQuestions = document.getElementById('numQuestions').value;
    const answersContainer = document.getElementById('answersContainer');
    const scoreContainer = document.getElementById('score');
    let score = 0;

    // Clear previous score
    scoreContainer.innerHTML = '';
    const startNumber = parseInt(document.getElementById('startNumber').value) || 1; // Get starting number

    // Compare submitted answers with currently selected answers
    for (let i = 0; i < numQuestions; i++) {
        const questionNumber = startNumber + i; // Calculate question number
        const currentAnswer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
        const previousAnswer = selectedAnswers[i];

        if (currentAnswer) {
            const paragraph = document.getElementById(questionNumber.toString());
            if (previousAnswer === currentAnswer.value) {
                score++;
            } else {
                if (previousAnswer != null) {
                    const labelAnsRed = paragraph.querySelector(`input[type="radio"][value="${previousAnswer}"]`).parentElement;  
                    labelAnsRed.style.backgroundColor = 'red';  
                }            
            }
            if (currentAnswer.value != null) {
                const labelAns = paragraph.querySelector(`input[type="radio"][value="${currentAnswer.value}"]`).parentElement;
                let colorNow = 'green';
                if (previousAnswer == null) {
                    colorNow = 'yellow';
                }
                labelAns.style.backgroundColor = colorNow; 
            }
        }
    }
    uncheckAllRadioButtons();

    // Display score
    scoreContainer.innerHTML = `Correct: ${score} out of ${numQuestions}`;
});

function uncheckAllRadioButtons() {
    // Select all radio buttons within the questions container
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    
    // Loop through each radio button and uncheck it
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
}

