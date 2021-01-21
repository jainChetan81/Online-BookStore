import React from "react";
const Form = ({ getBooks }) => (
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
        <button className="form__button">Search</button>
    </form>
);
export default Form;
