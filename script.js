// Theme Switcher
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    themeSwitcher.textContent = '☀️'; // Sun icon for light mode
  } else {
    themeSwitcher.textContent = '🌙'; // Moon icon for dark mode
  }
});

// Function to play sound effects
function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.currentTime = 0; // Reset the sound to the beginning
  sound.play();
}
const progressBar = document.querySelector('.progress-bar');

// Function to update the progress bar
function updateProgressBar(currentQuestionIndex, totalQuestions) {
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Example usage in your quiz
const totalQuestions = questions.length;
let currentQuestionIndex = 0;

// Update progress bar when moving to the next question
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    updateProgressBar(currentQuestionIndex, totalQuestions);
  }
});

// Initialize progress bar on quiz start
startBtn.addEventListener('click', () => {
  updateProgressBar(currentQuestionIndex, totalQuestions);
});
// Disable right-click
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz-page');
const endPage = document.getElementById('end-page');
const nameInput = document.getElementById('name');
const startBtn = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');
const greetingElement = document.getElementById('greeting');

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

const questions = [
  {
    question: "Какая ОС была первой операционной системой для компьютеров?",
    options: ["Minix", "Linux", "MS-DOS", "GM-НАА"],
    answer: "GM-НАА"
  },
  {
    question: "Как зовут Основоположника проекта GNU?",
    options: ["Илон Маск", "Линус Торвальдс ", "Ричард Столлман", "Владимир Путин"],
    answer: "Ричард Столлман"
  },
  {
    question: "Какую просьбу Линус высказал ко всем, кто уже пользовался или тестировал Linux?",
    options: ["Подарить ему собаку", "Приготовить ему тортик", "Прислать ему открытку", "Отправить 1$ на чай"],
    answer: "Прислать ему открытку"
  },
  {
    question: "Почему к разработке Linux'a присоединились сотни, потом тысячи, потом сотни тысяч добровольных помощников?",
    options: ["Лунус им заплатил", "Линус опубликовал исходный код Linux'a", "Линус обещал всем участникам бесплатные автомобили", "Разработка Linux'a была частью глобального заговора по захвату мира"],
    answer: "Линус опубликовал исходный код Linux'a"
  }
];

// Function to get the current time in UTC+5
function getCurrentTimeInUTC5() {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000); // Convert to UTC
  const utc5Time = new Date(utcTime + (5 * 3600000)); // Add 5 hours for UTC+5
  return utc5Time;
}

// Function to display the appropriate greeting
function displayGreeting() {
  const utc5Time = getCurrentTimeInUTC5();
  const hour = utc5Time.getHours();
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Доброе утро!";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Добрый день!";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Добрый вечер!";
  } else {
    greeting = "Доброй ночи!";
  }

  greetingElement.textContent = greeting;
}

// Call the greeting function when the page loads
displayGreeting();

// Shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle questions and their options
function shuffleQuestions() {
  shuffleArray(questions);
  questions.forEach((question) => {
    shuffleArray(question.options);
  });
}

// Start Quiz
startBtn.addEventListener('click', () => {
  if (nameInput.value.trim() === "") {
    alert("Пожалуйста, введите свое имя!");
    return;
  }
  playSound('button-click-sound'); // Play button-click sound
  userName = nameInput.value.trim();
  shuffleQuestions();
  startPage.classList.remove('active');
  startPage.classList.add('hidden');
  setTimeout(() => {
    quizPage.classList.remove('hidden');
    quizPage.classList.add('active');
  }, 500);
  loadQuestion();
});

// Load Question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${userName}, ${currentQuestion.question}`;
  optionsElement.innerHTML = '';
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option');
    button.style.setProperty('--index', index);
    button.addEventListener('click', () => selectAnswer(option));
    optionsElement.appendChild(button);
  });
  nextBtn.classList.add('hidden');
}

// Select Answer
function selectAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.disabled = true;
    if (option.textContent === currentQuestion.answer) {
      option.classList.add('correct');
    } else if (option.textContent === selectedOption) {
      option.classList.add('wrong');
    }
  });

  if (selectedOption === currentQuestion.answer) {
    score++;
  }

  nextBtn.classList.remove('hidden');
}
// Select Answer
function selectAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.disabled = true; // Disable all options after selection
    if (option.textContent === currentQuestion.answer) {
      option.classList.add('correct'); // Add correct animation
      playSound('correct-answer-sound'); // Play correct answer sound
    } else if (option.textContent === selectedOption) {
      option.classList.add('wrong'); // Add wrong animation
      playSound('wrong-answer-sound'); // Play wrong answer sound
    }
  });

  // Update score if the answer is correct
  if (selectedOption === currentQuestion.answer) {
    score++;
  }

// Show the next button
  nextBtn.classList.remove('hidden');
}
// Next Question
nextBtn.addEventListener('click', () => {
  // Fade out the current question
  quizPage.classList.remove('fade-in');
  quizPage.classList.add('fade-out');

  // Wait for the fade-out animation to complete before loading the next question
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion(); // Load the next question
    } else {
      endQuiz(); // End the quiz if there are no more questions
    }
  }, 500); // Match the duration of the fade-out animation
});

// Load Question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${userName}, ${currentQuestion.question}`;
  optionsElement.innerHTML = '';

  // Add options with a delay for staggered animation
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option');
    button.style.setProperty('--index', index); // For staggered animation
    button.addEventListener('click', () => selectAnswer(option));
    optionsElement.appendChild(button);
  });

    // Remove fade-out class and add fade-in class for smooth transition
  quizPage.classList.remove('fade-out');
  quizPage.classList.add('fade-in');

  // Hide the next button initially
  nextBtn.classList.add('hidden');
}
// End Quiz
function endQuiz() {
  quizPage.classList.remove('active');
  quizPage.classList.add('hidden');
  setTimeout(() => {
    endPage.classList.remove('hidden');
    endPage.classList.add('active');
  }, 500);

  // Display the score message
  scoreMessage.textContent = `Поздравляем, ${userName}! Ваша оценка ${score} из ${questions.length}.`;

  // Trigger confetti
  triggerConfetti();

  // Save the score and display high scores
  saveScore(userName, score);
}

// Function to trigger confetti
function triggerConfetti() {
  confetti({
    particleCount: 100, // Number of confetti particles
    spread: 70, // Spread of the confetti
    origin: { y: 0.6 }, // Origin of the confetti (bottom of the screen)
  });
}

// Save Score to LocalStorage
function saveScore(name, score) {
  const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
  const existingUserIndex = scores.findIndex(entry => entry.name === name);

  if (existingUserIndex !== -1) {
    if (score > scores[existingUserIndex].score) {
      scores[existingUserIndex].score = score;
    }
  } else {
    scores.push({ name, score });
  }

  localStorage.setItem('quizScores', JSON.stringify(scores));
  displayHighScores();
}

// Display High Scores
function displayHighScores() {
  const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
  if (scores.length > 0) {
    scoreMessage.innerHTML += `<br><br><strong>Таблица лучших результатов:</strong><br>`;
    scores.sort((a, b) => b.score - a.score).forEach((entry, index) => {
      scoreMessage.innerHTML += `${index + 1}. ${entry.name}: ${entry.score}<br>`;
    });
  }
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
  playSound('button-click-sound'); // Play button-click sound
  endPage.classList.remove('active');
  endPage.classList.add('hidden');
  setTimeout(() => {
    startPage.classList.remove('hidden');
    startPage.classList.add('active');
  }, 500);
  currentQuestionIndex = 0;
  score = 0;
});
