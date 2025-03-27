import React from 'react';

function Settings({ rows, setRows, columns, setColumns, delay, setDelay }){

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <label htmlFor="rows" className="form-label"> Number of rows:</label>
                    <select className="form-select" id="rows" value={rows}
                            onChange={(e) => setRows(parseInt(e.target.value))}>
                        {[2, 3, 4, 5].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="columns" className="form-label">Number of columns:</label>
                    <select className="form-select" id="columns" value={columns}
                            onChange={(e) => setColumns(parseInt(e.target.value))}>
                        {[2, 3, 4, 5].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="delay" className="form-label">Delay (in seconds):</label>
                    <select className="form-select" id="delay" value={delay}
                            onChange={(e) => setDelay(parseFloat(e.target.value))}>
                        {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

}

export default Settings;