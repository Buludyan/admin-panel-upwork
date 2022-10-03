import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailsInputs } from "../../Components/DetailsInputs/DetailsInputs";
import { useAppDispatch } from "../../Hooks/Dispatch";
import { getCollegeDetails } from "../../Slices/DetailsPageSlice";
import "./DetailsPage.scss";

export const DetailsPage = () => {
  const id = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id.id !== undefined) {
      dispatch(getCollegeDetails(id.id));
    }
  }, [id.id, dispatch]);

  return (
    <div className="detailsPage">
      <div className="detailsPage__inner">
        <DetailsInputs />
      </div>
    </div>
  );
};
