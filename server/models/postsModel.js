import mongoose from "mongoose";
import GraphemeSplitter from "grapheme-splitter";


const post = new mongoose.Schema({
    guess: {
        type: String,
        required: true,
        validate: val => new GraphemeSplitter().splitGraphemes(val).length <= 10
    },
    answer: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        validate: val => val.length <= 6 && val.every(str => str.length <= 15)
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    background: {
        type: String,
        default: "linear-gradient(to right, #00b4db, #0083b0)",
    }
})

export default mongoose.model("post", post)