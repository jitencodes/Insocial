import React, { useState, useEffect, useContext  } from "react";
import "./CommentInput.css";
import { Avatar } from '@material-ui/core';
import { db } from './firebase';
import { UserContext } from './User';
import firebase from "firebase";

function CommentInput({ postId }) {
    const [user, setUser] = useContext(UserContext).user;
    const [comment, setComment] = useState('');

    const postComment = (event) => {
        event.preventDefault();
  
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user?.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user?.photoURL,
            uid:user?.uid,
        });
        setComment('');
    }

    return (
        <form onSubmit={postComment}>
                <div className="commentBox">
                    <Avatar
                        className="post__avatar2"
                        alt=""
                        src={user?.photoURL}
                    />
                    <input className="commentInputBox" type="text" placeholder="Write a comment ... " value={comment} onChange={(e) => setComment(e.target.value)} />
                    <input type="submit" disabled={!comment} className="transparent__submit" />
                </div>
                <p className="pressEnterToPost">Press Enter to post</p>
            </form>
    ); 
}

export default CommentInput;
