import { eventsMWActions } from "../Slices/EventsMWSlice";
import { collegesListActions } from "../Slices/CollegesListSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { detailsPageActions } from "../Slices/DetailsPageSlice";
import { teachersMWActions } from "../Slices/TeachersMWSlice";
import { reportsMWActions } from "../Slices/ReportsMWSlice";

const actions = {
  ...collegesListActions,
  ...detailsPageActions,
  ...eventsMWActions,
  ...teachersMWActions,
  ...reportsMWActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
