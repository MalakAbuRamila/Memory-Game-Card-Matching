import React from 'react';
import '../App.css'

function NameInput( { name, setName, setNameError }) {


    /**
     * This function handles the player's name input changes. It ensures that the input is trimmed,
     * limited to 12 characters, and contains only letters or digits. Invalid characters are removed.
     * @param e event object representing the input change event
     */
    function handleInputChange(e) {

        //trim input and limit it to 12 characters (letters or digits)
        const input = e.target.value.trim().substring(0, 12);

        //remove any character that is not a letter or digit
        const validName = input.replace(/[^a-zA-Z0-9]/g, '');
        setName(validName);

        //if there is a name error, reset the error state once a valid name is entered.
        if (setNameError) {
            setNameError(false);
        }
    }

    return (
        <div className="username-container">
            <div>
            <label htmlFor="username" >Your name: </label>
            </div>
            <input
                type="text"
                id="username"
                className="username-input form-control"
                placeholder="Enter your name (letters and digits only)"
                value={name}
                maxLength={12}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default NameInput;