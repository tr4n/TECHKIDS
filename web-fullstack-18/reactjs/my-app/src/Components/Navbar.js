import React from 'react'

export default  function Navbar(props){
    return (
        <div>
            <a className="title" >{props.title} </a>
            <hr/>
            now is {props.time}
        </div>
    );
}