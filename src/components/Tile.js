import React, { useEffect, useRef } from "react"
import classNames from "classnames"
import { useSession } from "../context"
import { Subject, from } from "rxjs"
import { withLatestFrom, switchMap, mergeMap, catchError } from "rxjs/operators"
import withStyles from "react-jss"
import { DownloadButton } from "."

const styles = {
	tile: {
		position: "relative",
		padding: "16px",
		backgroundColor: "#fff",
	},
	tileTitle: {
		marginBottom: "30px",
		textAlign: "center",
		fontSize: "24px",
		fontWeight: "bold",
		color: "#000",
	},
}

export default withStyles(styles)(
	({ title, anchor, downloadIds = [], className, classes, children }) => {
		const {
			rxq: { doc$ },
		} = useSession()[0]

		const download$ = useRef(new Subject()).current

		useEffect(() => {
			const sub$ = download$
				.pipe(
					switchMap(id => from(id)),
					withLatestFrom(doc$),
					mergeMap(([id, docHandle]) => docHandle.ask("GetObject", id)),
					mergeMap(objHandle =>
						objHandle.ask("ExportData", "CSV_C", "/qHyperCubeDef")
					),
					catchError(err => {
						console.log(err)
					})
				)
				.subscribe(({ qUrl }) => {
					window.open(`https://dash.condenast.com${qUrl}`)
				})

			return () => sub$.unsubscribe()
		}, [])

		return (
			<div id={anchor} className={classNames("tile", classes.tile, className)}>
				{downloadIds.length > 0 ? (
					<DownloadButton downloadIds={downloadIds} />
				) : null}
				{title ? (
					<div className={classNames("title", classes.tileTitle)}>{title}</div>
				) : null}
				<div className="tile__content">{children}</div>
			</div>
		)
	}
)
