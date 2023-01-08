import React, {FC, memo, useEffect, useRef, useState} from 'react';
import styles from "./NoteContent.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {noteActions, RootState} from "../../../redux/store";

interface ISizes {
    height: string,
    columns: string
}

interface Props {
    activePage: string,
    onHideFontAndPalette: () => void
}

const NoteContent: FC<Props> = ({activePage}) => {
    const dispatch = useDispatch()
    const {noteTitle, noteText, noteImages} = useSelector((state: RootState) => state)

    const noteAreaRef = useRef<HTMLTextAreaElement>(null)
    const [imageSizes, setImageSize] = useState<ISizes>({
        height: "",
        columns: ""
    })


    const syncNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(noteActions.setNoteTitle(e.target.value));
    }

    const syncNoteText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(noteActions.setNoteText(e.target.value));
    }
    const handleDelete = (index: number) => {
        dispatch(noteActions.deleteNoteImages(index))
    }

    const enterTextArea = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // if(e.key === "Enter" || e.key === "NumpadEnter") {
        //     e.preventDefault();
        //     noteTextArea.current?.focus();
        // }
    }

    useEffect(() => {
        if (noteImages.length >= 3) {
            setImageSize({
                columns: "repeat(3, 1fr)",
                height: "120px"
            })
        } else if (noteImages.length > 1) {
            setImageSize({
                columns: "repeat(2, 1fr)",
                height: "170px"
            })
        } else {
            setImageSize({
                columns: "1fr",
                height: "300px"
            })
        }
    }, [noteImages.length])

    return (
        <div className={styles.content}>
            <div>
                {noteImages.length > 0 && (
                    <div className={styles.content_image_box} style={{gridTemplateColumns: `${imageSizes.columns}`}}>
                        {noteImages.map((image, index) => (
                            <div key={index}>
                                <img
                                    style={{height: `${imageSizes.height}`}}
                                    src={image}
                                    alt="image"
                                />
                                <button onClick={() => handleDelete(index)}>
                                    <i className="material-icons">
                                        delete
                                    </i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <input
                    onChange={syncNoteTitle}
                    onKeyDown={enterTextArea}
                    type="text"
                    value={noteTitle}
                    placeholder="Title"
                    className={styles.content_title_input}
                    disabled={activePage === "trash"}
                />

                <textarea
                    onChange={syncNoteText}
                    ref={noteAreaRef}
                    value={noteText}
                    placeholder="Your note"
                    className={styles.content_textarea}
                    disabled={activePage === "trash"}>
				</textarea>
            </div>
        </div>
    );
};

export default memo(NoteContent);

