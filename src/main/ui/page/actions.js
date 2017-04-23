import * as t from "./actionTypes";

export function setPage(id) {
  return {
    type: t.SET_PAGE,
    payload: { id }
  };
}
