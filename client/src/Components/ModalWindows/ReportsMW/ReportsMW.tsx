import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../Hooks/Actions";
import { useAppSelector } from "../../../Hooks/Selector";
import "./ReportsMW.scss";

export const ReportsMW = () => {
  const {
    isActive,
    reportName,
    reportDate,
    reportLink,
    reportImage,
    reportId,
  } = useAppSelector((state) => state.reports);
  const { setEditReport, updateReport } = useActions();

  const [editInputData, setEditInputData] = useState({
    name: reportName,
    date: reportDate,
    link: reportLink,
    image: reportImage,
  });

  useEffect(
    () =>
      setEditInputData({
        name: reportName,
        date: reportDate,
        link: reportLink,
        image: reportImage,
      }),
    [reportName, reportDate, reportLink, reportImage]
  );

  const onEditCancel = () => {
    setEditReport(false);
    setEditInputData({
      name: reportName,
      date: reportDate,
      link: reportLink,
      image: reportImage,
    });
  };

  const onSaveHandler = () => {
    setEditReport(false);
    updateReport({ ...editInputData, id: reportId });
  };

  const onEditChange = (name: string, value: string) => {
    setEditInputData({
      ...editInputData,
      [name]: value,
    });
  };

  return (
    <div className={isActive ? "modalActive" : "modal"} onClick={onEditCancel}>
      <div className="eventContent" onClick={(e) => e.stopPropagation()}>
        <Typography>Update events table</Typography>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            required
            name="name"
            label="Name"
            variant="outlined"
            value={editInputData.name}
            onChange={(e) => onEditChange(e.target.name, e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            required
            name="date"
            label="Date"
            variant="outlined"
            value={editInputData.date}
            onChange={(e) => onEditChange(e.target.name, e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="link"
            label="Link"
            variant="outlined"
            value={editInputData.link}
            onChange={(e) => onEditChange(e.target.name, e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="image"
            label="Image"
            variant="outlined"
            value={editInputData.image}
            onChange={(e) => onEditChange(e.target.name, e.target.value)}
          />
        </FormControl>
        <div className="eventContent__btns">
          <Button onClick={() => onEditCancel()}>Cancel</Button>
          <Button onClick={onSaveHandler}>Save</Button>
        </div>
      </div>
    </div>
  );
};
