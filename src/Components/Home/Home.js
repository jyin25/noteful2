import React from 'react';
import FolderSideBar from '../FolderSideBar/FolderSideBar';
import NoteSection from '../NotesSection/NotesSection';
import './Home.css';
import PropTypes from 'prop-types';

function Home(props){
    return(     
        <div>    
            <div className="container">
                < FolderSideBar/>
                < NoteSection notes={props.notes}/>
            </div>
        </div>    
    )
}

export default Home;

Home.propType = {
    notes: PropTypes.number
};