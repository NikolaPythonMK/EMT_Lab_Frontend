import React from 'react';

const authors = (props) => {    //stateless component
    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"row"}>
                    <table className={"table table-stripped"}>
                        <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Surname</th>
                                <th scope={"col"}>Country</th>
                                <th scope={"col"}>Continent</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.authors.map((i) => {
                            return (
                                <tr>
                                    <td>{i.name}</td>
                                    <td>{i.surname}</td>
                                    <td>{i.country.name}</td>
                                    <td>{i.country.continent}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default authors;
