import React from 'react';
import {Link} from "react-router-dom";

const productItem = (props) => {
    return (
        <tr>
            <td scope={"col"}>{props.book.name}</td>
            <td scope={"col"}>{props.book.category}</td>
            <td scope={"col"}>{props.book.author.name + " " + props.book.author.surname}</td>
            <td scope={"col"}>{props.book.availableCopies}</td>
            <td scope={"col"} className="text-right">
                <a title={"Delete"} className={"btn btn-danger m-1"}
                    onClick={() => props.deleteBook(props.book.id)}>Delete</a>

                <Link className={"btn btn-info m-1"}
                      onClick={() => props.onEdit(props.book.id)}
                      to={`/books/edit/${props.book.id}`}>
                    Edit
                </Link>

                <button className={"btn btn-secondary m-1"}
                    onClick={() => props.orderBook(props.book.id)}>
                    Mark as Taken
                </button>

            </td>
        </tr>
    )
}

export default productItem;