import { useState } from "react";
import { WordData } from "../types";

const Search = ({ onSubmit }: { onSubmit: (Data: WordData[]) => void }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        // if search field is empty
        if (query.trim() === '') {
            // show error
            setError('Search field cannot be empty');
            return;
        }
        // else try to fetch from api
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);

            // throw error if response is not okay
            if(!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
          
            const jsonResponse: WordData[] = await response.json();
            onSubmit(jsonResponse);

            setError('');
        } catch (error) {
            setError('Error fetching data from the API');
        }
    };

    return <div>
        <div className="search">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a word"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="search-error">{error}</p>}
    </div>;
}

export default Search;