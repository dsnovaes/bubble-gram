import React, { useState, useEffect } from 'react';
import SearchResult from "../SearchResult"
import { removeUsers, searchUser } from "../../store/users"
import { useDispatch, useSelector } from 'react-redux';
import {RiCloseCircleFill,RiEmotionSadLine} from "react-icons/ri"
import "./Search.css"

const Search = ({setShowSearch}) => {
    const [query,setQuery] = useState("");
    const [hasSearched,setHasSearched] = useState(false);
    const users = useSelector(state => state.users ? Object.values(state.users) : []);
    const dispatch = useDispatch();
    
    const closeSearch = () => {
        console.log("close search")
        setShowSearch(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setHasSearched(true)
        dispatch(searchUser(query))
    }

    useEffect(()=>{
        console.log("will use this?")
        // setHasSearched(true)
        // searchInput.focus()
        return () => removeUsers()
    },[])
    

    return (
        <div className="search">
            <div className="top">
                <h2>Search</h2>
                <button onClick={closeSearch}><RiCloseCircleFill /></button>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="search" onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search users" />
            </form>
            <ul className="results">
                <h3>Results</h3>
                {users?.map(result=> <SearchResult user={result} key={result.id} />)}
            </ul>
            {hasSearched && users.length === 0 && (
            <p className="noResults">
                <RiEmotionSadLine />
                No results found for <strong>{query}</strong>
            </p> ) }
        </div>
    )
}

export default Search