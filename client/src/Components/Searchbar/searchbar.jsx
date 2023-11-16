import React, { useState } from "react";

const Searchbar = ({ onSearch }) => {

    const [ state, setState] = useState("");

    const handleChange = (event) =>{
        setState(event.target.value)
    }

    const handleSubmit = () => {
        onSearch(state);
    }

    return(
        <div>
            <input
                type="text"
                placeholder="Search by breed name"
                value={searchTerm}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default Searchbar;