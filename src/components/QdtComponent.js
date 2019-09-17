import React, { useRef, useEffect } from "react";
import { useSession } from "../context";

export default ({ type, app, qdtProps, className }) => {
  const ref = useRef();

  const sessions = useSession();
  const { qdtComponents } = app
    ? sessions.find(session => session.name === app)
    : sessions[0];

  useEffect(() => {
    qdtComponents.render(type, qdtProps, ref.current);

    return () => qdtComponents.unmountQdtComponent(ref.current);
  }, [ref]);

  return <div className={className} ref={ref} />;
};
