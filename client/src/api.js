import axios from "axios"

const url = process.env.REACT_APP_API_DIRECTION 

export const getPosts = () => axios.get(`${url}/post`)
export const createPost = (post) => axios.post(`${url}/post`, post)
export const likePost = (id) => axios.put(`${url}/post/like/${id}`)
export const unlikePost = (id) => axios.put(`${url}/post/unlike/${id}`)
export const searchTrends = (search) => axios.get(`${url}/post/trends/search/${search.search}`)
export const getTrendPosts = () => axios.get(`${url}/post/trends`)
export const getPostById = (id) => axios.get(`${url}/post/${id}`)
export const getPostByTag = (tag) => axios.get(`${url}/post/trends/${tag}`)