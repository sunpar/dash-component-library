import React from "react"
import classNames from "classnames"
import { withStyles } from "react-jss"
import arrow from "../resources/images/right-arrow.png"

const styles = {
	analystLink: {
		display: "flex",
		paddingRight: 0,
		border: "none",
		fontSize: "10px",
		fontWeight: 500,
		color: "#4a4a4a",
		textDecoration: "none",
		"&:hover": { color: "#4a4a4a" },
		"&:visited": { color: "#4a4a4a" },
	},
	analystLink__arrow: {
		marginLeft: "6px",
		width: "16px",
	},
}

export default withStyles(styles)(({ className, url, classes }) => {
	return (
		<a
			className={classNames("analyst-link", classes.analystLink, className)}
			href={url}
			target="_blank"
		>
			GO TO ANALYST VIEW
			<img
				src={arrow}
				className={classNames(
					"analyst-link__arrow",
					classes.analystLink__arrow
				)}
			/>
		</a>
	)
})
