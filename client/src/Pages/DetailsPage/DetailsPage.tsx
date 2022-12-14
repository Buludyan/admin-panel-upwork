import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { adminPanelApi } from "../../Axios/Axios";
import { DetailsInputs } from "../../Components/DetailsInputs/DetailsInputs";
import { useAppDispatch } from "../../Hooks/Dispatch";
import { useAppSelector } from "../../Hooks/Selector";
import { IDetails } from "../../Interfaces/Interfaces";
import { getCollegeData } from "../../Slices/CollegeDataSlice";
import { getCollegeDetails } from "../../Slices/DetailsPageSlice";
import "./DetailsPage.scss";

export const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const details = useAppSelector((state) => state.details);
  const college = useAppSelector((state) => state.college);

  const onSaveHandler = async () => {
    const collegeDetails: IDetails = {
      ...details,
    };

    if (id) {
      await adminPanelApi.saveDetails({
        details: collegeDetails,
        college: {
          ...college,
          lastModified: {
            timeToShow: new Date().toLocaleString(),
            ms: Date.now(),
          },
        },
        id: id,
      });
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getCollegeDetails(id));
      dispatch(getCollegeData(id));
    }
  }, [id, dispatch]);

  return (
    <div className="detailsPage">
      <div className="detailsPage__inner">
        <DetailsInputs />
        <div className="detailsPage__finalBtns">
          <Button variant="contained">
            <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
              Cancel
            </NavLink>
          </Button>
          <Button variant="contained" onClick={onSaveHandler}>
            <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
              Save as draft
            </NavLink>
          </Button>
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </div>
  );
};
