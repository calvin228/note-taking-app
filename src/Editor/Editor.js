import React, { Component } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            text: "",
            id: "",
            preview: ""
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.selectedNote.id,
            title: this.props.selectedNote.title,
            text: this.props.selectedNote.text,
            preview: this.props.selectedNote.preview
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedNote !== prevProps.selectedNote) {
            this.setState({
                id: this.props.selectedNote.id,
                title: this.props.selectedNote.title,
                text: this.props.selectedNote.text,
                preview: this.props.selectedNote.preview
            })
        }
    }

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        }, () => {
            this.props.updateNote(this.state);
        })
    }

    onChangeText = (value, delta, source, editor) => {
        this.setState({
            text: value,
            preview: editor.getText()
        })
        this.props.updateNote(this.state);
    }

    render() {
        return <div className="editor-container w-full h-full">
            <input type="text" onChange={this.onChangeTitle} value={this.state.title} className="input-title outline-none w-full text-3xl px-3" placeholder="Title" />
            <ReactQuill onChange={this.onChangeText} value={this.state.text || ''} />
        </div>
    }

}

export default Editor;