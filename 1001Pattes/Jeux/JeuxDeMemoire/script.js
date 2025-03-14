const cardImages = [
    "Tilt.png", "Atta.png", "Heimlich.png", "Marcel.png", "LeBorgne.png", 
    "Tilt.png", "Atta.png", "Heimlich.png", "Marcel.png", "LeBorgne.png"
];

         let flippedCards = [];
        let matchedCards = [];
        let score = 0;
        let attempts = 0;

        // Fonction pour mélanger le tableau d'images
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Fonction pour mettre à jour le score
        function updateScore() {
            document.getElementById("score").textContent = score;
            document.getElementById("attempts").textContent = attempts;
        }

        // Fonction pour réinitialiser le jeu
        function resetGame() {
            score = 0;
            attempts = 0;
            flippedCards = [];
            matchedCards = [];
            shuffle(cardImages);
            createCards();
            updateScore();
        }

        // Fonction pour créer les cartes
        function createCards() {
            const gameBoard = document.getElementById("game-board");
            gameBoard.innerHTML = '';  // Réinitialiser le tableau de jeu
            
            cardImages.forEach(image => {
                const card = document.createElement("div");
                card.classList.add("card");

                const cardInner = document.createElement("div");
                cardInner.classList.add("card-inner");

                const cardFront = document.createElement("div");
                cardFront.classList.add("card-front");

                const cardBack = document.createElement("div");
                cardBack.classList.add("card-back");

                // Image de la face avant de la carte (Toy Story)
                cardFront.style.backgroundImage = `url('https://www.chroniquedisney.fr/imgPerso/secondsroles/1998-lilipuce-06.jpg')`;  

                // Image du dos de la carte (différente pour chaque personnage)
                const img = document.createElement("img");
                img.src = `images/${image}`;
                cardBack.appendChild(img);

                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);
                card.appendChild(cardInner);
                gameBoard.appendChild(card);

                card.addEventListener("click", () => flipCard(card, image));
            });
        }

        // Fonction pour retourner une carte
        function flipCard(card, image) {
            if (flippedCards.length < 2 && !card.classList.contains("flipped") && !matchedCards.includes(image)) {
                card.classList.add("flipped");
                flippedCards.push({ card, image });

                if (flippedCards.length === 2) {
                    attempts++;
                    setTimeout(checkMatch, 1000);
                }
            }
        }

        // Fonction pour vérifier si les cartes retournées sont une paire
        function checkMatch() {
            const [firstCard, secondCard] = flippedCards;

            if (firstCard.image === secondCard.image) {
                score += 10;
                matchedCards.push(firstCard.image);
            } else {
                score -= 5;
                firstCard.card.classList.remove("flipped");
                secondCard.card.classList.remove("flipped");
            }

            flippedCards = [];
            updateScore();
        }

        // Initialisation du jeu
        shuffle(cardImages);
        createCards();
        updateScore();

        // Événement pour réinitialiser le jeu
        document.getElementById("reset-btn").addEventListener("click", resetGame);
