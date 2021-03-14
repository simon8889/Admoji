import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import ControlPointIcon from "@material-ui/icons/ControlPoint"
import * as api from "../../api"
import "./TagsContainer.css"

import CardContainer from "../CardContainer/CardContainer"

const TagsContainer = () => {
	const { tag } = useParams()
	const [ searchQuery, setSearchQuery ] = useState(false)
	const [ tagResponse, setTagResponse ] = useState(<CircularProgress />)
    
	const last = (
		<div className="search__last">
			<Link to="/" className="shared__icon">
				<ControlPointIcon />
			</Link>
		</div>
	)
    
	const notFound = (
		<div className="shared__info">
			<p>Ridle not found 😟😴</p>
			<p>More in:</p>
			<Link to="/" className="shared__icon">
				<ControlPointIcon />
			</Link>
		</div>)
    
	useEffect(() => {
		api.getPostByTag(tag)
			.then(data => data.data.length ? setTagResponse(<CardContainer data={data.data} last={last}/>) : setTagResponse(notFound))
			.catch(err => console.log(err))
	}
	, [searchQuery])
    
	return (
		<div className="search">
			{ tagResponse }
		</div>
	)
}

export default TagsContainer
