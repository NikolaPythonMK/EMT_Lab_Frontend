import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from "../../../custom-axios/axios";
import EShopService from "../../../repository/eShopRepository";
import { useNavigate, useSearchParams } from 'react-router-dom';

const BookEdit = (props) => {

    // const history = useHistory();
    const navigate = useNavigate();

    const {id} = useParams();

    const [book, updateBook] = useState({
        id: 1,
        name: "",
        category: "NOVEL",
        availableCopies: 1,
        authorId: 1
    });


    // const [formData, setFormData] = useState({
    //     name: '',
    //     categoryId: 1,
    //
    // })

    useEffect(() => {
        EShopService.getBook(id)
            .then(response => {
                console.log('data',response.data);
                updateBook({
                    id: response.data.id,
                    name: response.data.name,
                    category: response.data.category,
                    availableCopies: response.data.availableCopies,
                    authorId: response.data.author.id
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = book.name !== "" ? book.name : props.book.name;
        const category = book.category !== 0 ? book.category : props.book.category;
        const author = book.authorId !== undefined ? book.authorId : props.book.authorId;
        const availableCopies = book.availableCopies !== 0 ? book.availableCopies : props.book.availableCopies;
        // console.log(id, name, category, author, availableCopies);
        props.onEdit(id, name, category, author, availableCopies);
        // history.push("/books");
        navigate("/books");
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               value={book?.name}
                               onChange={(e) => updateBook({...book, name: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control"
                                onChange={(e) => updateBook({...book, category: e.target.value})}>
                            {props.categories.map((term) => {
                                return <option selected={book.category === term} value={term}>{term}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control"
                                onChange={(e) => updateBook({...book, authorId: Number(e.target.value)})}>
                            {props.authors.map((term) => {
                                return <option selected={book.authorId === term.id} value={term.id}>{term.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number"
                               className="form-control"
                               id="quantity"
                               name="quantity"
                               value={book?.availableCopies}
                               onChange={(e) => updateBook({...book, availableCopies: Number(e.target.value)})}
                        />
                    </div>


                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit;