import React from 'react';
import './NotesSection.css';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NoteSection(props){
    return(      
        <div className="notes-section">
            <Link to="/addNote"><button className="add-note">Add Note</button></Link>
            {props.notes.map(note => < Note key={note.id} id={note.id} fullName={note.fullName} modified={note.modified}/>)}   
        </div>  
    )
}

export default NoteSection;

NoteSection.propTypes = {
    notes: PropTypes.array
};