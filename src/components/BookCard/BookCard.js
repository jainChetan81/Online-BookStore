import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function NewsCard({
    item,
    showModalInfo,
    removeFromCart,
    addToCart,
    history,
}) {
    const buyNow = (book) => {
        if (!book.inCart) addToCart(book.bookID);
        history.push("/checkout");
    };

    const image = `https://source.unsplash.com/300x2${item.bookID + 10}`;
    return (
        <div className="col-md-3" style={{ marginBottom: "2rem" }}>
            <div className="newss__box">
                <img
                    style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                    }}
                    src={image}
                    alt={`300x2${item.bookID + 10}`}
                />
                <div className="news__text">
                    <h5 className="newss__title">
                        {item.title.length < 55
                            ? `${item.title}`
                            : `${item.title.substring(0, 55)}...`}
                    </h5>
                    <p className="newss__subtitle">
                        Publisher :{" "}
                        <span>
                            {item.authors.length < 22
                                ? `${item.authors}`
                                : `${item.authors.substring(0, 22)}...`}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => showModalInfo(item)}
                    className="news_buttons">
                    View Book Details
                </button>
                <span className="videoSidebar__button">
                    {item.inCart ? (
                        <ShoppingCartIcon
                            style={{ color: "green" }}
                            fontSize="large"
                            onClick={(e) => removeFromCart(item.bookID)}
                        />
                    ) : (
                        <AddShoppingCartIcon
                            fontSize="large"
                            onClick={(e) => addToCart(item.bookID)}
                        />
                    )}
                </span>
                <br /> <br />
                <button onClick={() => buyNow(item)} className="news_buttons">
                    Buy Now{" "}
                    <b>
                        <i>${item.price}</i>
                    </b>
                </button>
                <span className="videoSidebar__button">
                    {item.average_rating}
                </span>
            </div>
        </div>
    );
}
