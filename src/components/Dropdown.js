import React, { useState, useRef, useEffect } from "react"
import withStyles from "react-jss"
import { Button } from "."
import classNames from "classnames"
import { BehaviorSubject, fromEvent } from "rxjs"
import { map, withLatestFrom, filter, tap } from "rxjs/operators"

const styles = {
	dropdown: {
		position: "relative",
		height: "100%",
	},
	dropdownContainer: {
		position: "absolute",
		zIndex: 10,
	},
	dropdownContainer_hidden: { display: "none" },
}

export default withStyles(styles)(
	({
		DropdownButton = ({ onClick }) => (
			<Button onClick={onClick}>Dropdown</Button>
		),
		dropdownButtonChildren,
		classes,
		className,
		children,
	}) => {
		const dropdownContainerRef = useRef()
		const [showDropdown, setShowDropdown] = useState(false)
		const showDropdown$ = useRef(new BehaviorSubject(false)).current
		useEffect(() => showDropdown$.next(showDropdown), [showDropdown])

		useEffect(() => {
			const sub$ = fromEvent(document, "click")
				.pipe(
					map(evt => evt.target),
					withLatestFrom(showDropdown$),
					filter(([_el, showDropdown]) => showDropdown),
					filter(([el]) => !dropdownContainerRef.current.contains(el))
				)
				.subscribe(() => setShowDropdown(false))

			return () => sub$.unsubscribe()
		}, [dropdownContainerRef])

		return (
			<div className={classNames(classes.dropdown, className)}>
				<DropdownButton onClick={() => setShowDropdown(!showDropdown)}>
					{dropdownButtonChildren}
				</DropdownButton>
				<div
					ref={dropdownContainerRef}
					className={classNames(
						"dropdown-container",
						classes.dropdownContainer,
						{
							[classes.dropdownContainer_hidden]: !showDropdown,
						}
					)}
				>
					{children}
				</div>
			</div>
		)
	}
)
