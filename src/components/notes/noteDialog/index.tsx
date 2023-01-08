import React, {FC, memo, useEffect, useState} from 'react';
import clsx from "clsx";

import styles from "./NoteDialog.module.scss"

import {useDispatch, useSelector} from "react-redux";
import {exitNoteDialog} from "../../../redux/action/action-creator";

import {noteActions, RootState, useThunkDispatch} from "../../../redux/store";

import NoteContent from "../noteContent";

import NoteOptions from "../noteOption";

import {ElementsVisible} from "../../../types/types";

interface IVisible {
    fontSelect: boolean,
    themePalette: boolean
}

interface Props {
    activePage: string,
    onShowDeleteConfirm: (value: boolean) => void,
    onSyncDeleteAmount: (value: string) => void
}

const NoteDialog: FC<Props> = ({onShowDeleteConfirm, onSyncDeleteAmount, activePage}) => {
    const dispatch = useDispatch();
    const thunkDispatch = useThunkDispatch();

    const {isNoteDialogVisible,noteIsFavourite,noteTheme,noteFont} = useSelector((state: RootState) => state);
    const [noteDialogClasses, setNoteDialogClasses] = useState<string>("");

    const [elementsVisible, setElementsVisible] = useState<IVisible>({
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
    const toggleFavourite = () => {
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
            className={clsx(styles.note, noteDialogClasses)}>
            <div className={styles.note_button_box}>
                    <i
                        onClick={handleCloseDialog}
                        className="material-icons">
                        arrow_back
                    </i>
                    <i
                        onClick={toggleFavourite}
                        className="material-icons"
                    >
                        {noteIsFavourite ? "favorite" : "favorite_border"}
                    </i>
            </div>

            <div className={styles.note_content_container}>
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

export default memo(NoteDialog);