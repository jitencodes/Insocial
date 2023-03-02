import React, { useState, useEffect, useContext } from 'react';
import Post from './Post.jsx';
import "./Feed.css";
import {db} from "./firebase";
import { UserContext } from './User';
import CreatePost from './CreatePost';
import Avatar from "@material-ui/core/Avatar";
import dPhoto from './insocial/default_profile.png';

function Feed() {
  document.title = 'InSocial';
  const [user, setUser] = useContext(UserContext).user;
  const [posts, setPosts] = useState([]);
  const [suggestedUser, setSuggestedUser] = useState([]);
  
  //heart toggle animation
  const [isActive, setActive] = useState(false);

 

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

  return (
    <div className="feed">
        <div className="sideProfile">
          <div className="sideUp">
            <div className="sideImg">
              <img className='img'
                src={
                user?(user.photoURL):(dPhoto)
              } alt=""/>
                {
                  user? <>
                    <div className="names">
                    <h1>{user?.displayName}</h1>
                    <h2>This is Your Profile</h2>
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
                  <CreatePost />

          {
            posts.map(({ id, post }) =>{
              return (
                <Post key={id} postId={id} username={post.username} 
                caption={post.caption} photoUrl={post.photoUrl} noLikes={post.noLikes} 
                postUserId={post.uid} userProfile={post.userProfile} />
              )
            })
          }
        </div>
     </div>
   )
}

export default Feed;
