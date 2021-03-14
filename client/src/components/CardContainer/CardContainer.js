import React, { useState, useRef, useEffect } from "react"
import Card from "./Card/Card"
import ScrollHandler from "react-page-scroller"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import "./CardContainer.css"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import { CircularProgress } from "@material-ui/core"

const CardContainer = ({ data, last }) => {
	const content =  data.map((cardContent) => (<Card data={cardContent} key={cardContent._id} />))
	const lastItem = last ? last :  <CircularProgress />
	const [ currentPage, setCurrentPage ] = useState(0)

	const handlePageChange = number => setCurrentPage(number)
	const handleUpPage = () => setCurrentPage(currentPage - 1)
	const handleDownPage = () => setCurrentPage(currentPage + 1)

	return (
		<div className="main">
			<div className="main__directions">
				<ArrowUpwardIcon onClick={handleUpPage} style={{ visibility: currentPage !== 0 ? "visible" : "hidden"}}/>
				<ArrowDownward onClick={handleDownPage} style={{ visibility: currentPage !== data.length ? "visible" : "hidden"}}/>
			</div>
			<ScrollHandler animationTimer={250} containerWidth={"100%"} containerHeigth={"100%"} customPageNumber={currentPage} pageOnChange={handlePageChange}>
				{ content }
				<div className="card__last">
					{ lastItem }
				</div>
			</ScrollHandler>
		</div>
	)
}

export default CardContainer
