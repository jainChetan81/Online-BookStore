import React, { Component } from "react";

export default class NewsModal extends Component {
    buyNow(book) {
        if (!book.inCart) this.props.addToCart(book.bookID);
        this.props.history.push("/checkout");
    }
    render() {
        const { activeBook, removeFromCart, addToCart } = this.props;
        return (
            <div>
                {activeBook ? (
                    <div>
                        {activeBook.length !== 0 && (
                            <div className="active-news">
                                <img
                                    src={`https://source.unsplash.com/300x2${
                                        activeBook.bookID + 10
                                    }`}
                                    alt={activeBook.title}
                                    className="active-news__img"
                                />
                                <h3 className="active-news__title">
                                    {activeBook.title}
                                </h3>
                                <p>
                                    <b>{activeBook.title}</b>
                                </p>
                                <p className="lead active-website">
                                    <span>
                                        <button
                                            onClick={() =>
                                                this.buyNow(activeBook)
                                            }
                                            className="news_buttons">
                                            Buy Now
                                        </button>
                                    </span>
                                    <span>
                                        {activeBook.inCart ? (
                                            <button
                                                onClick={() =>
                                                    removeFromCart(
                                                        activeBook.bookID
                                                    )
                                                }
                                                className="news_buttons">
                                                Remove From Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    addToCart(activeBook.bookID)
                                                }
                                                className="news_buttons">
                                                Add To Cart
                                            </button>
                                        )}
                                    </span>
                                </p>
                                <h5 className="active-news__publisher">
                                    Publisher:
                                    <span>{activeBook["authors"]}</span>
                                </h5>
                            </div>
                        )}{" "}
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        );
    }
}
