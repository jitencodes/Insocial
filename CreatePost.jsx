import React, { useState, useContext } from 'react'
import "./CreatePost.css"
import SignInBtn from './SignInBtn'
import { UserContext } from './User'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import firebase from "firebase"
import { storage, db } from "./firebase";
import makeid from "./HelperFunction";

export function CreatePost() {
    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [profileUrl, setprofileUrl] = useState('')
    const [progress, setProgress] = useState(0);
    const [noLikes, setNoLikes] = useState(0);


    //  image preview function
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            var imagePreview = document.getElementById("image_preview");
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    };
    
    //  post upload function
    const handleUpload = () => {
        if (caption == "" && image == "") {
            console.log("Prevented Access to Photo or Caption Submission")
        } else if (image == '') {
                
                // upload complete function
                db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                username: user.displayName  ,
                userProfile: user.photoURL,
                uid: user.uid,
                noLikes: 0,
            })
                setCaption("");
                setImage('');
            
            } else {
         
                    var imageName = makeid(10);
                    const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
                    var progress1 = document.getElementById("progressBar");
                    progress1.style.display = "block";

                    uploadTask.on( "state_changed", (snapshot) => {
                        // progress function .....
                        const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    
                    (error) => {
                        // Error function...
                        console.log(error);
                        alert(error.message);
                    },
                    
                    () => {
                        // upload complete function
                        storage.ref("images").child(`${imageName}.jpg`).getDownloadURL().then(
                            (url) => {
                                db.collection("posts").add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                photoUrl: url,
                                username: user.email.replace("@gmail.com",""),
                                userProfile: user.photoURL,
                                uid: user.uid,
                                noLikes: 0,
                            });
                            }
                        );
                        
            
                        setProgress(0);
                        setCaption("");
                        setImage('');
                        var preview1 = document.getElementById("image_preview");
                        preview1.style.display = "none";
                        progress1.style.display = "none";
                    });
                }
    };
    

    return (
        <div className="createPost">
            {user ?                     
                    (
                        <div className="createPost_LoggedIn">
                            <p>Create Post</p>
                            <div className="createPost_loggedInCenter">
                                
                                <textarea className="createPost_textArea"
                                        rows="3"
                                        value={caption}
                                        placeholder="Enter caption here.."
                                        onChange={(e) => setCaption(e.target.value)} 
                                ></textarea>
                                
                                <div className="imagePreview">
                                <img  id="image_preview" alt="" />
                                </div>

                            </div>
                            <div className="img_upload">
                                <label htmlFor="fileInput">
                                <AddAPhotoIcon style={{cursor:"pointer", fontSize:"20px"}} />
                                </label>
                                <input id="fileInput" type="file" accept="image/*" onChange={handleChange} />
                                <button 
                                        className="uploadBtn" 
                                        onClick={handleUpload}
                                        style={{color:caption ? "#000" : "lightgray" }}
                                >Post
                                </button>
                            </div>
                            <progress value={progress} id="progressBar" max="100" />
                            {` ${progress != 0 ? progress : ""}`}

                            </div>    
                    ) 
                      :
                        (
                        <div className="createPost_signIn">
                            <SignInBtn />
                            <p style={ {marginLeft:"16px"}}>to create post & comment</p>
                        </div>
                        )
                    
            }
        </div>
    );
};

export default CreatePost;
