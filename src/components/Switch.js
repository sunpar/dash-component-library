import React from "react"
import { Switch as MUISwitch } from "@material-ui/core"
import withStyles from "react-jss"
import classNames from "classnames"

const styles = {
	switchBase: {
		color: "#4A4A4A",
		"&$checked": { color: "#4A4A4A" },
		"&$checked + $track": { backgroundColor: "#C4C4C4" },
		"&:hover": { backgroundColor: "transparent" },
		"&$checked:hover": { backgroundColor: "transparent" },
	},
	thumb: { boxShadow: "none" },
	checked: {},
	track: { backgroundColor: "#C4C4C4" },
	labels: { fontSize: "12px", fontWeight: 500 },
	deSelected: { color: "#C4C4C4" },
}

const Switch = ({
	textLeft,
	valueLeft,
	textRight,
	valueRight,
	state: [value, onChange],
	className,
	classes,
}) => {
	const { labels, deSelected, ...switchClasses } = classes
	const handleChange = (_evt, checked) =>
		onChange(checked ? valueRight : valueLeft)

	return (
		<div className={classNames(labels, className)}>
			<span className={value !== valueLeft ? deSelected : ""}>{textLeft}</span>
			<MUISwitch
				classes={switchClasses}
				onChange={handleChange}
				disableRipple
			/>
			<span className={value !== valueRight ? deSelected : ""}>
				{textRight}
			</span>
		</div>
	)
}

export default withStyles(styles)(Switch)
