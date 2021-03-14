import Post from "../models/postsModel.js";

const filterItems = (needle, heystack) => {
    const query = needle.toLowerCase();
    return heystack.filter(item => item.toLowerCase().indexOf(query) >= 0);
}

export const createPost = (req,res) => {
    const postContent = req.body;
    const newPost = new Post(postContent);
    newPost.save()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json({ error: err }))
}

export const getPosts = (req, res) => {
    Post.find({}).sort({createdAt: -1}).exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err }))
}

export const likePost = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id,{$inc: { likeCount: 1 }})
        .then(res.status(200).json({ updated: true }))
        .catch(err => res.status(500).json({ error: err }))
}

export const unlikePost = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id,{$inc: { likeCount: -1 }})
        .then(res.status(200).json({ updated: true }))
        .catch(err => res.status(500).json({ error: err }))
}

export const searchTrends = (req, res) => {
    const search = req.params.search; 
    Post.find({ tags:{ $elemMatch: { $regex: search, $options: "i" } } } , {_id: 0, tags: 1})
        .then(data => [].concat(...data.map( val => val.tags)))
        .then(data => res.status(200).send(filterItems(search, [...new Set(data)])))
        .catch(err => res.status(500).json({ error: err }))
}

export const getTrendPosts = (req, res) => {
    Post.find({}).sort({likeCount: -1, createdAt: -1}).exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err }))
}

export const getPostById = (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err }))
}

export const getPostByTag = (req, res) => {
    const tag = req.params.tag;
    Post.find({ tags:{ $in: tag } } )
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err }))
}