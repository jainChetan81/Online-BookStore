import React from "react";
const Form = ({ getBooks, sortByRatings }) => (
    <form
        onSubmit={(e) => {
            e.preventDefault();
            getBooks(e);
        }}
        style={{ marginBottom: "2rem" }}>
        <input
            className="form__input"
            type="text"
            name="books"
            placeholder="Press Enter to search"
        />
        <button type="submit" className="form__button">
            Search
        </button>
        <button type="button" onClick={sortByRatings} className="form__button">
            Sort By Ratings
        </button>
    </form>
);
export default Form;
