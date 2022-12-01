import React, {FC, useEffect, useRef, useState} from 'react';
import s from "./NoteOption.module.scss"
import {ElementsVisible} from "../../../types/types";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {noteActions, RootState, useThunkDispatch} from "../../../redux/store";
import {moveToTrash} from "../../../redux/action/action-creator";
import FontSelect from "../../UIComponents/fontSelector";
import ThemePalette from "../../UIComponents/themePalette";

interface Props {
    activePage: string,
    elementsVisible: ElementsVisible
    onShowDeleteConfirm: (value: boolean) => void,
    onSyncDeleteAmount: (value: string) => void,
    onUpdateElementsVisibility: (value: ElementsVisible) => void
}

const NoteOptions: FC<Props> = ({
                                    elementsVisible,
                                    onUpdateElementsVisibility,
                                    onShowDeleteConfirm,
                                    onSyncDeleteAmount,
                                    activePage
                                }) => {
    const {noteText} = useSelector((state: RootState) => state);
    const [rotate, setRotate] = useState(false)
    const dispatch = useDispatch()
    const thunkDispatch = useThunkDispatch();

    const handleToggleFontSelect = () => {
        onUpdateElementsVisibility({
            fontSelect: !elementsVisible.fontSelect,
            themePalette: false
        });
        setRotate(prev => !prev)
    }

    const handleTogglePalette = () => {

        // onUpdateElementsVisibility({
        //     fontSelect: false,
        //     themePalette: !elementsVisible.themePalette
        // });
    }

    const handleChangeFile = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const image = URL.createObjectURL(e.target.files[0])
        dispatch(noteActions.addNoteImages(image))
    }

    const handleTrashNote = () => {
        thunkDispatch(moveToTrash());
    }

    return (
        <div className={s.option}>
            {activePage !== "trash" && (
                <div className={s.option_box} >
                    {/*<span className={clsx(s.font_select)} onClick={handleToggleFontSelect}>*/}
                    {/*    Font Family*/}
                    {/*    <i className={clsx("material-icons", rotate && s.rotate_icon)}>expand_more</i>*/}
                    {/*</span>*/}
                    <label htmlFor="file">
                        <i className="material-icons">image</i>
                        <input
                            onChange={handleChangeFile}
                            type="file"
                            accept="image/*"
                            name="file"
                            id="file"
                            hidden
                        />
                    </label>
                    {/*<button onClick={handleTogglePalette}>*/}
                    {/*    <i className="material-icons">border_style</i>*/}
                    {/*</button>*/}
                    <button
                        onClick={handleTrashNote} title="Delete"
                        disabled={!noteText.trim().length}
                    >
                        <i
                            style={{color: noteText.trim().length > 0 ? 'white' : 'gray'}}
                            className="material-icons">delete</i>
                    </button>
                </div>
            )}
            {elementsVisible.fontSelect && <FontSelect />}
            {elementsVisible.themePalette && <ThemePalette />}
        </div>
    );
};

export default NoteOptions;