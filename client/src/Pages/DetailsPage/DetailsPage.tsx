import React from "react";
import { useParams } from "react-router-dom";
import { DetailsInputs } from "../../Components/DetailsInputs/DetailsInputs";
import "./DetailsPage.scss";

export const DetailsPage = () => {
  // const id = useParams();
  return (
    <div className="detailsPage">
      <div className="detailsPage__inner">
        <DetailsInputs />
      </div>
    </div>
  );
};
