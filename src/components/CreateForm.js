import React, { Component } from "react";

export class CreateForm extends Component {
  render() {
    return (
      <form onSubmit={(e) => this.props.createMyBook(e)}>
        <label>Book Name</label>
        <input
          value={this.props.updateBookName}
          onChange={(e) => this.props.updateBookName(e.target.value)}
        ></input>
        <button type="submit">Update</button>
      </form>
    );
  }
}

export default CreateForm;
