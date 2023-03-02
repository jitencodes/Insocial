import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post.jsx';
import "./Profile.css";
import {db} from "./firebase";
import { UserContext } from './User';
import dPhoto from './insocial/default_profile.png';
import Avatar from "@material-ui/core/Avatar";


function Profile() {
  const [user, setUser] = useContext(UserContext).user;
  const { username, uid } = useParams();
  const [profileUserData, setProfileUserData] = useState();
  const [suggestedUser, setSuggestedUser] = useState([]);

  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("complecated");

  
  //getting all the posts
  useEffect(() => {
    db.collection("posts")
      .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot)=>{
          setPosts(snapshot.docs.map((doc) =>({
            id: doc.id,
            post: doc.data(),
            })));
        })
        console.log(posts)
      }, []);

      useEffect(() => {
        db.collection('users').onSnapshot((snapshot) => {
            setSuggestedUser(snapshot.docs.map((doc) => doc.data()))
        })
      }, [])
    
      //fetching post data when updated..
      useEffect(() => {
        db.collection("posts")
          .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot)=>{
              setPosts(snapshot.docs.map((doc) =>({
                id: doc.id, 
                post: doc.data(),
                })));
            })
            console.log(posts)
          }, []);
     
      
    //getting profile user data
    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot((doc) => {
            setProfileUserData(doc.data());
        });
    }, [])
      
  //   if (profileUserData !== undefined) {
  //     if (profileUserData?.uid !== user?.uid) {
  //         document.getElementsByClassName('edit_btn')[0].style.display = 'none';

  //     } else {
  //         document.getElementsByClassName('edit_btn')[0].style.display = 'flex';
  //     }
  // }


  return (
    <div className="feed">
        <div className="sideProfile">
          <div className="sideUp">
            <div className="sideImg">
            <img className='img'
                src={
                user?(profileUserData?.photoURL):(dPhoto)
              } alt=""/>
                {
                  user? <>
                    <div className="names">
                    <h1>{profileUserData?.displayName}</h1>
                    <h2>Profile</h2>
                    </div> 
                  </>:<>
                  <div className="names">
                    <h1>Welcome</h1>
                    <h2>This is User Profile</h2>
                    </div> 
                  </>
                }
            </div>
          </div> 
          <div className="sideMid">
            <h1>Suggested User</h1>
          </div>
              {
                user?<>
                <div className="sideDown">
                {
                suggestedUser?.uid !== user?.uid && (
                  suggestedUser.map((user1) => (
                    <div className="suggestedUser">
                      <a href={`/${user1.displayName}/${user1.uid}`}>
                        <Avatar className="suggestedPhoto" src={user1.photoURL} />
                        <h3 className="suggestedName">{user1.displayName}</h3>
                      </a>
                    </div>
                  ))
                )
              }
              </div>
                </>:<>
                <div className="sideDownSign">
                <div className="btn">
                  <p>Sign In!</p>
                </div>
                <p style={ {marginLeft:"16px"}}>to view details</p>
                </div>
                </>
              }
        </div>
          

        <div className="feedposts">
        
      {
            posts.map(({ id, post }) => (
                post.uid !== uid ? (
                    console.log() 
                ) : (
                  <Post key={id} postId={id} username={post.username} 
                    caption={post.caption} photoUrl={post.photoUrl} noLikes={post.noLikes} 
                    postUserId={post.uid} userProfile={post.userProfile} />
                    )
            ))
        }
        </div>
     </div>
   )
}

export default Profile;
