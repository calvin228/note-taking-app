import React, { Component } from 'react';
import Sidebar from "./Sidebar/Sidebar";
import Modal from './Modal/Modal';
import Editor from './Editor/Editor';
import NoteIcon from './add_note.png';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nextId: 1, // Since we're not connect to database, we do auto-increment manually
      selectedNoteId: null,
      selectedNote: {},
      modalActive: false,
      noteLists: []
    }
  }

  addNote = (noteTitle) => {
    const note = {
      id: this.state.nextId,
      title: noteTitle,
      text: "",
      preview: ""
    }
    this.setState((prevState) => ({
      nextId: ++prevState.nextId,
      noteLists: [...this.state.noteLists, note]
    })
    )
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  selectNote = (id, note) => {
    this.setState({
      selectedNoteId: id,
      selectedNote: {
        id: note.id,
        title: note.title,
        text: note.text,
        preview: note.preview
      }
    })
  }

  updateNote = ({ id, title, text, preview }) => {
    const noteIndex = this.state.noteLists.findIndex(note => note.id === id);
    const newNoteArr = [...this.state.noteLists]
    newNoteArr.splice(noteIndex, 1, { id: id, title: title, text: text, preview: preview })

    this.setState({
      noteLists: newNoteArr
    })
  }

  deleteNote = (id) => {
    const noteIndex = this.state.noteLists.findIndex(note => note.id === id);

    if (this.state.selectedNoteId === id) {
      this.setState({
        selectedNoteId: null,
        selectedNote: null
      })
    }

    const newNoteArr = [...this.state.noteLists]
    newNoteArr.splice(noteIndex, 1);

    this.setState({
      noteLists: newNoteArr
    })
  }
  render() {
    return (
      <div className="App h-screen overflow-hidden flex">
        <Sidebar selectedNoteId={this.state.selectedNoteId} deleteNote={this.deleteNote} selectNote={this.selectNote} noteLists={this.state.noteLists} toggleModal={this.toggleModal} />
        <Modal newId={this.state.nextId} active={this.state.modalActive} toggleModal={this.toggleModal} addNote={this.addNote} />
        {this.state.selectedNoteId ? <Editor updateNote={this.updateNote} selectedNote={this.state.selectedNote} /> : (
          <div className="empty-note flex justify-center flex-col items-center m-auto">
            <img src={NoteIcon} alt="add note" className="w-24 h-24 opacity-50 select-none" draggable="false" />
            <p className="text-center text-gray-500 select-none">Click "Add New Note" on top sidebar to create your note</p>
          </div>
        )}

      </div>
    );
  }

}

export default App;
