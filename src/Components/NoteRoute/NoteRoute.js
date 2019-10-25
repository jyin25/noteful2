import React from 'react';
import BackButtonSideBar from '../BackButtonSideBar/BackButtonSideBar';
import './NoteRoute.css'
import Note from '../Note/Note';
import NotefulContext from '../../NotefulContext';
import PropTypes from 'prop-types';


function findNote(id, notes){
    let note = notes.find(note => `${note.id}` === id)
    return note;
}

function NoteRoute(props){

    return( 
        <NotefulContext.Consumer>  
            {value =>       
        <div>    
            <div className="container">
                < BackButtonSideBar folders={value.folders} currentNote={findNote(props.id, value.notes)} onBackClick={() => props.onBackClick()} />
                <div className="notes-section">
                    < Note key={findNote(props.id, value.notes).id} id={findNote(props.id, value.notes).id} fullName={findNote(props.id, value.notes).fullName} modified={findNote(props.id, value.notes).modified}/>  
                    <p>{findNote(props.id, value.notes).content}</p> 
                </div> 
            </div>
        </div>}
        </NotefulContext.Consumer>
    )
}

export default NoteRoute;

NoteRoute.propTypes = {
    id: PropTypes.string,
    onBackClick: PropTypes.func
}