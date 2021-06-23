import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./MyFavoriteBooks.css";

class MyFavoriteBooks extends React.Component {
  render() {
    return (
      <div>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        {this.props.books.length &&
          this.props.books.map((book, idx) => {
            <div key={idx}>
              {book.name}
              <button onClick={(idx) => this.props.deleteMyBook(idx)}>
                Delete Book
              </button>
              <button onClick={(book, idx) => this.props.showUpdateForm(book)}>
                Show Update Form
              </button>
            </div>;
          })}
      </div>
    );
  }
}

export default MyFavoriteBooks;
