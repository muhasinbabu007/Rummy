// Define a variable to keep track of the current player's index
let currentPlayerIndex = 0;

// Function to switch to the next player's turn
function switchToNextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateUI();
}

// Function to update the UI to reflect the current state of the game
function updateUI() {
    // Update player hands display
    const playersInfoDiv = document.getElementById('players-info');
    playersInfoDiv.innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        const playerHandDiv = document.createElement('div');
        playerHandDiv.classList.add('player-hand');
        const playerName = i === currentPlayerIndex ? `<strong>${players[i].name}'s Hand (Your Turn):</strong>` : `<strong>${players[i].name}'s Hand:</strong>`;
        playerHandDiv.innerHTML = `${playerName}<br>${players[i].hand.map(card => `${card.rank} of ${card.suit}`).join('<br>')}`;
        playersInfoDiv.appendChild(playerHandDiv);
    }

    // Enable/disable deal button based on current player's turn
    document.getElementById('deal-button').disabled = (currentPlayerIndex !== 0);
}

// Add event listener for discarding a card
document.getElementById('players-info').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('player-hand') && currentPlayerIndex === 0) {
        const cardIndex = Array.from(target.parentNode.children).indexOf(target) - 1; // Subtract 1 for player name div
        const discardedCard = discardCard(players[currentPlayerIndex], cardIndex);
        console.log(`${players[currentPlayerIndex].name} discarded ${discardedCard.rank} of ${discardedCard.suit}`);
        switchToNextPlayer();
    }
});

// Add event listener for the deal button
document.getElementById('deal-button').addEventListener('click', function() {
    if (currentPlayerIndex === 0) {
        const drawnCard = drawCard(deck);
        players[currentPlayerIndex].hand.push(drawnCard);
        console.log(`${players[currentPlayerIndex].name} drew ${drawnCard.rank} of ${drawnCard.suit}`);
        switchToNextPlayer();
    }
});

// Initialize the UI
updateUI();
