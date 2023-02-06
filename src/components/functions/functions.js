import axios from 'axios';

export function getRandom(author) {
    const promise = axios.get("https://api.quotable.io/random?author=" + author)

    const datapromise = promise.then((response) => response.data)

    return datapromise
}

export function getAuthorBySlug(searchTerm) {
    const promise = axios.get("https://api.quotable.io/search/authors?query=" + searchTerm)

    const datapromise = promise.then((response) => response.data)

    return datapromise
}