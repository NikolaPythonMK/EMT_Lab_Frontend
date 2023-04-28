import React from 'react';
import ReactPaginate from "react-paginate";
import BookItem from '../BookItem/bookItem'
import {Link} from 'react-router-dom'

class Books extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        }
    }

    render(){

        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size)
        const books = this.getProductsPage(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"row"}>
                        <table className={"table table-stripped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Available copies</th>
                            </tr>
                            </thead>
                            <tbody>
                                {books}
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate previousLabel={"back"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="/#">...</a>}
                                   breakClassName={"break-me"}
                                   pageClassName={"ml-1"}
                                   pageCount={pageCount}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination m-4 justify-content-center"}
                                   activeClassName={"active"}/>

                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new product</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        console.log(selected)
        this.setState({
            page: selected
        })
    }


    // getProductsPage = () => {
    //     {this.props.books.map((i) => {
    //         return ( <BookItem book={i}  deleteBook={this.props.deleteBook} /> )
    //     })}
    // }

    // getProductsPage = () => {
    //     return (
    //         <>
    //             {this.props.books.map((i) => (
    //                 <BookItem book={i} deleteBook={this.props.deleteBook} />
    //             ))}
    //         </>
    //     );
    // };

    // getProductsPage = (offset, nextPageOffset) => {
    //     return this.props.books.map((term, index) => {
    //         return (
    //             <BookItem term={term} onDelete={this.props.deleteBook} onEdit={this.props.onEdit}/>
    //         );
    //     }).filter((product, index) => {
    //         return index >= offset && index < nextPageOffset;
    //     })
    // }

    getProductsPage = (startIndex, endIndex) => {
        const { books, deleteBook, onEdit, orderBook } = this.props;

        return books
            .slice(startIndex, endIndex)
            .map((book) => (
                <BookItem book={book} deleteBook={deleteBook} onEdit={onEdit} orderBook={orderBook}/>
            ));
    };


}

const books = (props) => {
    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"row"}>
                    <table className={"table table-stripped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Category</th>
                            <th scope={"col"}>Author</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.books.map((i) => {
                            return ( <BookItem book={i}  deleteBook={props.deleteBook} orderBook={props.orderBook} /> )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="col mb-3">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new product</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Books;