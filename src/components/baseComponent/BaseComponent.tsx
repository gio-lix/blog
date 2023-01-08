import {FC, useEffect, useState} from 'react';
import clsx from "clsx";

import styles from "./BaseComponent.module.scss"

import {useDispatch, useSelector} from "react-redux";
import {noteActions, RootState, useThunkDispatch} from "../../redux/store";
import NoteDialog from "../notes/noteDialog";

import {NoteType} from "../../types/types";

import {exitNoteDialog} from "../../redux/action/action-creator";
import SaveNote from "../notes/saveNote";

interface Props {
    activePage: string,
    pageTitle: { main: string, optional?: string },
    notesUnavailableClass?: string,
    notesUnavailableInfo: string,
    notesUnavailableIcon: any,
    notes: any
}

const BaseComponent: FC<Props> = ({
                                      notes,
                                      notesUnavailableClass,
                                      notesUnavailableIcon,
                                      activePage
                                  }) => {
    const dispatch = useDispatch()
    const thunkDispatch = useThunkDispatch();
    const {isNoteDialogVisible} = useSelector((state: RootState) => state)
    const [notesUnavailable, setNotesUnavailable] = useState<boolean>(true);
    const [overlayClasses, setOverlayClasses] = useState<string>("");


    const closeNoteDialog = () => {
        thunkDispatch(exitNoteDialog(activePage))
    }
    const showNoteDialog = () => {
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
        <div>
            <div
                className={clsx("overlay", overlayClasses)}
                onClick={(e) => {
                    e.stopPropagation();
                    closeNoteDialog()
                }}
            />
            <div className={clsx("background_blur")}/>
            <NoteDialog
                activePage={activePage}
                onShowDeleteConfirm={showDeleteConfirm}
                onSyncDeleteAmount={syncDeleteAmount}
            />

            {!notesUnavailable && (
                <div className={styles.notes}>
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
                <div className={styles.notes_unavailable}>
                   <span className={notesUnavailableClass}>
                        {activePage === "home" && (
                            <h2
                                onClick={showNoteDialog}>
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

export default BaseComponent;