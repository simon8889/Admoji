import Cookies from "universal-cookie"

const cookies = new Cookies()

export const exists = () => {
	return cookies.get("likes") && cookies.get("solved")
}

export const createCookies = () => {
	cookies.set("likes", {likes: []}, {path: "/"})
	cookies.set("solved", {solved: []}, {path: "/"})
}

export const getLikes = () => {
	try{
		return cookies.get("likes").likes
	}
	catch{
		return []
	}
}

export const getLikedRidle = (id) => {
	return getLikes().includes(id)
}

export const likeRidle = (id) => {
	if (!getLikedRidle(id)){
		let likesList = [...getLikes(), id]
		cookies.set("likes", {likes: likesList}, {path: "/"})
	}
}

export const unlikeRidle = (id) => {
	let likesList = [...getLikes()]
	let indexToEliminate = likesList.indexOf(id)
	likesList.splice(indexToEliminate,1)
	cookies.set("likes", {likes: likesList}, {path: "/"})
}

export const getSolves = () => {
	try{
		return cookies.get("solved").solved
	}
	catch{
		return []
	}
}

export const getSolvedRidle = (id) => {
	return getSolves().includes(id)
}

export const solveRidle = (id) => {
	if (!getSolvedRidle(id)){
		let solvesList = [...getSolves(), id] 
		cookies.set("solved", {solved: solvesList}, {path: "/"})
	}
}

export const unsolveRidle = (id) => {
	let solvesList = [...getSolves()]
	let indexToEliminate = solvesList.indexOf(id)
	solvesList.splice(indexToEliminate, 1)
	cookies.set("solved", {solved: solvesList}, {path: "/"})
}