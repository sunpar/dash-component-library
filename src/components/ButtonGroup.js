import React from "react"
import { Button } from "."
import classNames from "classnames"
import withStyles from "react-jss"

const styles = {
	buttonGroup: { display: "flex" },
	buttonGroup__button: {
		flexGrow: 1,
		margin: "0 5px",
	},
	buttonGroup__button_inactive: {
		color: "#979797",
		borderColor: "#979797",
	},
}

export default withStyles(styles)(
	({ buttons, selectedButton, onChange, className, classes, size=false }) => {
		const onClick = onChange

		return (
			<div
				className={classNames("button-group", classes.buttonGroup, className)}
			>
				{buttons.map(button => (
					<Button
						key={button.name}
						className={classNames(
							"button-group__button",
							classes.buttonGroup__button,
							{
								[classes.buttonGroup__button_inactive]:
									button.name !== selectedButton,
							}
						)}
						size={size}
						theme={button.name === selectedButton ? "dark" : "light"}
						onClick={() => onClick(button.name)}
					>
						{button.label}
					</Button>
				))}
			</div>
		)
	}
)
