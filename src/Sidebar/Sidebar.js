import React from "react";
import SidebarItem from "./SidebarItem";
import { CSSTransitionGroup } from "react-transition-group";

function Sidebar(props) {
    return <div className="sidebar-container ">
        <div className="sidebar-header">
            <h1 className="font-bold text-2xl">All Notes</h1>
            <button onClick={props.toggleModal} className="text-sm hover:border-green-600 btn-primary px-2 py-1">Add New Note</button>
        </div>
        <div className="notes-list">
            <CSSTransitionGroup
                transitionName="move"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {props.noteLists.map(note => {
                    return <SidebarItem selectedNoteId={props.selectedNoteId} deleteNote={props.deleteNote} selectNote={props.selectNote} id={note.id} key={note.id} note={note} />
                })}
            </CSSTransitionGroup>

        </div>
    </div>
}

export default Sidebar;