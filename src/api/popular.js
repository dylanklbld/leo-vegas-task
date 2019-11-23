const API = 'https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'

export const fetchPopular = async(handleSetData, options={}) => {
  await fetch(`${API}discover/movie?` + new URLSearchParams(Object.assign({
    api_key: apiKey
  }, options.page
    ? {
      page: options.page
    }
    : {})), {method: "GET"})
    .then(res => res.json())
    .then(response => handleSetData(response))
    .catch(error => console.log(error))
}