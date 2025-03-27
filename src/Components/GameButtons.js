import React from 'react';
import { Button } from 'react-bootstrap';

function GameButtons({ playGame, toggleSettings, displayLeaderboard }) {
    return(
        <div  className="button-container">
        <Button className="play-button" onClick={playGame}>Play</Button>
        <Button variant="secondary" className="settings-button" onClick={toggleSettings}>Settings</Button>
        <Button variant="secondary" className="settings-button" onClick={displayLeaderboard}>High Scores</Button>
        </div>
);
}

export default GameButtons;