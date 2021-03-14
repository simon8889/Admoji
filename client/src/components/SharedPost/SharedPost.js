import React, { useEffect, useState } from "react"
import { CircularProgress } from "@material-ui/core"
import ControlPointIcon from "@material-ui/icons/ControlPoint"
import * as api from "../../api"
import { useParams, Link } from "react-router-dom"
import "./SharedPost.css"

import CardContainer from "../CardContainer/CardContainer"

const SharedPost = () => {
	const { id } = useParams()
	const [ postQuery, setPostQuery ] = useState(false)
	const [ postResponse, setPostResponse ] = useState(<CircularProgress />)
    
	const notFound = (
		<div className="shared__info">
			<p>Ridle not found 😟😴</p>
			<p>More in:</p>
			<Link to="/" className="shared__icon">
				<ControlPointIcon />
			</Link>
		</div>)
        
	const last = (
		<div className="search__last">
			<Link to="/" className="shared__icon">
				<ControlPointIcon />
			</Link>
		</div>
	)
    
	useEffect(() =>{
		api.getPostById(id)
			.then(data => setPostResponse(<CardContainer data={ [data.data] } last={last}/>))
			.catch(err =>  setPostResponse(notFound))
	}
	, [postQuery])
    
	return (
		<div className="shared">
			{ postResponse }
		</div>
	)
}

export default SharedPost
