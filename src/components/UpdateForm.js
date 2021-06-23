import React, { Component } from "react";

export class CreateForm extends Component {
  render() {
    return (
      <form onSubmit={(e) => this.props.updateBookName(e)}>
        <label>Book Name</label>

        <input
          value={this.props.catNameUpdate}
          onChange={(e) => this.props.updateBookNameUpdateForm(e.target.value)}
        ></input>

        <input
          value={this.props.bookDescriptionUpdate}
          onChange={(e) => this.props.updateBookNameUpdateForm(e.target.value)}
        ></input>

        <input
          value={this.props.booStatusUpdate}
          onChange={(e) => this.props.updateBookNameUpdateForm(e.target.value)}
        ></input>

        <input type="submit" value="update book" />
      </form>
    );
  }
}

export default CreateForm;
