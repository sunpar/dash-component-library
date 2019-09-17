import React, { useRef, useEffect } from "react"
import QdtComponents from "qdt-components"
import { useSession } from "../context"

export default ({ type, app, qdtProps, className }) => {
	const ref = useRef()

	const sessions = useSession()
	const { qdtComponents } = app
		? sessions.find(session => session.name === app)
		: sessions[0]

	useEffect(() => {
		qdtComponents.render(type, qdtProps, ref.current)

		return () => QdtComponents.unmountQdtComponent(ref.current)
	}, [ref, JSON.stringify(qdtProps)])

	return <div className={className} ref={ref} />
}
