import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../Hooks/Actions";
import { useAppSelector } from "../../../Hooks/Selector";
import { IIvent } from "../../../Interfaces/Interfaces";
import "./EventMW.scss";

export const EventMW = () => {
  const {
    isActive,
    eventTitle,
    eventDate,
    eventLink,
    eventImage,
    source,
    eventId,
  } = useAppSelector((state) => state.events);
  const {
    setActiveAddEvent,
    setEvent,
    closeEditEvent,
    updateEvent,
    deleteEvent,
  } = useActions();

  const [inputData, setInputData] = useState<IIvent>({
    title: "",
    date: "",
    link: "",
    image: "",
  });

  const [editInputData, setEditInputData] = useState({
    title: eventTitle,
    date: eventDate,
    link: eventLink,
    image: eventImage,
  });

  useEffect(
    () =>
      setEditInputData({
        title: eventTitle,
        date: eventDate,
        link: eventLink,
        image: eventImage,
      }),
    [source, eventTitle, eventDate, eventLink, eventImage]
  );

  const onEditCancel = () => {
    closeEditEvent();
    setEditInputData({
      title: eventTitle,
      date: eventDate,
      link: eventLink,
      image: eventImage,
    });
  };

  const onSaveHandler = () => {
    setActiveAddEvent();
    source === "edit"
      ? updateEvent({ ...editInputData, id: eventId })
      : setEvent(inputData);
    setInputData({
      title: "",
      date: "",
      link: "",
      image: "",
    });
  };

  const onDeleteHandler = () => {
    deleteEvent(eventId);
    closeEditEvent();
  };

  const onChange = (name: string, value: string) => {
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const onEditChange = (name: string, value: string) => {
    setEditInputData({
      ...editInputData,
      [name]: value,
    });
  };

  return (
    <div
      className={isActive ? "modalActive" : "modal"}
      onClick={() => setActiveAddEvent()}
    >
      <div className="eventContent" onClick={(e) => e.stopPropagation()}>
        <Typography>Update events table</Typography>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            required
            name="title"
            label="Title"
            variant="outlined"
            value={source === "edit" ? editInputData.title : inputData.title}
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            required
            name="date"
            label="Date"
            variant="outlined"
            value={source === "edit" ? editInputData.date : inputData.date}
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="link"
            label="Link"
            variant="outlined"
            value={source === "edit" ? editInputData.link : inputData.link}
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="image"
            label="Image"
            variant="outlined"
            value={source === "edit" ? editInputData.image : inputData.image}
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <div className="eventContent__btns">
          <Button onClick={() => onEditCancel()}>Cancel</Button>
          {source === "edit" && (
            <Button variant="contained" color="error" onClick={onDeleteHandler}>
              Delete
            </Button>
          )}
          <Button onClick={onSaveHandler}>Save</Button>
        </div>
      </div>
    </div>
  );
};
