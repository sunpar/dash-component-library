import React, { useEffect, useRef } from "react";
import { Button } from ".";
import { useSession } from "../context";
import { Subject } from "rxjs";
import { withLatestFrom, pluck } from "rxjs/operators";
import { qAskReplay } from "rxq";
import { withStyles } from "react-jss";
import classNames from "classnames";
import refresh from "../resources/images/refresh.png";

const styles = {
  clearButton: { "&:hover": { backgroundColor: "#fff" } },
  clearButton__refreshIcon: { width: "12px" }
};

export default withStyles(styles)(({ classes }) => {
  const {
    rxq: { doc$ }
  } = useSession()[0];

  const clear$ = useRef(new Subject()).current;
  useEffect(() => {
    const sub$ = clear$
      .pipe(
        withLatestFrom(doc$),
        pluck(1),
        qAskReplay("ClearAll")
      )
      .subscribe();

    return () => sub$.unsubscribe();
  }, [clear$, doc$]);

  return (
    <Button
      theme="light"
      className={classNames("clear-button", classes.clearButton)}
      Icon={
        <img
          className={classNames(
            "clear-button__refresh-icon",
            classes.clearButton__refreshIcon
          )}
          src={refresh}
        />
      }
      onClick={() => clear$.next()}
    >
      Clear Filters
    </Button>
  );
});
