/*
 * Create a list that holds all of your cards
 */

let matchedPairs = 0;
let time = 0;
let timer;
let gameOn = false;
let moves = 0;
let openCards = [];

const starsCounter = document.querySelector(".stars");
const moveCounter = document.querySelector(".moves");
const resetButton = document.querySelector(".restart");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const newGameButton = document.querySelector(".newGame");
const finalTime = document.querySelector(".finalTime");

const cards = ['fa-diamond','fa-diamond',
            'fa-paper-plane-o','fa-paper-plane-o',
            'fa-anchor','fa-anchor',
            'fa-bolt','fa-bolt',
            'fa-cube','fa-cube',
            'fa-leaf','fa-leaf',
            'fa-bicycle','fa-bicycle',
            'fa-bomb','fa-bomb'];


function generateCardHTML(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function setupGame() {
    const deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) { // TODO - add shuffle function back
        return generateCardHTML(card);
    });

    //console.log(cardHTML.join(''))
    deck.innerHTML = cardHTML.join('');
    //moves = 0;
    //moveCounter.innerText = moves;

    // Initialize timer with setInterval
    time = 0;
    resetTimer();
}

setupGame();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function gameOver() {
    resetTimer();
    // TODO: Create modal for GameOver
    toggleModal();
    closeButton.addEventListener('click', toggleModal);
    window.addEventListener('click', windowOnClick);
    finalTime.innerText = time;
    return console.log('You won in ',time,' seconds!');
}

function startTimer() {
    timer = setInterval(function() {
        time++;
        gameOn = true;
        //console.log(time);
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
}

function showCard(card) {
    //console.log("card clicked");
    card.classList.add('open', 'show');
    openCards.push(card);
    //console.log('Open cards: ', openCards.length);
}

function hideCards() {
    // If cards don't match, hide
    setTimeout(function () {
        openCards.forEach(function (card) {
            card.classList.remove('open', 'show');
        });
        openCards = [];
        //console.log('Open cards: ', openCards.length);
    }, 1000);
}

function isMatching(card1,card2) {
    if (card1 == card2) {
        console.log('Cards match');
        openCards.forEach(function (card) {
            card.classList.add('match');
            card.classList.remove('open');
            card.classList.remove('show');
        });
        openCards = [];
        incrementPairs();
        
        //console.log("Open cards: ", openCards.length);
    } else {
        console.log('no match');
        hideCards();
    }
    incrementMoves();
}

function incrementPairs() {
    matchedPairs++;
    console.log("Matched Pairs", matchedPairs);

    // Check for Win Condition
    if (matchedPairs == 8) {
        gameOver();
    }
}

function incrementMoves() {
    moves++;

    // Update Move counter
    console.log('Total moves: ', moves);
    moveCounter.innerText = moves;

    // Check moves and update stars
    if (moves == 10) {
        starsCounter.lastElementChild.remove();
    } else if (moves == 15) {
        starsCounter.lastElementChild.remove();
    }
}


// Event Listeners

const allCards = document.querySelectorAll(".card");

allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {

        // Start timer on first click
        if (gameOn == false) {
            startTimer();
        }

        // If card isn't open, show or matched, then flip the card
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {

            if (openCards.length < 2) {
                showCard(card);

                // If two cards are open, check for matching
                if (openCards.length == 2) {
                    // Check for match
                    isMatching(openCards[0].dataset.card, openCards[1].dataset.card);
                }
            }
        }
    });
});

resetButton.addEventListener('click', function (e) {
    location.reload();
});


// Modal functions
function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

newGameButton.addEventListener('click', function(e) {
    console.log("new game button clicked");
    location.reload();
});