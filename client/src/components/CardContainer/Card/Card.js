import React , {useState, useEffect} from "react"
import "./Card.css"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import * as api from "../../../api"
import { likeRidle, getLikedRidle, unlikeRidle, getSolvedRidle, solveRidle, unsolveRidle } from "../../../cookies"
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"
import ReplayIcon from "@material-ui/icons/Replay"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { CopyToClipboard } from "react-copy-to-clipboard"

dayjs.extend(relativeTime)

function numFormatter(num) {
	if(num > 999 && num < 1000000){
		return (num/1000).toFixed(1) + "K"  
	}else if(num > 1000000){
		return (num/1000000).toFixed(1) + "M" 
	}else if(num < 900){
		return num 
	}
}

const Card = ({ data }) => {
	const { guess, answer, tags, likeCount, createdAt, _id: id, background: cardBackground} = data
	const backgroundStyle = {
		background: cardBackground,
	}
	const time = dayjs(createdAt)
	const [isLiked, setIsLiked ] = useState(false) 
	const [likes, setLikes] = useState(likeCount)
	const [answerInput, setAnswerInput] = useState("")
	const [isSolved, setIsSolved] = useState(false)
    
	const handleSubmit = (e) => {
		e.preventDefault()
		if(answerInput.toLowerCase() === answer.toLowerCase()){
			solveRidle(id)
			setAnswerInput(answer)
			setIsSolved(true)
			toast.success(`${answer} is the correct answer`,{
				autoClose: 2000
			})
		}
		else{
			setAnswerInput("")
			toast.warn("incorrect answer",{
				autoClose: 1000
			})
		}
	}
    
	useEffect(() => {
		if (getLikedRidle(id)){
			setIsLiked(true)
		}
		else{
			setIsLiked(false)
		}
		if (getSolvedRidle(id)){
			setAnswerInput(answer)
			setIsSolved(true)
		}
		else{
			setIsSolved(false)
		}
        
	}, [id, likes])
    
	const handleLike = () => {
		if (!isLiked){
			api.likePost(id)
				.then(setLikes(likes + 1))
				.then(likeRidle(id))
				.catch(err => console.log(err))
		}
		else{
			api.unlikePost(id)
				.then(setLikes(likes - 1))
				.then(unlikeRidle(id))
				.catch(err => console.log(err))
		}
	}

	const CopyToClipboard = () => {
		const url = `${process.env.REACT_APP_CLIENT_DIRECTION}/ridle/${id}`
		var tempInput = document.createElement("input")
		tempInput.value = url
		document.body.appendChild(tempInput)
		tempInput.select()
		document.execCommand("copy")
		document.body.removeChild(tempInput)
		toast("Link copied to clipboard 🚀")
	}
    
	return (
		<div className="card" style={ backgroundStyle }>
			<div className="card__container">
				<div className="card__desc">
					<p className="card__time">{time.fromNow()} <br /> {time.format("D/M/YY")}</p>
					<div className="card__like">
						{isLiked ? <FavoriteIcon onClick={handleLike}/> : <FavoriteBorderIcon onClick={handleLike}/>}
						<p>{numFormatter(likes)}</p>
					</div>
					<div className="card__tags">
						{tags.map((tag, index) => (<Link to={`/trends/${tag}`} key={index} className="card__tag">{"#"+tag}</Link>))}
					</div>
				</div>
				<div className="card__solved">
					<ReplayIcon style={{color: "#000000", cursor: "pointer"}} onClick={() => { unsolveRidle(id); setIsSolved(false); setAnswerInput("")}}/>
					<p>solved:</p>
					{isSolved ? <CheckIcon className="card__solvedIcon" style={{fontSize: 70}}/> : <CloseIcon className="card__notSolvedIcon" style={{fontSize: 70}}/>}
				</div>
				<div className="card__share" onClick={ CopyToClipboard }>
					<p>Share</p>
					<MoreHorizIcon />
				</div>
				<div className="card__ridle">
					{ guess }
				</div>
				<form className="card__form" onSubmit={ handleSubmit }>
					<input type="text" className="card__input" placeholder="Guess the riddle" value={answerInput} onChange={e => setAnswerInput(e.target.value)}/>
					<input type="submit" className="card__submit" value="guess"/>
				</form>
			</div>
		</div>
	)
}

export default Card
