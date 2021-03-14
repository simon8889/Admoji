import React, { useState } from "react"
import "./Create.css"
import { toast } from "react-toastify"
import * as api from "../../api.js"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

function generate() {
	let hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"]
	function populate() {
		let a = "#"
		for (var i = 0; i < 6; i++) {
			var x = Math.round(Math.random() * 14)
			var y = hexValues[x]
			a += y
		}
		return a
	}
	let newColor1 = populate()
	let newColor2 = populate()
	let angle = Math.round(Math.random() * 360)
	return "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")"
}

class BackgroundStack{
	constructor(){
		this.stack = [generate()]
		this.actualIndex = 0
	}

	print(){
		console.log("hola")
	}

	getActual(){
		return this.stack[this.actualIndex]
	}

	moveToLeft(){
		if (this.actualIndex === 0){
			const newBackground = generate()
			const newStack = [newBackground, ...this.stack]
			this.stack = newStack
			this.actualIndex = this.stack.indexOf(newBackground)
		}
		else{
			this.actualIndex = this.actualIndex - 1 
		}
		return this.getActual()
	}

	moveToRight(){
		if (this.actualIndex === this.stack.length - 1){
			const newBackground = generate()
			const newStack = [...this.stack, newBackground]
			this.stack = newStack
			this.actualIndex = this.stack.indexOf(newBackground)
		}
		else{
			this.actualIndex = this.actualIndex + 1 
		}
		return this.getActual()
	}

	reNew(){
		this.stack = [generate()]
		this.actualIndex = 0
		return this.getActual()
	}
}

const Create = () => {
	const [backgroundHandler, setBackgroundHandler] = useState(new BackgroundStack())

	const [formContent, setFormContent] = useState({
		guess: "",
		answer: "",
		tags: "",
		background: backgroundHandler.getActual()
	})
    
	const allDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~","¡","¿"]

	const handleSubmit = (e) => {
		e.preventDefault()
		api.createPost(formContent)
			.then(data => data && toast.success("created"))
			.catch(err => toast.warn("create error, Try again."))
		setFormContent({
			guess: "",
			answer: "",
			tags: "",
			background: backgroundHandler.reNew(),
		})
	}

	const handleLeft = () => {
		setFormContent({...formContent, background: backgroundHandler.moveToLeft()})
	}

	const handleRight = () => {
		setFormContent({...formContent, background: backgroundHandler.moveToRight()})
	}
    
	return (
		<div className="create">
			<form className="create__form" onSubmit={handleSubmit}>
				<div className="create__title">
					<h1>Create Riddle</h1> 
				</div>
				<input type="text" name="guess" className="create__input" value={formContent.guess} onChange={(e) => setFormContent({...formContent, guess: !e.target.value.split("").some(r => allDigits.includes(r)) ? e.target.value : formContent.guess })} placeholder="Riddle emoji  (only emoji input)"/>
				<input type="text" name="answer" className="create__input" value={formContent.answer} onChange={(e) => setFormContent({...formContent, answer: e.target.value })} placeholder="Answer" />
				<input type="text" name="tags" className="create__input" value={formContent.tags} onChange={(e) => setFormContent({...formContent, tags: e.target.value.replace(" ",",").split(",")})} placeholder="Tags (Space for new)"/>
				<div className="create__background">
					<h3>background:</h3>
					<div className="create__backgroundSelector">
						<ChevronLeftIcon onClick={handleLeft} style={{cursor: "pointer"}}/>
						<div className="create__showBackground" style={{ background: formContent.background }}></div>
						<ChevronRightIcon onClick={handleRight} style={{cursor: "pointer"}}/>
					</div>
				</div>
				<input type="submit" value="create" className="create__submit" />
			</form> 
		</div>
	)
}

export default Create
