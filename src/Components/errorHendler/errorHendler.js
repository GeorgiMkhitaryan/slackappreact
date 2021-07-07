import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { dellErrorMsg } from "../../Reducers/rootReducer";

export default function ErrorMessage(props) {
  const { errorMsg } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(dellErrorMsg());
    }, 5000);
  }, [errorMsg]);
  return (
    <div>
      {errorMsg ? (
        <div>
          <div
            className={
              errorMsg.success ? "validation success" : "validation warning"
            }
          >
            {errorMsg.message}
          </div>
        </div>
      ) : null}
    </div>
  );
}
