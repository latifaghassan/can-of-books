import React from 'react';

class BeastBooks extends React.Component {
    render() {
        return (
            <>
                <h2>My Favourite Books</h2>
                {this.props.books.length && this.props.books.map((book, idx) => (
                    <>
                    <div key={idx}>
                        {book.name}
                    </div>
                    <div key={idx}>
                        {book.description}
                    </div>
                    <div key={idx}>
                        {book.status}
                    </div>
                    </>
                ))}
                //nothing
            </>
        )
    }
}

export default BeastBooks;