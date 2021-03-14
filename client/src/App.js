import { useEffect, useState } from "react"
import "./App.css"
import { Route, BrowserRouter as Router, Switch} from "react-router-dom" 
import { exists, createCookies} from "./cookies"
import {ToastContainer} from "react-toastify"

import Sidebar from "./components/Sidebar/Sidebar"
import Trends from "./components/Trends/Trends"
import Create from "./components/Create/Create"
import Home from "./components/Home/Home"
import SharedPost from "./components/SharedPost/SharedPost"
import TagsContainer from "./components/TagsContainer/TagsContainer"

const App = () => {
	const [cookieQuery, setCookieQuery] = useState(true)
	const [cookieExist, setCookieExist] = useState(true)
    
	useEffect(() => {
		if (!exists()){
			setCookieExist(false)
		}
		else{
			setCookieExist(true)
		}
	}, [cookieQuery])
    
	const setCookies = () => {
		createCookies()
		setCookieExist(true)
	}
    
	return (
		<Router>
			<div className="app">
				{cookieExist ? null : (
					<div className="app__cookie">
						<p className="app__cookieInfo">this site uses cookies for the entire user experience</p>
						<form onSubmit={setCookies} className="app__cookieForm">
							<input type="submit" value="agree" className="app__cookieSubmit"/>
						</form>
					</div>
				)}
				<div className="app__container" style={cookieExist ? null : {opacity: 0.7}}>
					<Sidebar />
					<Switch>
						<Route path="/" exact >
							<Home />
						</Route>
						<Route path="/create" exact >
							<Create />
						</Route>
						<Route path="/trends" exact >
							<Trends />
						</Route>
						<Route path="/ridle/:id">
							<SharedPost />
						</Route>
						<Route path="/trends/:tag">
							<TagsContainer />
						</Route>
					</Switch>
				</div>
			</div>
			<ToastContainer />
		</Router>
	)
}

export default App
