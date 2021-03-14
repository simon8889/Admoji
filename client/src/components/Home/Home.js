import React, { useState, useEffect } from "react"
import "./Home.css"
import * as api from "../../api"
import { CircularProgress } from "@material-ui/core"
import CardContainer from "../CardContainer/CardContainer"

const Home = () => {
	const [content, setContent] = useState(null)
	const [initalDependency, setInitialDependency ] = useState(0)
	useEffect(() => {
		api.getPosts()
			.then(data => setContent({...data}))
			.catch(err => console.log(err))
	}, [initalDependency])
	return (
		<div className="home">
			{content ? <CardContainer data={content.data}/> : <div className="home__load"><CircularProgress /></div>}
		</div>
	)
}

export default Home
