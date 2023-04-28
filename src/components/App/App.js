import './App.css';
import React, {Component} from 'react';
// import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authors from '../Authors/authors'
import Country from '../Countries/countries'
import Books from '../Books/BookList/books'
import Header from '../Header/header'
import BookAdd from '../Books/BookAdd/BookAdd'
import EShopService from "../../repository/eShopRepository";
import BookEdit from "../Books/BookEdit/BookEdit";
import Categories from "../Categories/Categories";

class App extends Component {   // stateful component
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            countries: [],
            books: [],
            categories: ["NOVEL", "THRILLER", "HISTORY", "FANTASY", "BIOGRAPHY", "CLASSICS", "DRAMA"],
            selectedBook: {}
        }
    }

    render() {
        return (
            // <Router>
            //     <main>
            //         <div className="container">
            //             <Route path={"/authors"} exact render={() => <Authors authors={this.state.authors}/>} />
            //             <Route path={"/countries"} exact render={() => <Country categories={this.state.countries}/>} />
            //             <Route path={"/books"} exact render={() => <Books books={this.state.books}/>} />
            //             <Redirect to={"/books"}/> //ako niedna od patekite ne e tocna
            //         </div>
            //     </main>
            // </Router>
            <Router>
                <Header />
                <main>
                    <div className="container">
                        <Routes>
                            <Route path="/categories" element={<Categories categories={this.state.categories} />}/>
                            <Route path="/authors" element={<Authors authors={this.state.authors} />} />
                            <Route path="/countries" element={<Country countries={this.state.countries} />} />
                            <Route path="/books/add" element={<BookAdd countries={this.state.countries}
                                                authors={this.state.authors} onAddBook={this.addBook}/>}/>


                            <Route path="/books/edit/:id" element={<BookEdit categories={this.state.categories}
                                                                             authors={this.state.authors}
                                                                             onEdit={this.onEdit}
                                                                             book={this.state.selectedBook}/>}/>

                            <Route path="/books" element={<Books books={this.state.books} deleteBook={this.deleteBook} orderBook={this.orderBook}/>} />

                            <Route path="/*" element={<Navigate to="/books" />} />
                        </Routes>
                    </div>
                </main>
            </Router>
        )
    }


    loadAuthors = () => {
        EShopService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    loadCountries = () => {
        EShopService.fetchCountries()
            .then(data => {
                this.setState({
                    countries: data.data
                })
            })
    }

    loadBooks = () => {
        EShopService.fetchBooks()
            .then(data => {
                this.setState({
                    books: data.data
                })
            })
    }

    appendBooks = () => {
        EShopService.fetchBooks()
            .then(data => {
                this.setState((prev) => {
                    prev.books.append(data.data);
                })
            })
    }

    deleteBook = (id) => {
        EShopService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
        // eslint-disable-next-line react-hooks/rules-of-hooks
    }

    addBook = (name, category, author, availableCopies) => {
        EShopService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    onEdit = (id, name, category, authorId, availableCopies) => {
        EShopService.editBook(id, name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
        this.loadBooks();
    }

    getBook = (id) => {
        EShopService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
        this.loadBooks();
    }

    orderBook = (id) => {
        EShopService.orderBook(id)
            .then((data) => {
                this.loadBooks();
            })

    }


    componentDidMount() {
        this.loadCountries();
        this.loadAuthors();
        this.loadBooks();
    }
}

export default App;
