let selectedAnswers = []; // Array to hold the user's selected answers

document.getElementById('generateBtn').addEventListener('click', function () {
    const startNumber = parseInt(document.getElementById('startNumber').value) || 1;
    const lastNumber = parseInt(document.getElementById('lastNumber').value);

    if (isNaN(lastNumber) || lastNumber < startNumber) {
        alert("Please enter a valid Last Number greater than or equal to the Start Number.");
        return;
    }

    const numQuestions = lastNumber - startNumber + 1;
    const questionsContainer = document.getElementById('questionsContainer');
    const omrSection = document.getElementById('omrSection');
    const resultsSection = document.getElementById('results');

    questionsContainer.innerHTML = '';
    selectedAnswers = [];

    for (let i = 0; i < numQuestions; i++) {
        const questionNumber = startNumber + i;
        const questionHTML = `
            <div class="question" id="q-row-${questionNumber}">
                <span class="q-num">${questionNumber}</span>
                <div class="options">
                    <label class="option-label" data-label="a">
                        <input type="radio" name="q${questionNumber}" value="A">
                    </label> 
                    <label class="option-label" data-label="b">
                        <input type="radio" name="q${questionNumber}" value="B">
                    </label> 
                    <label class="option-label" data-label="c">
                        <input type="radio" name="q${questionNumber}" value="C">
                    </label> 
                    <label class="option-label" data-label="d">
                        <input type="radio" name="q${questionNumber}" value="D">
                    </label>
                </div>
            </div>
        `;
        questionsContainer.innerHTML += questionHTML;
    }

    omrSection.style.display = 'block';
    resultsSection.style.display = 'none';
    document.getElementById("submitbtn").style.display = 'block';
    document.getElementById("checkAnswersBtn").style.display = 'none';
});

document.getElementById('omrForm').addEventListener('submit', function (event) {
    event.preventDefault();

    document.getElementById("submitbtn").style.display = 'none';
    document.getElementById("checkAnswersBtn").style.display = 'block';

    const startNumber = parseInt(document.getElementById('startNumber').value) || 1;
    const lastNumber = parseInt(document.getElementById('lastNumber').value);
    const numQuestions = lastNumber - startNumber + 1;

    selectedAnswers = [];

    for (let i = 0; i < numQuestions; i++) {
        const questionNumber = startNumber + i;
        const answer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
        selectedAnswers.push(answer ? answer.value : null);
    }

    // Show results section
    const resultsSection = document.getElementById('results');
    resultsSection.style.display = 'block';
    document.getElementById('score').innerText = "Submitted!";
});

document.getElementById('checkAnswersBtn').addEventListener('click', function () {
    const startNumber = parseInt(document.getElementById('startNumber').value) || 1;
    const lastNumber = parseInt(document.getElementById('lastNumber').value);
    const numQuestions = lastNumber - startNumber + 1;

    let score = 0;

    for (let i = 0; i < numQuestions; i++) {
        const questionNumber = startNumber + i;
        const currentAnswerElement = document.querySelector(`input[name="q${questionNumber}"]:checked`);
        const previousAnswerVisible = selectedAnswers[i];

        const questionRow = document.getElementById(`q-row-${questionNumber}`);
        const inputs = questionRow.querySelectorAll('input[type="radio"]');

        // Reset styles first
        inputs.forEach(input => {
            input.parentElement.classList.remove('correct-bubble', 'wrong-bubble', 'unanswered-bubble');
        });

        if (currentAnswerElement) {
            const currentValue = currentAnswerElement.value;

            if (previousAnswerVisible === currentValue) {
                // Correct match
                score++;
                currentAnswerElement.parentElement.classList.add('correct-bubble');
            } else {
                // Wrong match or student didn't answer
                if (previousAnswerVisible !== null) {
                    const originalInput = questionRow.querySelector(`input[value="${previousAnswerVisible}"]`);
                    originalInput.parentElement.classList.add('wrong-bubble');
                    // Show what was correct
                    currentAnswerElement.parentElement.classList.add('correct-bubble');
                } else {
                    // Student didn't answer - mark the correct one yellow as requested
                    currentAnswerElement.parentElement.classList.add('unanswered-bubble');
                }
            }
        }
    }

    document.getElementById('score').innerText = `${score} / ${numQuestions}`;
    document.getElementById("checkAnswersBtn").style.display = 'none';
    uncheckAllRadioButtons();
});

// Add scroll-to-change functionality for number inputs
[document.getElementById('startNumber'), document.getElementById('lastNumber')].forEach(input => {
    input.addEventListener('wheel', function (e) {
        if (document.activeElement === input) {
            e.preventDefault();
            const step = parseInt(input.step) || 1;
            if (e.deltaY < 0) {
                input.value = parseInt(input.value || 0) + step;
            } else {
                input.value = Math.max(parseInt(input.getAttribute('min') || 0), parseInt(input.value || 0) - step);
            }
            // Trigger any calculation or validation if needed
        }
    }, { passive: false });
});

