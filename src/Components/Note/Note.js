import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import NotefulContext from '../../NotefulContext';
import PropTypes from 'prop-types';

function Note(props){
    return(      
        <NotefulContext.Consumer>
            {value => 
        
        <div className="note">  
            <Link to={`/notes/${props.id}`}>
            <h2>{props.fullName}</h2> 
            </Link>
            <div className="date-delete-flex">
                <p className="date">Date Modified: {props.modified}</p>
                <Link to={'/'}>
                <button className="delete" onClick={() => value.deleteNote(props.id)}>Delete</button>
                </Link>
            </div>
        </div>  
        }
        </NotefulContext.Consumer>
    )
}

export default Note;

Note.propTypes = {
    id: PropTypes.number,
    fullName: PropTypes.string,
    modified: PropTypes.string
}
