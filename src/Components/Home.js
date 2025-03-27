import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import GameButtons from "./GameButtons";
import NameInput from "./NameInput";
import Settings from './Settings';
import LeaderBoard from './LeaderBoard';
import GameDescription from './GameDescription';

function Home() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [rows, setRows] = useState(4);
    const [columns, setColumns] = useState(4);
    const [delay, setDelay] = useState(1);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);


    const totalCards = rows * columns;
    const isEven = totalCards % 2 === 0;

    const navigate = useNavigate();



    //load leaderboard data from localStorage.
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('leaderboard'));
        if (savedData) {
            setLeaderboardData(savedData);
        }
    }, []);



    /**
     * This function starts the game. It checks if the player's name is valid and the total number of cards is even.
     * If valid it redirects to the game page.
    */
    function handleStartGame () {
        if (!name.trim() || !isEven) {
            setNameError(true);
            return;
        }

        navigate('/game', { state: { name, rows, columns, delay } });
    }

    return (
        <div className="game-container">
            <div className="game-description-container ">
                <GameDescription/>
            </div>

            <NameInput name={name} setName={setName} setNameError={setNameError}/>
            {nameError && !name.trim() && <p className="error-message">Please enter your name.</p>}

            <GameButtons
                playGame={handleStartGame}
                toggleSettings={() => setShowSettings(!showSettings)}
                displayLeaderboard={() => setShowLeaderboard(!showLeaderboard)}
            />
            {showSettings && (
                <Settings
                    rows={rows}
                    setRows={setRows}
                    columns={columns}
                    setColumns={setColumns}
                    delay={delay}
                    setDelay={setDelay}
                />
            )}
            {!isEven && <p className="error-message">Total number of cards must be even.</p>}
            {showLeaderboard && <LeaderBoard show={showLeaderboard} onClose={() => setShowLeaderboard(false)}
                                             leaderboardData={leaderboardData}/>}
        </div>
    );
}

export default Home;