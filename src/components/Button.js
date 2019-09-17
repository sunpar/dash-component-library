import React from "react"
import classNames from "classnames"
import withStyles from "react-jss"

const styles = {
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "6px 10px",
		height: "26px",
		fontSize: "12px",
		fontWeight: 500,
		lineHeight: "14px",
		border: "none",
		borderRadius: "3px",
		cursor: "pointer",
		whiteSpace: "nowrap",
	},
	button_dark: {
		backgroundColor: "#4a4a4a",
		color: "#fff",
	},
	button_light: {
		border: "0.5px solid #4a4a4a",
		backgroundColor: "transparent",
		color: "#4a4a4a",
	},
	button_lg: {
		height: "41px",
		padding: "10px 0",
		fontSize: "18px",
		lineHeight: "21px",
		fontWeight: "bold",
	},
	button__iconContainer: {
		position: "relative",
		marginLeft: "10px",
		marginRight: "-5px",
	},
}

export default withStyles(styles)(
	({
		theme = "dark",
		Icon = null,
		size,
		onClick = () => {},
		className = "",
		classes,
		children,
	}) => {
		return (
			<button
				className={classNames("button", classes.button, className, {
					[classes.button_dark]: theme === "dark",
					[classes.button_light]: theme === "light",
					[classes.button_lg]: size === "lg",
				})}
				onClick={onClick}
			>
				{children}
				{Icon !== null ? (
					<div
						className={classNames(
							"button__icon-container",
							classes.button__iconContainer
						)}
					>
						{Icon}
					</div>
				) : null}
			</button>
		)
	}
)
