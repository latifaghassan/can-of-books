import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import BeastBooks from "./components/BeastBooks";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/CreateForm";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.auth0.user.name,
      userEmail: this.props.auth0.user.email,
      userPicture: this.props.auth0.user.picture,
      serverUrl: process.env.REACT_APP_SERVER_URL,
      booksData: [],
      bookName: "",
      showUpdateForm: false,
      bookNameUpdate: "",
      bookDescriptionUpdate: "",
      booStatusUpdate: "",
      bookIndex: 0,
    };
  }

  updateBookName = (bookName) => this.setState({ bookName });
  //-----------------------------------
  updateBookNameUpdateForm = (bookName) =>
    this.setState({ bookNameUpdate: bookName });
  //-----------------------------------

  showUpdateForm = (catObject, idx) =>
    this.setState({
      showUpdateForm: !this.state.showUpdateForm,
      bookNameUpdate: catObject.name,
      bookIndex: idx,
      bookDescriptionUpdate: catObject.description,
      bookIndex: idx,
      booStatusUpdate: catObject.status,
      bookIndex: idx,
    });
  //---------------------------------

  // CREATE

  createMyBook = (e) => {
    e.preventDefault();
    //we are going to create a request body object, which will contain the email and the book name to be sent over to the backend server.

    const reqBody = {
      bookName: this.state.bookName,
      userEmail: this.state.userEmail,
    };

    // to send a request for creating new data, we will be using the POST method.
    axios
      .post(`${this.state.serverUrl}/book`, reqBody)
      .then((response) => {
        this.setState({
          booksData: response.data.books,
        });
      })
      .catch((error) => alert(error.message));
  };

  //---------------------------------
  // UPDATE

  updateBookName = (e) => {
    e.preventDefault();

    const reqBody = {
      bookNameUpdate: this.state.bookNameUpdate,
      userEmail: this.state.userEmail,
    };

    // to send a request for creating new data, we will be using the POST method.
    axios
      .put(`${this.state.serverUrl}/book/${this.state.bookIndex}`, reqBody)
      .then((response) => {
        this.setState({
          booksData: response.data.books,
        });
      })
      .catch((error) => alert(error.message));
  };
  //---------------------------------

  // DELETE
  deleteMyBook = (e) => {
    // This function will be sending an axios request to the backend eitht he book index to be deleted.

    // const reqBody = {
    //   userEmail: this.state.userEmail,
    // };

    // NOTE! Deleting items with axios, axios does not accept request body assigment
    axios
      .delete(
        `${this.state.serverUrl}/book/${index}?email=${this.state.userEmail}`
      )
      .then((response) => {
        this.setState({
          booksData: response.data.books,
          showUpdateForm: false,
        });
      })
      .catch((error) => alert(error.message));
  };

  //---------------------------------
  componentDidMount = () => {
    axios
      .get(`${this.state.serverUrl}/books?email=${this.state.userEmail}`)
      .then((response) => {
        this.setState({
          booksData: response.data.books,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    return (
      <div>
        <div>
          <h2>{this.state.userName}</h2>
          <p>{this.state.userEmail}</p>
          <img src={this.state.userPicture} alt={this.state.userName} />
        </div>
        <div>
          <CreateForm
            updateBookName={this.updateBookName}
            createMyBook={this.createMyBook}
          />
        </div>
        <div>
          {this.state.showUpdateForm && (
            <UpdateForm
              updateBookName={this.updateBookName}
              updateBookNameUpdateForm={this.updateBookNameUpdateForm}
              catNameUpdate={this.state.bookdesUpdate}
              bookDescriptionUpdate={this.state.bookDescriptionUpdate}
              booStatusUpdate={this.state.booStatusUpdate}
            />
          )}
        </div>

        {this.state.booksData.length > 0 && (
          <div>
            <BeastBooks
              books={this.state.booksData}
              deleteMyBook={this.deleteMyBook}
              showUpdateForm={this.showUpdateForm}
            />
          </div>
        )}
      </div>
    );
  }
}
export default withAuth0(Profile);
