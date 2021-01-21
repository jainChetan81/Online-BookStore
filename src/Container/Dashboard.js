import React, { Component } from "react";
import BookList from "../components/BookList";
import axios from "axios";
import Form from "../components/Form";
import Spinner from "../components/Spinner/Spinner";
import db from "../Database/IndexDB";
import { Link } from "react-router-dom";
export default class App extends Component {
    state = {
        books: [],
        cart: [],
        loading: false,
        filteredBooks: [],
        searchString: "",
        allBooks: [],
    };

    getBooks = (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        const bookName = e.target.elements.books.value;
        const filteredBooks = this.state.books.filter((e) => {
            return e.title
                .trim()
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(
                    bookName
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, "")
                        .toLowerCase()
                );
        });
        const filteredArray = [...filteredBooks];
        this.setState({
            loading: false,
            filteredBooks: [...filteredArray],
            searchString: bookName,
        });
    };

    addToCart = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedBooks = [...this.state.books];
        const index = updatedBooks.findIndex((e) => e.bookID === id);
        updatedBooks[index].inCart = true;
        updatedBooks[index].count = 1;
        let sliced = updatedBooks.slice(index, index + 1);
        updatedCart.push(sliced[0]);
        this.setState({
            cart: updatedCart,
            books: updatedBooks,
        });
        db.books
            .update(id, { inCart: true, count: 1 })
            .catch((err) => console.error("err1", err));
        db.cart.add(sliced[0]).catch((err) => console.error("err3", err));
    };
    removeFromCart = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedBooks = [...this.state.books];
        const index = updatedCart.findIndex((e) => e.bookID === id);
        const indexBooks = updatedBooks.findIndex((e) => e.bookID === id);
        updatedCart.splice(index, 1);
        updatedBooks[indexBooks].inCart = false;
        updatedBooks[indexBooks].count = 0;
        this.setState({
            books: updatedBooks,
            cart: updatedCart,
        });

        db.cart.delete(id).catch((err) => console.error("err4", err));

        db.books
            .update(id, { inCart: false, count: 0 })
            .catch((err) => console.error("err5", err));
    };
    async componentDidMount() {
        this.setState({ loading: true });
        let books = await db.books.toArray();
        let allCart = await db.cart.toArray();
        let allBooks = await db.allBooks.toArray();

        if (books.length === 0) return this.getNewsItems();
        else {
            return this.setState({
                books,
                allBooks,
                cart: allCart,
                loading: false,
            });
        }
    }

    addToIndexDB(books, key) {
        books.forEach((book) => {
            db[key]
                .add(book)
                .then()
                .catch((err) => console.log("err", err));
        });
    }
    addMoreBooks = () => {
        let books = [...this.state.books];
        let allBooks = [...this.state.allBooks];
        const length = books.length;
        console.log(books.length + 1, allBooks.length);
        for (
            let i = books.length;
            i < length + 12 && i < allBooks.length;
            i++
        ) {
            books.push(allBooks[i]);
        }

        this.setState({ books });
    };

    getNewsItems() {
        console.log("getNewsItems");
        axios
            .get(
                "https://cors-anywhere.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
            )
            .then((res) => {
                let allBooks = [...res.data];
                let allUpdatedBooks = [];
                allBooks.forEach((item) =>
                    allUpdatedBooks.push({ ...item, inCart: false, count: 0 })
                );
                let slicedBooks = allUpdatedBooks.slice(0, 48);
                let moreSlicedBooks = allUpdatedBooks.slice(0, 16);
                this.setState({
                    books: moreSlicedBooks,
                    allBooks: slicedBooks,
                    loading: false,
                });
                this.addToIndexDB(moreSlicedBooks, "books");
                this.addToIndexDB(slicedBooks, "allBooks");
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: true });
            });
    }

    render() {
        const { books, cart } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Chetan Book Store!</h1>
                    <Link
                        to="/checkout"
                        className="cart_button videoSidebar__button">
                        Cart : {cart.length}
                    </Link>
                </header>
                <Form getBooks={this.getBooks} />
                {this.state.loading ? (
                    <Spinner />
                ) : this.state.books.length < 1 ? (
                    <p>Books can't be loaded</p>
                ) : (
                    <BookList
                        filteredBooks={this.state.filteredBooks}
                        books={books}
                        cart={cart}
                        addMoreBooks={this.addMoreBooks}
                        searchString={this.state.searchString}
                        history={this.props.history}
                        addToCart={this.addToCart}
                        removeFromCart={this.removeFromCart}
                    />
                )}
            </div>
        );
    }
}
