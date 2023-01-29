import React, { useEffect } from "react";
import {getFollowers,removeFollows} from "../../store/follows"
import { useDispatch, useSelector } from "react-redux";
import FollowItem from "../FollowItem/FollowItem";
import "./ListFollows.css"
import {RiCloseCircleFill,RiEmotionSadLine} from "react-icons/ri"

const ListFollows = ({type,username,setShowModal}) => {
    const follows = useSelector(state => state.follows ? Object.values(state.follows) : []);
    const dispatch = useDispatch();

    const closeModal = e => {
        e.preventDefault()
        setShowModal(false)
    }

    useEffect(() => {
        dispatch(getFollowers(username));
    }, [])

    if (type==="followers") {

    } else if (type==="following") {

    }

    if (follows) {
        return (
            <div className="followModal">
                <div className="top">
                    <h4>{type}</h4>
                    <button onClick={closeModal}>
                        <svg aria-label="Close" color="currentColor" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
                            <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                        </svg>
                    </button>
                </div>
                <div className="list">
                    {follows?.length ? (
                    follows?.map(follower =>
                        <FollowItem key={follower.id} user={follower} />
                    )) : ( 
                        <div className="empty">
                            <RiEmotionSadLine />
                            {username} has no followers
                        </div>
                    ) }
                </div>
            </div>
        )
    }
}

export default ListFollows