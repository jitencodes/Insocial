import React from 'react'

function Comment({ username, caption}) {
    return (
        <div className="comment">
             <p>
              <span style={{fontWeight: "bold", marginRight:"8px"}} >{username}</span>
              {caption}
            </p>
        </div>
    )
}

export default Comment 