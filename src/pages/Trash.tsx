import {useSelector} from "react-redux";
import BaseComponent from "../components/baseComponent/BaseComponent";

import {RootState} from "../redux/store";

const Trash = () => {
    const notes = useSelector((state: RootState) => state.trashedNotes);
    const pageTitle = {main: "Favourites"};
    const notesUnavailableClass = "inline-description";
    const notesUnavailableInfo = "No favourite notes";
    const notesUnavailableIcon = "";

    return (
        <section className="trash">
            {notes.length === 0 && (
                <div className="favourites">
                    <h2>
                        <span>No Trash</span>
                        <i className="material-icons">
                            delete_outline
                        </i>
                    </h2>
                </div>
            )}
            <BaseComponent
                notes={notes}
                activePage="trash"
                pageTitle={pageTitle}
                notesUnavailableClass={notesUnavailableClass}
                notesUnavailableInfo={notesUnavailableInfo}
                notesUnavailableIcon={notesUnavailableIcon}
            />
        </section>
    );
};

export default Trash;