import React from 'react';


class Categories extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <ul>
                <li>NOVEL</li>
                <li>THRILLER</li>
                <li>HISTORY</li>
                <li>FANTASY</li>
                <li>BIOGRAPHY</li>
                <li>CLASSICS</li>
                <li>DRAMA</li>
            </ul>
        )
    }
}

export default Categories;