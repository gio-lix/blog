import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import BaseComponent from "../components/baseComponent/BaseComponent";
import {filterFavourites} from "../redux/helpers/helper-functions";

const Favourites = () => {
    // const notes = useSelector((state: RootState) => state.savedNotes);
    const {savedNotes} = useSelector((state: RootState) => state);
    const pageTitle = {main: "Favourites"};
    const notesUnavailableClass = "inline-description";
    const notesUnavailableInfo = "No favourite notes";
    const notesUnavailableIcon = "";

    const favourites = filterFavourites(savedNotes)
    return (
        <section>
            {favourites.length === 0 && (
                <div className="favourites">
                    <h2>
                        <span>No Favourite</span>
                        <i className="material-icons">
                            favorite_border
                        </i>
                    </h2>
                </div>
            )}
            <BaseComponent
                notes={favourites}
                activePage="favourites"
                pageTitle={pageTitle}
                notesUnavailableClass={notesUnavailableClass}
                notesUnavailableInfo={notesUnavailableInfo}
                notesUnavailableIcon={notesUnavailableIcon}
            />
        </section>
    );
};

export default Favourites;