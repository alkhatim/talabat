import { all } from "redux-saga/effects";
import LayoutSaga from "./layoutSaga";

export default function* rootSaga() {
  yield all([LayoutSaga()]);
}
