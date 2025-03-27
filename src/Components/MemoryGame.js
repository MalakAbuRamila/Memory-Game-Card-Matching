import '../App.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameBoard from "./GameBoard";
import GameOver from "./GameOver";
import GameDescription from "./GameDescription";
function  MemoryGame(){

    const location = useLocation();
    const navigate = useNavigate();

    const { name, rows, columns, delay } = location.state;
    const [steps, setSteps] = useState(0);
    const [cards, setCards] = useState([]);
    const [gameStats, setGameStats] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState([]);

    const totalCards = rows * columns;


    //load leaderboard data from localStorage.
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('leaderboard'));
        if (savedData) {
            setLeaderboardData(savedData);
        }
    }, []);


    /**
     * This function initializes the game cards.It selects a number of fruit images based on the total number of cards,
     * it creates pairs and then shuffles the cards using the Fisher-Yates algorithm.
     */
    function initializeCards() {
        const fruitImage = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
        const selectedFruitImage = fruitImage.slice(0, totalCards / 2);
        const shuffledFruitImage = [...selectedFruitImage, ...selectedFruitImage];

        //Fisher-Yates shuffle
        for (let i = shuffledFruitImage.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledFruitImage[i], shuffledFruitImage[j]] = [shuffledFruitImage[j], shuffledFruitImage[i]];
        }

        const initialCards = shuffledFruitImage.map((num) => ({
            name: num,
            image: `/images/${num}.jpg`,
            isRevealed: false,
        }));
        setCards(initialCards);
    }


    useEffect(() => {
        //call for the initializeCards function.
        initializeCards();
    }, []);


    /**
     * This function handles the logic when a card is clicked.
     *  If the card is not already revealed, it updates the card to be revealed.
     * @param index The index of the clicked card
     */
    function handleCardClick(index) {
        if (!cards[index].isRevealed) {
            const updatedCards = [...cards];
            updatedCards[index].isRevealed = true;
            setCards(updatedCards);
            setSteps(steps + 1);
        }
    }

    /**
     * This function handles the end of the game.
     * It calculates the player's score, checks if the player's score should be added to or updated in the leaderboard,
     * updates the leaderboard if necessary (a new player is added or a player achieved a higher score),
     * saves the updated leaderboard to local storage, and sets the game stats for display.
     */
    function handleEndGame() {
        const score = steps + totalCards;
        const playerName = name.toLowerCase();
        const existingPlayerIndex = leaderboardData.findIndex(entry => entry.name.toLowerCase() === playerName);

        //determine if the player's new score is higher
        const updateLeaderboard = existingPlayerIndex === -1 || leaderboardData[existingPlayerIndex].score < score;

        //if the player's new score is higher than his score in the previous game, update
        if (updateLeaderboard) {
            //remove the old entry if it exists
            if (existingPlayerIndex !== -1) {
                leaderboardData.splice(existingPlayerIndex, 1);
            }

            //add the new entry
            const newEntry = { name, steps, score };
            const updatedLeaderboard = [...leaderboardData, newEntry];

            //sort by score in descending order
            updatedLeaderboard.sort((a, b) => b.score - a.score);

            //local storage for the leaderboard data
            localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
            setLeaderboardData(updatedLeaderboard);

            //display the game over screen with the updated stats.
            const rank = updatedLeaderboard.findIndex((entry) => entry.name.toLowerCase() === playerName) + 1;

            setGameStats({
                totalCards,
                steps,
                score,
                rank,
                totalPlayers: updatedLeaderboard.length,
            });

        } else {

            //display the game over screen with the current stats
            const rank = leaderboardData.findIndex((entry) => entry.name.toLowerCase() === playerName) + 1;

            setGameStats({
                totalCards,
                steps,
                score,
                rank,
                totalPlayers: leaderboardData.length,
            });

        }
    }

    /**
     * This function handles the OK action(for the ok button) after the game over screen is displayed.
     * It redirects the player to the home page once the ok button is clicked.
     */
    function handleOk() {
        navigate('/');
    }

    /**
     * This function handles abandoning the game.
     * It redirects the player to the home page once the abandon button is clicked.
     */
    function handleAbandonGame() {
        navigate('/');
    }

    return (
        <div className="game">
            <div className="game-description-container">
                <GameDescription/>
            </div>
            {!gameStats && (
                <div>
                    <GameBoard
                        cards={cards}
                        onCardClick={handleCardClick}
                        delay={delay}
                        steps={steps}
                        rowsNum={rows}
                        colsNum={columns}
                        endGame={handleEndGame}
                        setSteps={setSteps}
                        AbandonGame={handleAbandonGame}
                    />
                </div>
            )}
            {gameStats && (
                <GameOver
                    gameStats={gameStats}
                    leaderboardData={leaderboardData}
                    onOk={handleOk}
                />
            )}
        </div>
    );


}


export default MemoryGame;
