import React from "react"
import classNames from "classnames"
import withStyles from "react-jss"

const styles = {
	kpi: { textAlign: "center" },
	kpi__label: {
		fontSize: "14px",
		fontWeight: "normal",
		color: "#979797",
	},
	kpi__value: {
		fontSize: "64px",
		fontWeight: "500",
		color: "#ffb800",
	},
}

export default withStyles(styles)(({ label, className, classes, children }) => {
	return (
		<div className={classNames("kpi", classes.kpi, className)}>
			<div className={classNames("kpi__label", classes.kpi__label)}>
				{label}
			</div>
			<div className={classNames("kpi__value", classes.kpi__value)}>
				{children}
			</div>
		</div>
	)
})
