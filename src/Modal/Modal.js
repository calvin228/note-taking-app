import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Modal extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            error: ""
        }
    }

    validateSubmit = (fn) => {
        if(this.state.title === "") {
            this.setState({
                error: "Field is empty!"
            })
        } else {
            this.setState({
                error: "",
                title: ""
            })
            fn(this.state.title);
        }
    }

    onChangeField = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleKeyEnter = (e) => {
        if (e.key === "Enter"){
            this.props.addNote(this.state.title)
        }
    }

    render() {
        const { active, toggleModal, addNote } = this.props;
        return active ? (<div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <p className="font-bold">Type your title</p>
                    <FontAwesomeIcon icon="times" className="cursor-pointer" onClick={toggleModal} />
                </div>
                <div className="modal-body p-2">
                    <input type='text' onKeyPress={this.handleKeyEnter} onChange={this.onChangeField} className="border border-gray-400 mt-2 w-full rounded p-1" />
                    <p className="text-red-600 text-xs">{this.state.error}</p>
                    <button type="button" onClick={() => this.validateSubmit(addNote)} className="hover:border-green-800 btn-primary mt-3 w-full px-2 py-1">Submit Title</button>
                </div>
            </div>
        </div>) : ""
    }

}

export default Modal;