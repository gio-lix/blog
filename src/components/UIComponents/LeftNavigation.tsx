import React, {useEffect, useState} from 'react';

import clsx from "clsx"

import styles from "./Leftnavigation.module.scss"

import {noteActions, RootState} from "../../redux/store";

import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const LeftNavigation = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {savedNotes} = useSelector((state: RootState) => state)

    const [focusedPage, setFocusedPage] = useState<string>("focus-home");
    const [deleteConfirmVisible, setDeleteConfirmVisibility] = useState<boolean>(false);
    const [deleteAmount, setDeleteAmount] = useState<string>("");
    const switchPageHandler = (page: string) => {
        navigate(`/${page}`);
    }

    useEffect(() => {
        setFocusedPage(`focus-${pathname.slice(1)}`)
    }, [pathname])
    const showDeleteConfirm = (value: boolean) => {
        setDeleteConfirmVisibility(value);
    }
    const syncDeleteAmount = (value: string) => {
        setDeleteAmount(value);
    }
    const showNoteDialog = () => {
        dispatch(noteActions.noteDialogIsVisible(true));
    }


    const buttonAction = () => {
        dispatch(noteActions.noteIsNew(true));
        dispatch(noteActions.noteDialogIsVisible(true));
    }
    return (
        <div className={clsx(styles.navigation)}>
            <div className={styles.nav}>
                <div className={clsx(styles.navigation_buttons,focusedPage)}>
                    <button onClick={() => switchPageHandler("")}>
                        <i className="material-icons">home</i>
                    </button>
                    <button onClick={() => switchPageHandler("favourites")}>
                        <i className="material-icons">favorite_border</i>
                    </button>
                    <button onClick={() => switchPageHandler("trash")}>
                        <i className="material-icons">delete_outline</i>
                    </button>
                </div>
                <div className={styles.add_box}>
                    {savedNotes.length > 0 && (
                        <button onClick={buttonAction} className={`comical-shadow-clickable `}>
                            <span>
                                <i className="material-icons">
                                  add
                                </i>
                                new note
                            </span>
                            <span></span>
                            <span></span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftNavigation;