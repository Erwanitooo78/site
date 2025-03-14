// Questions et réponses
const questions = [
    {
        question: "Quelle est ta qualité la plus marquante ?",
        answers: ["Courage", "Loyauté", "Curiosité", "Sens de l'humour"],
        scores: ["Woody", "Buzz", "Hamm", "Rex"]
    },
    {
        question: "Quelle est ta plus grande peur ?",
        answers: ["Perdre des amis", "Ne pas être à la hauteur", "L'inconnu", "Être ignoré"],
        scores: ["Woody", "Buzz", "Hamm", "Rex"]
    },
    {
        question: "Quel est ton passe-temps favori ?",
        answers: ["Aider les autres", "Explorer de nouveaux endroits", "Jouer avec des amis", "Faire des blagues"],
        scores: ["Woody", "Buzz", "Hamm", "Rex"]
    },
    {
        question: "Comment réagis-tu face à un défi ?",
        answers: ["Tu fais face avec courage", "Tu cherches des solutions créatives", "Tu demandes de l'aide à tes amis", "Tu essaies de détendre l'atmosphère avec de l'humour"],
        scores: ["Woody", "Buzz", "Hamm", "Rex"]
    },
    {
        question: "Quel est ton rôle dans un groupe d'amis ?",
        answers: ["Le leader", "L'aventurier", "Le soutien", "Le comique"],
        scores: ["Woody", "Buzz", "Hamm", "Rex"]
    }
];


// Messages et images des personnages
const resultMessages = {
    Woody: "Tu es Woody, le cowboy fidèle et protecteur, toujours prêt à aider tes amis ! 🤠",
    Buzz: "Tu es Buzz l'Éclair, le héros galactique, courageux et aventureux ! 🚀",
    Hamm: "Tu es Hamm ! Toujours avec un sens de l'humour, tu apportes de la joie dans tous les moments. 🐖",
    Rex: "Tu es Rex, le dinosaure adorable, gentil mais parfois un peu timide. 🦖"
};

const resultImages = {
    Woody: "https://static.wikia.nocookie.net/disney/images/2/22/Profile_-_Woody.jpeg/revision/latest?cb=20200711052417",
    Buzz: "https://static.wikia.nocookie.net/lemondededisney/images/b/b7/Buzz.jpg/revision/latest/thumbnail/width/360/height/360?cb=20200312222413&path-prefix=fr",
    Hamm: "https://static.wikia.nocookie.net/disney/images/4/4f/Profile_-_Hamm.jpeg/revision/latest?cb=20190313051329",
    Rex: "https://static.wikia.nocookie.net/lemondededisney/images/2/21/Rex-toystory.png/revision/latest?cb=20230829154351&path-prefix=fr"
};

let currentQuestionIndex = 0;
let score = { Woody: 0, Buzz: 0, Hamm: 0, Rex: 0 };

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
    score = { Woody: 0, Buzz: 0, Hamm: 0, Rex: 0 };
    document.getElementById('result').textContent = '';
    document.getElementById('resultImage').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.querySelector('.progress').style.width = '0%';
    loadQuestion();
}

// Charger la première question au démarrage
loadQuestion();
