import React, {useLayoutEffect, useState} from 'react';
import clsx from "clsx";

import styles from "./SaveNote.module.scss"

import {NoteType} from "../../../types/types";

import {useThunkDispatch} from "../../../redux/store";
import {editNote} from "../../../redux/action/action-creator";

const SaveNote = ({images, id, isFavourite, text, theme, title, font}: NoteType) => {
    const [imageColumns, setImageColumns] = useState({columns: ""});
    const thunkDispatch = useThunkDispatch();

    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useLayoutEffect(() => {
        if (images.length > 1) {
            setImageColumns({columns: "2"});
        } else {
            setImageColumns({columns: "1"});
        }
    }, [images]);


    const editNoteContent = () => {
        thunkDispatch(editNote({
            id: id,
            title: title,
            text: text,
            images: images,
            theme: theme,
            font: font,
            isFavourite: isFavourite
        }));
    }
    const handleButton = (t: string) => {
        switch (t) {
            case "left":
                if (currentIndex > 0)
                    setCurrentIndex(prev => prev - 1)
                return
            case "right":
                if (currentIndex < images.length - 1)
                    setCurrentIndex(prev => prev + 1)
                return;
            default:
                return;
        }
    }


    return (
        <div className={styles.note} onClick={editNoteContent}>
            {title && (<h3 className="title">{title}</h3>)}
            <div className={styles.title_box}>
                <p data-descripton={text}>
                    {text}
                </p>
            </div>
            {images.length > 0 && (
                <div
                    className={clsx(styles.note_box, images.length > 1 && styles.shadow)}>
                    <div className={styles.note_image_box}
                         style={{
                             width: `calc(100% * ${images.length})`,
                             marginLeft: `calc(${currentIndex} * -100%)`
                         }}>
                        {images.map((image) => (
                            <figure key={image}>
                                <img key={image} src={image} alt="image"/>
                            </figure>
                        ))}
                        {images.length > 1 && (
                            <div className={styles.button_box}>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleButton("left")
                                }}>
                                    <i className="material-icons">
                                        arrow_left
                                    </i>
                                </button>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleButton("right")
                                }}>
                                    <i className="material-icons">
                                        arrow_right
                                    </i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SaveNote;