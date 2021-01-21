import Dexie from "dexie";
const db = new Dexie("ChetanBookstore"); //set the database

db.version(1).stores({
    books:
        "bookID, title, authors, average_rating, isbn, language_code, ratings_count, price, inCart, count", //create the database store
    cart:
        "bookID, title, authors, average_rating, isbn, language_code, ratings_count, price, inCart, count",
});

db.open().catch((err) => {
    console.log(err.stack || err);
});
export default db;
