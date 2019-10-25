import React from 'react';
import NotefulContext from '../../NotefulContext';
import PropTypes from 'prop-types';

function AddNote(props){
    return (
        <NotefulContext.Consumer>
            {(value) => (
            <form onSubmit={(e) => props.onAddNote(e)}>
                {props.validateNote}
                <label htmlFor="addNote">New Note Name:</label>
                <input required name="addNote" id="addNote" onChange={(val) => props.updateNote(val.target.value)}></input>
                <label htmlFor="content">Content:</label>
                <input required type="text" name="content" onChange={(val) => props.updateNoteContent(val.target.value)}></input>
                <select required name="folderId" onChange={(val) => props.updateNoteFolder(val.target.value)}>>
                {value.folders.map(folder => <option key={folder.id} value={folder.id} id={folder.id}>{folder.fullName}</option>) }
                </select>
                <button type="submit">Submit</button>
            </form>
            )}
        </NotefulContext.Consumer>
    )
}

export default AddNote;

AddNote.propTypes = {
    onAddNote: PropTypes.func,
    updateNote: PropTypes.func,
    updateNoteContent: PropTypes.func,
    updateNoteFolder: PropTypes.func
}

