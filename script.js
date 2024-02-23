// Your existing JavaScript code here
// Define card suits and ranks
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// Function to create a deck of cards
function createDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}

// Function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Define a player object
function Player(name) {
    this.name = name;
    this.hand = [];
}

// Function to deal cards to players
function dealCards(players, deck, numCards) {
    for (let i = 0; i < numCards; i++) {
        for (let player of players) {
            player.hand.push(deck.pop());
        }
    }
}

// Function to initialize players
function initializePlayers(numPlayers) {
    let players = [];
    for (let i = 1; i <= numPlayers; i++) {
        let playerName = 'Player ' + i;
        players.push(new Player(playerName));
    }
    return players;
}

// Sample game setup
const numPlayers = 4;
const numCardsToDeal = 7;

// Create and shuffle the deck
let deck = createDeck();
shuffleDeck(deck);

// Initialize players
let players = initializePlayers(numPlayers);

// Deal cards to players
dealCards(players, deck, numCardsToDeal);

// Update UI with players' hands
const playersInfoDiv = document.getElementById('players-info');
for (let player of players) {
    const playerHandDiv = document.createElement('div');
    playerHandDiv.classList.add('player-hand');
    playerHandDiv.innerHTML = `<strong>${player.name}'s Hand:</strong><br>${player.hand.map(card => `${card.rank} of ${card.suit}`).join('<br>')}`;
    playersInfoDiv.appendChild(playerHandDiv);
}

// Add event listener for the deal button
document.getElementById('deal-button').addEventListener('click', function() {
    // Reset hands
    for (let player of players) {
        player.hand = [];
    }

    // Create and shuffle the deck
    deck = createDeck();
    shuffleDeck(deck);

    // Deal cards to players
    dealCards(players, deck, numCardsToDeal);

    // Update UI with players' hands
    playersInfoDiv.innerHTML = '';
    for (let player of players) {
        const playerHandDiv = document.createElement('div');
        playerHandDiv.classList.add('player-hand');
        playerHandDiv.innerHTML = `<strong>${player.name}'s Hand:</strong><br>${player.hand.map(card => `${card.rank} of ${card.suit}`).join('<br>')}`;
        playersInfoDiv.appendChild(playerHandDiv);
    }
});
