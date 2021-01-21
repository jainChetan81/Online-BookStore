import React, { useState } from "react";
import Auxillary from "../hoc/Auxillary";
import BookCard from "./BookCard/BookCard";
import BookModal from "./BookModal/BookModal";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        backgroundColor: "white",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const BookList = ({
    books,
    addToCart,
    removeFromCart,
    cart,
    history,
    filteredBooks,
    searchString,
}) => {
    const [modalStyle] = React.useState(getModalStyle);
    const [show, showModal] = useState(false);
    const [modal, setModal] = useState(null);
    const classes = useStyles();
    const showModalInfo = (item) => {
        setModal(item);
        showModal(true);
    };
    const closeModal = () => {
        showModal(false);
    };
    return (
        <Auxillary>
            <Modal open={show} onClose={closeModal}>
                <div style={modalStyle} className={classes.paper}>
                    <BookModal
                        removeFromCart={removeFromCart}
                        addToCart={addToCart}
                        cart={cart}
                        activeBook={modal}
                        history={history}
                    />
                </div>
            </Modal>
            <Auxillary>
                <div style={{ margin: "0 95px" }}>
                    {searchString !== "" ? (
                        <Auxillary>
                            <h3 className="text-center">
                                {filteredBooks.length} Search Resullts for:
                                {searchString}
                            </h3>
                            <div className="row">
                                {filteredBooks.map((item) => (
                                    <BookCard
                                        key={item.bookID}
                                        item={item}
                                        showModalInfo={showModalInfo}
                                        addToCart={addToCart}
                                        removeFromCart={removeFromCart}
                                        history={history}
                                    />
                                ))}
                            </div>
                        </Auxillary>
                    ) : (
                        <Auxillary>
                            <div className="row">
                                {books.map((item) => (
                                    <BookCard
                                        key={item.bookID}
                                        item={item}
                                        showModalInfo={showModalInfo}
                                        addToCart={addToCart}
                                        removeFromCart={removeFromCart}
                                        history={history}
                                    />
                                ))}
                                
                            </div>
                        </Auxillary>
                    )}
                </div>
            </Auxillary>
        </Auxillary>
    );
};

export default BookList;
