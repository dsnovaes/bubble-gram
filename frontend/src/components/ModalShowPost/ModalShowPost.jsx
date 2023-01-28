import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import ShowPost from './ShowPost';

function ModalShowPost() {
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setShowModal(true)
        if (showModal) alert("about modal / modal should be open now");
        // console.log("value of showModal:",showModal)
    }
    return (
        <>
            <a id="log-in-button" onClick={()=>setShowModal(true)}>
                <span>ModalShowPost</span>
            </a>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ShowPost />
                </Modal>
            )}
        </>
    );
}

export default ModalShowPost;