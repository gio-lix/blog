import React from 'react';

import clsx from "clsx";

import {useDispatch, useSelector} from "react-redux";

import styles from "./ThemePalette.module.scss"

import {noteActions, RootState} from "../../../redux/store";

const ThemePalette = () => {

    const solidColourList: string[] = ["dark", "pink", "orange", "green", "purple", "brown", "gray"];
    const gradientColourList: string[] = ["greenery", "sublime-vivid", "dimigo", "reef", "light-purple", "witching-hour", "titanium"];

    const dispatch = useDispatch();
    const activeTheme = useSelector((state: RootState) => state.noteTheme.colour);

    const themeChange = (colour: string, isGradient: boolean) => {
        dispatch(noteActions.setNoteTheme({
            colour: colour,
            isGradient: isGradient
        }));
    }

    return (
        <div className={styles.palette_container}>
            <div className={clsx(styles.palette)}>
               <div className={styles.solid_colours}>
                   <b>Solid</b>
                   <div>
                       {solidColourList.map((solidColour) => {
                           return (
                               <button key={solidColour}
                                       style={{
                                           backgroundColor:solidColour,
                               }}
                                       onClick={() => themeChange(solidColour, false)}
                               >
                               </button>
                           )
                       })}
                   </div>
               </div>
            </div>
            <div className={clsx(styles.palette)}>
                <div className={styles.solid_colours}>
                    <b>Solid</b>
                    <div>
                        {solidColourList.map((solidColour) => (
                            <button key={solidColour}
                                    style={{background: `linear-gradient(red,${solidColour})`}}
                                    onClick={(e) => themeChange(solidColour, true)}
                            >
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemePalette;