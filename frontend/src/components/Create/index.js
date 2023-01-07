import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../Header"

const Create = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();


        return (
            <div className="container">
                <Header />
                <p>Create a new post</p>
            </div>
        )
    }
export default Create;