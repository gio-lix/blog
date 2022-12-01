import React, {FC, useEffect, useState} from 'react';
import s from "./NoteDialog.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {noteActions, RootState, useThunkDispatch} from "../../../redux/store";
import clsx from "clsx";
import {exitNoteDialog} from "../../../redux/action/action-creator";
import NoteContent from "../noteContent";
import {ElementsVisible} from "../../../types/types";
import NoteOptions from "../noteOption";

interface Props {
    activePage: string,
    onShowDeleteConfirm: (value: boolean) => void,
    onSyncDeleteAmount: (value: string) => void
}

const NoteDialog: FC<Props> = ({onShowDeleteConfirm, onSyncDeleteAmount, activePage}) => {
    const dispatch = useDispatch();
    const thunkDispatch = useThunkDispatch();

    const {isNoteDialogVisible,noteTheme,noteFont} = useSelector((state: RootState) => state);
    const [noteDialogClasses, setNoteDialogClasses] = useState("");

    const [elementsVisible, setElementsVisible] = useState({
        fontSelect: false,
        themePalette: false
    });

    const updateElementsVisibility = (visibility: ElementsVisible) => {
        setElementsVisible({
            fontSelect: visibility.fontSelect,
            themePalette: visibility.themePalette
        });
    }
    const hideFontAndPalette = () => {
        setElementsVisible({
            fontSelect: false,
            themePalette: false
        });
    }
    const toggleFavourite = (e: React.MouseEvent) => {
        dispatch(noteActions.setNoteFavourite());
    }
    const handleCloseDialog = () => {
        thunkDispatch(exitNoteDialog(activePage))
    }

    const handleShowDeleteConfirm = (value: boolean) => {
        onShowDeleteConfirm(value);
    }
    const handleSyncDeleteAmount = (value: string) => {
        onSyncDeleteAmount(value);
    }

    useEffect(() => {
        const themeClasses: string = `${noteTheme.colour} ${noteFont}`;
        if (isNoteDialogVisible) {
            setNoteDialogClasses(`note-visible ${themeClasses}`);
        } else {
            setNoteDialogClasses("");
        }
    }, [isNoteDialogVisible,noteTheme.colour, noteFont]);


    return (
        <form
            style={{
                backgroundColor:`${noteTheme.colour}`,
                boxShadow: `10px 10px 20px -8px ${noteTheme.colour}`
        }}
            className={clsx(s.note, noteDialogClasses)}>
            <div className={s.note_button_box}>
                <button onClick={handleCloseDialog}>
                    <i className="material-icons">arrow_back</i>
                </button>
                <button onClick={toggleFavourite}>
                    <i className="material-icons">favorite</i>
                </button>
            </div>

            <div className={s.note_content_container}>
                <NoteContent
                    activePage={activePage}
                    onHideFontAndPalette={hideFontAndPalette}
                />
            </div>

            <NoteOptions
                activePage={activePage}
                elementsVisible={elementsVisible}
                onShowDeleteConfirm={handleShowDeleteConfirm}
                onSyncDeleteAmount={handleSyncDeleteAmount}
                onUpdateElementsVisibility={updateElementsVisibility}
            />
        </form>
    );
};

export default NoteDialog;