import React, {useState} from "react"
import "./Sidebar.css"
import { Link, useLocation }  from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import HomeIcon from "@material-ui/icons/Home"

const Sidebar = () => {
	const [ selected, setSelected ] = useState(useLocation().pathname.split("/")[1])

	return (
		<div className="sidebar">
			<nav className="sidebar__nav">
				<ul className="sidebar__navlist">
					<li className={"sidebar__item" + (selected === "create" ? " selected":"")} onClick={() => setSelected("create")}>
						<p className="sidebar__title">Create</p>
						<Link to="/create" className="sidebar__link">
							<AddIcon style={{ fontSize: 60 }}/>
						</Link>
					</li>
					<li className={"sidebar__item" + (selected === "" ? " selected":"")} onClick={() => setSelected("")}>
						<p className="sidebar__title">Home</p>
						<Link to="/" className="sidebar__link">
							<HomeIcon style={{ fontSize: 60 }} />
						</Link>
					</li>
					<li className={"sidebar__item" + (selected === "trends" ? " selected":"")} onClick={() => setSelected("trends")}>
						<p className="sidebar__title">Trends</p>
						<Link to="/trends" className="sidebar__link">
							<SearchIcon style={{ fontSize: 60 }}/>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar
