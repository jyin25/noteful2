import React from 'react';
import './BackButtonSideBar.css';
import NotefulContext from '../../NotefulContext';
import PropTypes from 'prop-types';

function filterFolder(id, folders){
    let folder = folders.find(folder => folder.id === id)
    return folder.fullName;
}

function BackButtonSideBar(props){
    return(     
        <NotefulContext.Consumer>   
            {value => 
        <div className="folder-sidebar">
                <button className="back-button" onClick={() => props.onBackClick()}>Go Back</button>
                <h3>{filterFolder(props.currentNote.folder_id, value.folders) }</h3>
        </div>}
        </NotefulContext.Consumer>  
    )
}

export default BackButtonSideBar;

BackButtonSideBar.propTypes = {
    onBackClick: PropTypes.func,
    currentNote: PropTypes.object
}