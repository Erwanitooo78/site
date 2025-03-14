// Questions et réponses
const questions = [
    {
        question: "Quelle est ta qualité la plus marquante ?",
        answers: ["Ingéniosité", "Courage", "Gentillesse", "Sens de l'humour"],
        scores: ["Tilt", "Atta", "Heimlich", "Marcel"]
    },
    {
        question: "Quelle est ta plus grande peur ?",
        answers: ["Échouer dans un projet", "Ne pas être à la hauteur", "Être seul", "Que l'on se moque de toi"],
        scores: ["Tilt", "Atta", "Heimlich", "Marcel"]
    },
    {
        question: "Quel est ton passe-temps favori ?",
        answers: ["Inventer de nouvelles choses", "Protéger et guider les autres", "Manger et profiter de la vie", "Jouer des rôles différents"],
        scores: ["Tilt", "Atta", "Heimlich", "Marcel"]
    },
    {
        question: "Comment réagis-tu face à un défi ?",
        answers: ["Tu trouves une solution ingénieuse", "Tu fonces avec détermination", "Tu restes optimiste quoi qu'il arrive", "Tu fais une blague pour détendre l'atmosphère"],
        scores: ["Tilt", "Atta", "Heimlich", "Marcel"]
    },
    {
        question: "Quel est ton rôle dans un groupe d'amis ?",
        answers: ["L'inventeur un peu maladroit", "Le leader responsable", "Le joyeux gourmand", "Le sarcastique au grand cœur"],
        scores: ["Tilt", "Atta", "Heimlich", "Marcel"]
    }
];



// Messages et images des personnages
const resultMessages = {
    Tilt: "Tu es Tilt ! Un inventeur créatif et ingénieux, parfois maladroit, mais toujours prêt à aider les autres. 🐜✨",
    Atta: "Tu es Atta ! Responsable et courageuse, tu fais toujours de ton mieux pour protéger et guider ceux qui comptent sur toi. 👑🐜",
    Heimlich: "Tu es Heimlich ! Gourmand et joyeux, tu vois toujours le bon côté des choses et rêves de devenir un magnifique papillon. 🐛🦋",
    Marcel: "Tu es Marcel ! Sarcastique mais au grand cœur, tu es toujours là pour défendre tes amis et leur remonter le moral. 🐞❤️"
};

const resultImages = {
    Tilt: "https://static.wikia.nocookie.net/lemondededisney/images/1/13/Bugs-life-disneyscreencaps.com-1976.jpg/revision/latest?cb=20200321092526&path-prefix=fr",
    Atta: "https://static.wikia.nocookie.net/lemondededisney/images/5/5d/Atta.jpg/revision/latest?cb=20200316225118&path-prefix=fr",
    Heimlich: "https://www.chroniquedisney.fr/imgPerso/secondsroles/1998-heimlich-01.jpg",
    Marcel: "https://pinkcorn.fr/wp-content/uploads/2021/10/marcel-001-pattes.jpg"
};

let currentQuestionIndex = 0;
let score = { Tilt: 0, Atta: 0, Heimlich: 0, Marcel: 0 };

// Charger la question suivante
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionElement = document.getElementById('question');
        const buttons = document.querySelectorAll('.answers button');
        const progressElement = document.querySelector('.progress');

        questionElement.textContent = questions[currentQuestionIndex].question;
        buttons.forEach((button, index) => {
            button.textContent = questions[currentQuestionIndex].answers[index];
        });

        // Mettre à jour la barre de progression
        progressElement.style.width = `${(currentQuestionIndex / questions.length) * 125}%`;
    } else {
        showResult();
    }
}

// Enregistrer la réponse avec effet sonore
function selectAnswer(answerIndex) {
    const clickSound = document.getElementById("clickSound");
    clickSound.play();  // Effet sonore au clic
    const selectedCharacter = questions[currentQuestionIndex].scores[answerIndex];
    score[selectedCharacter]++;
    currentQuestionIndex++;
    loadQuestion();
}

// Afficher le résultat final avec son et image
function showResult() {
    const resultElement = document.getElementById('result');
    const resultImageElement = document.getElementById('resultImage');
    const winSound = document.getElementById("winSound");
    const restartButton = document.getElementById('restartButton');

    const maxScore = Math.max(...Object.values(score));
    const winner = Object.keys(score).find(key => score[key] === maxScore);

    resultElement.textContent = resultMessages[winner];
    resultImageElement.src = resultImages[winner];
    resultImageElement.style.display = "block";
    restartButton.style.display = 'block';

    winSound.play();  // Effet sonore à la fin du quiz
}

// Redémarrer le quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = { Tilt: 0, Atta: 0, Heimlich: 0, Marcel: 0 };
    document.getElementById('result').textContent = '';
    document.getElementById('resultImage').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.querySelector('.progress').style.width = '0%';
    loadQuestion();
}

// Charger la première question au démarrage
loadQuestion();
