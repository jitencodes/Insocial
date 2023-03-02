import React, { useEffect, useContext, useState } from 'react'
import SignInBtn from './SignInBtn'
import { Link, useHistory } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import { auth, db } from './firebase';
import { useSelector } from "react-redux";
import "./Navbar.css"
import { UserContext } from './User';
function Navbar() {

    const [user , setUser] = useContext(UserContext).user;
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const logout = () => {
        if (user) {
          auth.signOut();
        }
      }

      

      const collapseNavbar = () => {
        document.getElementsByClassName('searchBackIcon')[0].style.display = 'none';
        document.getElementsByClassName('searchBox')[0].style.display = 'none';
        document.getElementsByClassName('searchicon')[0].style.display = 'block';
        // document.getElementsByClassName('dropdown-content3')[0].style.display = 'none';
        document.getElementsByClassName('searchBox')[0].value = ""
      }
    
      const expandNavbar = () => {
        document.getElementsByClassName('searchBackIcon')[0].style.display = 'block';
        document.getElementsByClassName('searchBox')[0].style.display = 'block';
        document.getElementsByClassName('searchicon')[0].style.display = 'none';
      }
      useEffect(() => {
        db.collection('users').onSnapshot((snapshot) => {
          setUsers(snapshot.docs.map((doc) => doc.data()))
        })
    
        if (users !== undefined) {
          const finalUsers = users.filter(user => {
            return user.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          })
    
          setFilteredUsers(finalUsers)
        }
      }, [searchTerm])

      const updateSearchResults = (e) => {
        setSearchTerm(e.target.value)
        // document.getElementsByClassName('dropdown-content3')[0].style.display = 'block';
      }


    return (
        <div className="navbar">
            <div className="navinside">
                <h2>Insocial</h2>
                
                {/* <div class="dropdown-content3">
                        <ul id="list">
                            {
                            users !== undefined && (
                                filteredUsers.map((user1) => (
                                <li>
                                    <a onClick={collapseNavbar} href={`/${user1.displayName}/${user1.uid}`}>
                                    <Avatar className="searchAvatar" src={user1.photoURL} />
                                    <h3 className="searchH3">{user1.displayName}</h3>
                                    </a>
                                </li>
                                ))
                            )
                            }
                        </ul>
                        </div> */}
                <div className="navRight">
                    <div className="inputcontainer">
                        <div className="searchContainer">
                        <i class="searchBackIcon" onClick={collapseNavbar} />
                        <input type="text" className="searchBox" placeholder="Search insocial" onChange={updateSearchResults} />
                        </div>
                    
                        </div>
                        <i class="searchicon" onClick={expandNavbar} />
                        <Link to="/">
                            <i class="Homeicon" />
                        </Link>
                        <Link to={`/${user?.displayName}/${user?.uid}`}>
                        <i class="profileicon" />                        
                        </Link>
                        <div className="login">
                            {user ?  
                            <>
                                
                                <div className="logout" onClick={logout}>
                                    <p>Logout</p>
                                </div>
                            </> : 
                                
                            <SignInBtn/> 
                            }
                        </div>
                        
                </div>
            </div>
        </div>
    )
}

export default Navbar
