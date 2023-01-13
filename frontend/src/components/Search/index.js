import React, { useState, useEffect } from 'react';
import SearchResult from "../SearchResult"
import { removeResults, searchUser } from "../../store/results"
import { useDispatch, useSelector } from 'react-redux';
import {RiCloseCircleFill,RiEmotionSadLine} from "react-icons/ri"
import "./Search.css"

const Search = ({setShowSearch}) => {
    const [query,setQuery] = useState("");
    const [hasSearched,setHasSearched] = useState(false);
    const results = useSelector(state => state.results ? Object.values(state.results) : []);
    const dispatch = useDispatch();
    
    const closeSearch = () => {
        setShowSearch(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(removeResults())
        setHasSearched(true)
        document.activeElement.blur();
        dispatch(searchUser(query))
    }

    useEffect(()=>{
        if (!hasSearched) dispatch(removeResults())
        // setHasSearched(true)
        // searchInput.focus()
        return () => removeResults()
    },[hasSearched])
    

    return (
        <div className="search">
            <div className="top">
                <h2>Search</h2>
                <button onClick={closeSearch}><RiCloseCircleFill /></button>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="search" required autoFocus onFocus={()=>setHasSearched(false)} onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search users" />
            </form>
            <ul className="results">
                <h3>Results</h3>
                {results?.map(result=> <SearchResult user={result} key={result.id} />)}
            </ul>
            {hasSearched && results.length === 0 && (
            <p className="noResults">
                <RiEmotionSadLine />
                No results found for <strong>{query}</strong>
            </p> ) }
        </div>
    )
}

export default Search