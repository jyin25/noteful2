import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home'
import FolderRoute from './Components/FolderRoute/FolderRoute';
import NoteRoute from './Components/NoteRoute/NoteRoute';
import NotefulContext from './NotefulContext'
import AddFolder from './Components/AddFolder/AddFolder';
import AddNote from './Components/AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary/ErrorBoundry';


class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    noteToAdd: {
      value: "",
      touched: false,
      content: "",
      folderId: "1",
    },
    folderToAdd: {
      value: "",
      touched: false
    },
  }

  componentWillMount(){
    fetch(`https://tranquil-castle-10467.herokuapp.com/api/folders`)
    .then(response => response.json())
    .then(folders => this.setState({folders}))

    fetch(`https://tranquil-castle-10467.herokuapp.com/api/notes`)
    .then(response => response.json())
    .then(notes => this.setState({notes}))
  }

  deleteNote = (noteId) => {
    fetch(`https://tranquil-castle-10467.herokuapp.com/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
    'content-type': 'application/json'
    },
  })
    let newNotes = this.state.notes.filter(note => note.id !== noteId)

    this.setState({notes: newNotes})
  }

  updateFolder = (name) => {
    this.setState({ folderToAdd: { value: name, touched: true } })
  }

  onAddFolder = (e) => {
    e.preventDefault();
    let r = Math.random().toString(36).substring(7);
    const opts = {id: r, fullName: this.state.folderToAdd.value}
    
    try{
    fetch('https://tranquil-castle-10467.herokuapp.com/api/folders', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(opts)
    }).then(() =>
    
    fetch(`https://tranquil-castle-10467.herokuapp.com/api/folders`)
    .then(response => response.json())
    .then(folders => this.setState({folders}))
    .then(() => console.log(this.state)))
    }catch(error){
      console.error(error)
    }

    this.props.history.push('/');
  }

  updateNote = (name) => {
    let newNote = this.state.noteToAdd;
    newNote.value = name;
    newNote.touched = true;
    this.setState({ noteToAdd: newNote})
  }

  updateNoteFolder = (id) => {
    let newNote = this.state.noteToAdd;
    newNote.folderId = id;
    this.setState({ noteToAdd: newNote})
  }

  updateNoteContent = (content) => {
    let newNote = this.state.noteToAdd;
    newNote.content = content;
    this.setState({ noteToAdd: newNote})
  }

  validateNote(){
    if(this.state.noteToAdd.touched && this.state.noteToAdd.value < 1){
      return 'Name must not be left empty'
    }
    return <></>
  }

  validateFolder(){
    if(this.state.folderToAdd.touched && this.state.folderToAdd.value < 1){
      return 'Name must not be left empty'
    }
    return <></>
  }

  onAddNote = (e) => {
    e.preventDefault();
    let note = this.state.noteToAdd
    const opts = {fullName: note.value, folder_id: note.folderId, content: note.content}
    
    try{
      fetch('https://tranquil-castle-10467.herokuapp.com/api/notes', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(opts)
      }).then(() =>
      
      fetch(`https://tranquil-castle-10467.herokuapp.com/api/notes`)
      .then(response => response.json())
      .then(notes => this.setState({notes})))

    } catch(error) {
      console.error(error)
    }
    
    this.props.history.push('/');
  }

  render(){
    return (
      <NotefulContext.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes, 
        deleteNote: this.deleteNote,
        }}>
      <div>
        < Header />
        <ErrorBoundary>
        < Switch >
          < Route path="/" exact render={() => < Home notes={this.state.notes}/>} />
          < Route path="/folder/:id" exact render={(props) => < FolderRoute id={props.match.params.id}/>} />
          < Route path="/notes/:id" render={(props) => < NoteRoute onBackClick={() => props.history.goBack()} id={props.match.params.id}/>} />
          < Route path="/addFolder" render={() => <AddFolder onAddFolder={this.onAddFolder} updateFolder={this.updateFolder} validateFolder={this.validateFolder()}/>}/>
          < Route path="/addNote" render={() => <AddNote onAddNote={this.onAddNote} updateNote={this.updateNote} updateNoteFolder={this.updateNoteFolder} updateNoteContent={this.updateNoteContent} validateNote={this.validateNote()}/>}/>
        </Switch>
        </ErrorBoundary>
      </div>
      </NotefulContext.Provider>
    );
  }
}

export default withRouter(App);