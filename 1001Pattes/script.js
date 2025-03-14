// Sélection des boutons "Next" et "Prev"
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

// Écouteur d'événement pour le bouton "Next"
next.addEventListener('click', function () {
    let items = document.querySelectorAll('.item'); // Sélection de tous les éléments
    document.querySelector('.slide').appendChild(items[0]); // Déplace le premier élément à la fin
});

// Écouteur d'événement pour le bouton "Prev"
prev.addEventListener('click', function () {
    let items = document.querySelectorAll('.item'); // Sélection de tous les éléments
    document.querySelector('.slide').prepend(items[items.length - 1]); // Déplace le dernier élément au début
});
