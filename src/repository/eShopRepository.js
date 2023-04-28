import axios from '../custom-axios/axios'

const EShopService = {
    fetchAuthors: () => {
        return axios.get("/authors");
    },

    fetchCountries: () => {
        return axios.get("/countries");
    },

    fetchBooks: () => {
        return axios.get("/books");
    },

    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },

    addBook: (name, category, author, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "authorId": author,
            "availableCopies": availableCopies
        })
    },

    editBook: (id, name, category, authorId, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies,
        });
    },

    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },

    orderBook: (id) => {
        return axios.put(`/books/order/${id}`);
    }


}

export default EShopService;