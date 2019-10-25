import React from 'react';
import FolderSideBar from '../FolderSideBar/FolderSideBar';
import NoteSection from '../NotesSection/NotesSection';
import './FolderRoute.css'
import NotefulContext from '../../NotefulContext';
import PropTypes from 'prop-types';


function filterNotes(id, notes){
    let filteredNotes = notes.filter(note => `${note.folder_id}` === id)
    return filteredNotes
}

function FolderRoute(props){
    return(     
        <NotefulContext.Consumer> 
            {value =>   
        <div>    
            <div className="container">
                < FolderSideBar/>
                < NoteSection notes={filterNotes(props.id, value.notes)} />
            </div>
        </div>  }
        </NotefulContext.Consumer>
    )
}

export default FolderRoute;

FolderRoute.propTypes = {
    id: PropTypes.string
}