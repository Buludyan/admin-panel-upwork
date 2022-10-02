import { collegesListActions } from "./../Slices/CollegesListSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { detailsPageActions } from "../Slices/DetailsPageSlice";

const actions = { ...collegesListActions, ...detailsPageActions };

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
