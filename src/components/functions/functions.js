
export function getResults(query1, query2) {

    const promise = axios.get("https://images-api.nasa.gov/search?q=" + query1 + "&media_type=" + query2)

    const datapromise = promise.then((response) => response.data.collection.items)

    return datapromise
}

export function getRandom2() {
    return promise = axios.get("https://api.quotable.io/random")
}



export function getRandom() {
    const promise = axios.get("https://api.quotable.io/random", { responseType: "json" }).then(function(response) { return response.data})
}