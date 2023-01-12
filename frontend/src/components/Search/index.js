import React, { useState, useEffect } from 'react';
import SearchResult from "../SearchResult"
import {RiCloseCircleFill,RiEmotionSadLine} from "react-icons/ri"
import "./Search.css"

const Search = () => {
    const [query,setQuery] = useState("");
    const [hasSearched,setHasSearched] = useState(false);
    
    const closeSearch = () => {
        console.log("close search")
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    useEffect(()=>{
        console.log("toma no useEffect")
        // setHasSearched(true)
        // searchInput.focus()
    },[])

    const results = [{
            name: "Diego Novaes",
            profilePictureUrl: "https://s2.glbimg.com/1-GgNUGubEb9hS-OaNsKKYqRuJg=/478x215:2629x1425/fit-in/1030x580/middle/smart/filters:strip_icc():strip_exif():format(webp)/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/9/Y/AQuGgTTEiUeh0xDzE4xQ/fup20230111406.jpg",
            username: "dsnovaes",
            id: 1
        },{
            name: "Coding Memes",
            username: "codingmemes",
            id: 2
        },{
            name: "John Mayer",
            profilePictureUrl: "https://s2.glbimg.com/1-GgNUGubEb9hS-OaNsKKYqRuJg=/478x215:2629x1425/fit-in/1030x580/middle/smart/filters:strip_icc():strip_exif():format(webp)/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/9/Y/AQuGgTTEiUeh0xDzE4xQ/fup20230111406.jpg",
            username: "johnmayer",
            id: 3
        }
    ]
    

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