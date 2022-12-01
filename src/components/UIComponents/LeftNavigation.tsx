import React, {useEffect, useState} from 'react';
import s from "./Leftnavigation.module.scss"
import clsx from "clsx"
import {useLocation, useNavigate} from "react-router-dom";
import {noteActions, RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";

const LeftNavigation = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {savedNotes} = useSelector((state: RootState) => state)
    const [focusedPage, setFocusedPage] = useState("focus-home");
    const [deleteConfirmVisible, setDeleteConfirmVisibility] = useState(false);
    const [deleteAmount, setDeleteAmount] = useState("");
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
    return (
        <div className={clsx(s.navigation)}>
            <div className={clsx(s.navigation_buttons, focusedPage)}>
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
            <div className={s.add_box}>
                {savedNotes.length > 0 && (
                    <h2 onClick={showNoteDialog}>
                        <i className="material-icons">
                            description
                        </i>
                        <span>
                            add more
                        </span>
                    </h2>
                )}
            </div>
        </div>
    );
};

export default LeftNavigation;