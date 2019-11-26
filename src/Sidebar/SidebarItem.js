import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { CSSTransition } from "react-transition-group";

function truncate(text) {
    return text.length > 30 ? text.substring(0, 30) + "..." : text;
}

function SidebarItem(props) {
    return (
            <div className={`notes-list-item hover:bg-gray-400 ${props.selectedNoteId === props.id ? `note-active` : ""}`} >
                <div className="notes-item-content cursor-pointer text-left" onClick={() => props.selectNote(props.id, props.note)}>
                    <h2 className="font-bold text-lg">{props.note.title}</h2>
                    <p className="text-xs text-gray-500">{truncate(props.note.preview)}</p>
                </div>
                <div className="notes-item-trash" onClick={() => props.deleteNote(props.id)}>
                    <FontAwesomeIcon icon="trash" className="hover:text-red-500 cursor-pointer" />
                </div>
            </div>
    )
}

export default SidebarItem;