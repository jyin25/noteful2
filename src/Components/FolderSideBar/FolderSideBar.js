import React from 'react';
import Folder from '../Folder/Folder';
import './FolderSideBar.css';
import NotefulContext from '../../NotefulContext';
import { Link } from 'react-router-dom';

function FolderSideBar(props){
    return(
        <NotefulContext.Consumer>
            {(value) => (
                <div className="folder-sidebar">
                {value.folders.map(folder => < Folder key={folder.id} id={folder.id} name={folder.fullName}/>)}
                <Link to="/addFolder"><button className="add-folder">Add Folder</button></Link>
            </div>)}
         </NotefulContext.Consumer>
    )
}

export default FolderSideBar;