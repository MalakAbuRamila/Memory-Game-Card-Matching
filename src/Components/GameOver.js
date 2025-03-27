import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function GameOver({ gameStats, leaderboardData,onOk }) {
    const { totalCards, score, rank, totalPlayers } = gameStats;

    return (
        <div>
            <h2>Game Over!</h2>
                <div>
                    <p>Number of cards played: {totalCards}</p>
                    <p>Score: {score + 1}</p>
                    <p>You ranked {rank} out of {totalPlayers}</p>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaderboardData.map((entry, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.name}</td>
                                <td>{entry.score + 1}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            <Button className="ok-button" variant="primary" onClick={onOk}>OK</Button>
        </div>
    );
}

export default GameOver;
