import React, { useState, useEffect } from "react"
import { fromEvent } from "rxjs"
import { tap } from "rxjs/operators"
import classNames from "classnames"
import withStyles from "react-jss"

const styles = {
	navigator: {
		position: "fixed",
		left: 0,
		top: "100px",
		padding: "6px 8px",
		backgroundColor: "#fff",
	},
	navigator__position: {
		margin: "7px 0",
		width: "10px",
		height: "10px",
		borderRadius: "50%",
		backgroundColor: "#c4c4c4",
	},
	navigator__position_selected: { backgroundColor: "#4a4a4a" },
	navigator__tooltip: {
		position: "fixed",
		left: "26px",
		padding: "4px",
		fontSize: "10px",
		lineHeight: "12px",
		fontWeight: "bold",
		color: "#000",
		backgroundColor: "#ffb800",
		borderRadius: "3px",
		whiteSpace: "nowrap",
		transform: "translate(5px, -25%)",
		"&:after": {
			position: "absolute",
			width: 0,
			height: 0,
			content: '" "',
			borderTop: "solid transparent 5px",
			borderBottom: "solid transparent 5px",
			borderRight: "solid #ffb800 5px",
			left: "-5px",
			top: "50%",
			transform: "translateY(-50%)",
		},
	},
	navigator__tooltip_hidden: { display: "none" },
}

export default withStyles(styles)(({ positions, className, classes }) => {
	const [selectedPosition, setSelectedPosition] = useState(0)
	const [refPositions, setRefPositions] = useState([])

	useEffect(() => {
		const scrollPos$ = fromEvent(document, "scroll")
			.pipe(
				tap(() => {
					setRefPositions(
						positions.map(position => ({
							id: position.id,
							y: document
								.getElementById(position.anchor)
								.getBoundingClientRect().y,
						}))
					)
				})
			)
			.subscribe()

		return () => scrollPos$.unsubscribe()
	}, [positions])

	useEffect(() => {
		if (refPositions.length) {
			if (refPositions[0].y > 0) setSelectedPosition(0)
			else {
				setSelectedPosition(refPositions.find(pos => pos.y > 0).id - 1)
			}
		}
	}, [JSON.stringify(refPositions)])

	const onClick = setSelectedPosition
	const [tooltipContent, setTooltipContent] = useState(null)
	const [tooltipPosition, setTooltipPosition] = useState(null)

	return (
		<div className={classNames("navigator", className, classes.navigator)}>
			{positions.map(position => (
				<a key={position.id} href={`#${position.anchor}`}>
					<div
						className={classNames(
							"navigator__position",
							classes.navigator__position,
							{
								[classes.navigator__position_selected]:
									position.id === selectedPosition,
							}
						)}
						onClick={() => onClick(position.id)}
						onMouseOver={evt => {
							setTooltipPosition(evt.target.getBoundingClientRect().top)
							setTooltipContent(position.label)
						}}
						onMouseOut={() => setTooltipContent(null)}
					/>
				</a>
			))}
			<div
				style={{ top: `${tooltipPosition}px` }}
				className={classNames(
					"navigator__tooltip",
					classes.navigator__tooltip,
					{
						[classes.navigator__tooltip_hidden]: tooltipContent === null,
					}
				)}
			>
				{tooltipContent}
			</div>
		</div>
	)
})
