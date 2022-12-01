import {noteActions, RootState} from "../store";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {NoteType} from "../../types/types";


type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;


export const exitNoteDialog = (page: string): AppThunk =>
    (dispatch, getSate) => {
        if (page !== "trash") {
            if (getSate().isNoteNew) {
                dispatch(noteActions.createOrTrash("create"));
            } else if (!getSate().isNoteNew) {
                dispatch(noteActions.updateNoteContent());
            } else if (!getSate().isNoteNew) {
                dispatch(noteActions.deleteEmptyNote());
            }
        }
        dispatch(noteActions.resetNoteContent());
        dispatch(noteActions.noteDialogIsVisible(false))
    }

export const editNote = (noteContent: NoteType): AppThunk =>
    (dispatch) => {
        dispatch(noteActions.editNoteContent(noteContent));
        dispatch(noteActions.noteDialogIsVisible(true));
        dispatch(noteActions.noteIsNew(false));
    }


export const moveToTrash = (): AppThunk =>
    (dispatch, getState) => {
        if (getState().isNoteNew) {
            dispatch(noteActions.createOrTrash("create"));
        } else {
            dispatch(noteActions.updateNoteContent());
            dispatch(noteActions.trashNote());
        }
        dispatch(noteActions.resetNoteContent());
        dispatch(noteActions.noteDialogIsVisible(false));
    }

export const restoreFromTrash = (): AppThunk =>
    (dispatch) => {
        dispatch(noteActions.restoreNote());
        dispatch(noteActions.resetNoteContent());
        dispatch(noteActions.noteDialogIsVisible(false));

    }


export const deleteFromTrash = (amount: string): AppThunk =>
    (dispatch) => {
        dispatch(noteActions.deleteNotesForever(amount));
        dispatch(noteActions.resetNoteContent());
        dispatch(noteActions.noteDialogIsVisible(false));

    }
