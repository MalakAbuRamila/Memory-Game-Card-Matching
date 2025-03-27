import React, { useState, useEffect } from 'react';
import { Button} from "react-bootstrap";
function GameBoard({ cards, onCardClick, delay, steps, setSteps, rowsNum, colsNum, endGame, AbandonGame }) {

    const [revealedCardIndex, setRevealedCardIndex] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false); //track waiting state

    /**
     * This function handles the logic when a card is clicked in the game. It prevents actions if the game is in
     * a waiting state, the card is already revealed, or the card is already matched.
     * If a pair of cards is revealed, it checks if they match. If they do, it updates the matched pairs and checks
     * if all pairs match to potentially end the game. If they do not match, it hides the cards again after a delay.
     * @param index The index of the clicked card
     */
    function handleCardClick(index) {

        //ignore click if the game is in a waiting state or the card is already revealed or matched
        if (isWaiting || revealedCardIndex.includes(index) || matchedPairs.includes(cards[index].name)) {
            return;
        }

        setRevealedCardIndex([...revealedCardIndex, index]);
        setSteps(steps + 1); //increment steps count on every card click

        //check if a pair is revealed
        if (revealedCardIndex.length === 1) {
            const firstIndex = revealedCardIndex[0];
            const secondIndex = index;

            //check if the pair is a match
            if (cards[firstIndex].name === cards[secondIndex].name) {
                //matching pair
                setMatchedPairs([...matchedPairs, cards[firstIndex].name]);
                setRevealedCardIndex([]); // Reset revealed cards immediately

                //check if all pairs match if yes call for endGame() to end the game
                if (matchedPairs.length + 1 === cards.length / 2) {

                    endGame();
                }
            } else
            {
                //otherwise(not a matching pair) wait before hiding cards(delay)
                setIsWaiting(true);
                setTimeout(() => {
                    setRevealedCardIndex([]);
                    setIsWaiting(false); //reset waiting state after delay
                }, delay * 1000);
            }
        } else {
            setRevealedCardIndex([...revealedCardIndex, index]);
        }

        onCardClick(index);
    }


    useEffect(() => {
        const gameBoardElement = document.querySelector('.game-board');
        if (gameBoardElement) {
            gameBoardElement.style.gridTemplateColumns = `repeat(${colsNum}, 1fr)`;
            gameBoardElement.style.gridTemplateRows = `repeat(${rowsNum}, 1fr)`;
        }
    }, [rowsNum, colsNum]);


    return (
        <div>
            <div className="container">
                <h2>Steps: {steps}</h2>
                <Button onClick={AbandonGame} >Abandon</Button>
            </div>
            <div className="game-board">
                {cards.map((card, index) => (
                    <div key={index} className="card" onClick={() => handleCardClick(index)}>
                        {(revealedCardIndex.includes(index) || matchedPairs.includes(card.name)) ? (
                            <img src={card.image} alt={card.name}/>
                        ) : (
                            <img src="/images/card.jpg" alt="Question Mark"/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
