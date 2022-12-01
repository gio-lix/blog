import React, {FC, memo, useEffect, useState} from 'react';
import s from "./BaseComponent.module.scss"
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {noteActions, RootState, useThunkDispatch} from "../../redux/store";
import NoteDialog from "../notes/noteDialog";
import {exitNoteDialog} from "../../redux/action/action-creator";
import {NoteType} from "../../types/types";
import SaveNote from "../notes/saveNote";
import {useLocation} from "react-router-dom";

interface Props {
    activePage: string,
    pageTitle: { main: string, optional?: string },
    notesUnavailableClass?: string,
    notesUnavailableInfo: string,
    notesUnavailableIcon: any,
    // notes: NoteType[]
    notes: any
}

const BaseComponent: FC<Props> = ({
                                      notes,
                                      notesUnavailableClass,
                                      notesUnavailableIcon,
                                      notesUnavailableInfo,
                                      pageTitle,
                                      activePage
                                  }) => {
    const dispatch = useDispatch()
    const thunkDispatch = useThunkDispatch();
    const {isNoteDialogVisible, noteTheme} = useSelector((state: RootState) => state)

    const [notesUnavailable, setNotesUnavailable] = useState(true);
    const [overlayClasses, setOverlayClasses] = useState("");
    // const [deleteConfirmVisible, setDeleteConfirmVisibility] = useState(false);
    // const [deleteAmount, setDeleteAmount] = useState("");


    const closeNoteDialog = () => {
        thunkDispatch(exitNoteDialog(activePage))
    }
    const showNoteDialog = ( ) => {
        dispatch(noteActions.noteDialogIsVisible(true));
    }

    const showDeleteConfirm = (value: boolean) => {
        // setDeleteConfirmVisibility(value);
    }
    const syncDeleteAmount = (value: string) => {
        // setDeleteAmount(value);
    }

    useEffect(() => {
        if (notes.length > 0) {
            setNotesUnavailable(false);
        } else {
            setNotesUnavailable(true);
        }
    }, [notes.length]);


    useEffect(() => {
        if (isNoteDialogVisible) {
            setOverlayClasses("overlay-visible");
        } else {
            setOverlayClasses("");
        }
    }, [isNoteDialogVisible]);


    return (
        <div style={{minHeight: "100vh"}}>
            <div className={clsx("overlay", overlayClasses)} onClick={closeNoteDialog}/>
            <div className={clsx("background_blur")}/>
            <NoteDialog
                activePage={activePage}
                onShowDeleteConfirm={showDeleteConfirm}
                onSyncDeleteAmount={syncDeleteAmount}
            />

            {!notesUnavailable && (
                <div className={s.notes}>
                    {notes.map((note: NoteType) => (
                        <SaveNote
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            text={note.text}
                            images={note.images}
                            theme={note.theme}
                            font={note.font}
                            isFavourite={note.isFavourite}
                        />
                    ))}
                </div>
            )}

            {notesUnavailable && (
                <div className={s.notes_unavailable}>
                   <span className={notesUnavailableClass}>
                        {activePage === "home" && (
                            <h2 onClick={showNoteDialog}>
                                {notesUnavailableIcon}
                                add !?
                            </h2>
                        )}
                   </span>
                </div>
            )}

        </div>
    );
};

export default memo(BaseComponent);