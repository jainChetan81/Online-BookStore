import React, { Component } from "react";
import StarIcon from "@material-ui/icons/Star";

export default class NewsModal extends Component {
    buyNow(book) {
        if (!book.inCart) this.props.addToCart(book.bookID);
        this.props.history.push("/checkout");
    }
    averageRatings(num) {
        let v = [];
        for (let i = 1; i < Math.round(num); i++) {
            v.push(<StarIcon key={i} />);
        }
        return v;
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

                                <h5 className="active-news__publisher">
                                    Publisher:
                                    <span>{activeBook["authors"]}</span>
                                </h5>
                                <h5 className="active-news__publisher">
                                    Language:
                                    <span>
                                        <strong>
                                            <i>{activeBook["language_code"]}</i>
                                        </strong>
                                    </span>
                                </h5>
                                <p className="active-news__publisher">
                                    Ratings:
                                    <span>
                                        {this.averageRatings(
                                            activeBook.average_rating
                                        )}
                                        (Total Ratings:{" "}
                                        {activeBook.ratings_count})
                                    </span>
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
                                                className="btn btn-danger mx-3">
                                                Remove From Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    addToCart(activeBook.bookID)
                                                }
                                                className="btn btn-success mx-3">
                                                Add To Cart
                                            </button>
                                        )}
                                    </span>
                                </p>
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
