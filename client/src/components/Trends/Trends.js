import React, { useEffect ,useState }  from "react"
import * as api from "../../api"
import { CircularProgress } from "@material-ui/core"
import { Link } from "react-router-dom"
import "./Trends.css"

const Trends = () => {
	const [ trendsQuery, setTrendsQuery ] = useState(false)
	const [ trendsResponse, setTrendsResponse ] = useState(false)
	const [ searchResponse, setSearchResponse ] = useState(false)
	const [ searchString, setSearchString ] = useState({
		search: ""
	})

	useEffect(() => {
		if (searchString.search.length > 0){
			api.searchTrends(searchString)
				.then(data => setSearchResponse(data.data))
		}
		else{
			setSearchResponse(false)
		}
	}, [searchString])

	useEffect(()=>{
		api.getTrendPosts()
			.then(data => setTrendsResponse([].concat(...data.data.splice(0,6).map(val => val.tags))))
			.catch(err => console.log(err))
	}, [trendsQuery])

	return (
		<div className="trends">
			<div className="trends__container">
				<form className="trends__form">
					<input className="trends__input" type="text" onChange={(e) => setSearchString({ search: e.target.value })} value={setSearchString.search} placeholder="Search by tag" onBlur={() => setTimeout(() => setSearchResponse(false),90)} onFocus={(e) => setSearchString({search: e.target.value})}/>
					{ searchResponse ? 
						<div className="trends__results">
							{searchResponse.slice(0,4).map((val, index) =>
								<Link to={`/trends/${val}`} className="trends__link trends__option" key={index}>
									<p>{val}</p>
								</Link>
							)}
						</div>
						: null }
				</form>
				<div className="trends__content">
					<h1>Trend tags</h1>			
					<div className="trends__tags">
						{trendsResponse ? 
							trendsResponse.map((data, index) => (
								<Link to={`/trends/${data}`} key={index} className="trends__link" onClick={() => console.log("hasjd")}>
									<div className="trends__tag">{"#"+data}</div>
								</Link>
							)) : <div className="trends__load"><CircularProgress /></div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Trends