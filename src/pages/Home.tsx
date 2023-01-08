import {RootState} from "../redux/store";

import NotesIcon from "../assets/icons/NotesIcon";
import BaseComponent from "../components/baseComponent/BaseComponent";

import {useSelector} from "react-redux";

const HomePage = () => {
    const notes = useSelector((state: RootState) => state.savedNotes);
    const pageTitle = {main: "Nightly", optional: "Notes"};
    const notesUnavailableInfo = "Anything to add?";
    const notesUnavailableIcon = <NotesIcon/>;

    return (
        <>
            <BaseComponent
                notes={notes}
                activePage="home"
                pageTitle={pageTitle}
                notesUnavailableInfo={notesUnavailableInfo}
                notesUnavailableIcon={notesUnavailableIcon}
            />
        </>
    );
};

export default HomePage;