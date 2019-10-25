import React from 'react';
import PropTypes from 'prop-types';

function AddFolder(props){
    return (
        <form onSubmit={(e) => props.onAddFolder(e)}>
            {props.validateFolder}
            <label htmlFor="addFolder">Add Folder:</label>
            <input required name="add-folder" id="add-folder" onChange={(val) => props.updateFolder(val.target.value)}></input>
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddFolder;

AddFolder.propTypes = {
    onAddFolder: PropTypes.func,
    updateFolder: PropTypes.func
}