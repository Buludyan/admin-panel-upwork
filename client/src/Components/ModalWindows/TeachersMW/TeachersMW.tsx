import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../Hooks/Actions";
import { useAppSelector } from "../../../Hooks/Selector";
import { ITeacher } from "../../../Interfaces/Interfaces";
import "./TeachersMW.scss";

export const TeacherMW = () => {
  const {
    isActive,
    source,
    teacherName,
    teacherDesignation,
    teacherPhoto,
    teacherQualification,
    teacherDescription,
    teacherPapers,
    teacherBooks,
    teacherId,
  } = useAppSelector((state) => state.teachers);
  const {
    setActiveAddTeacher,
    closeEditTeacher,
    setTeacher,
    updateTeacher,
    deleteTeacher,
  } = useActions();

  const [inputData, setInputData] = useState<ITeacher>({
    name: "",
    designation: "",
    photo: "",
    qualification: "",
    description: "",
    papers: "",
    books: "",
  });

  const [editInputData, setEditInputData] = useState({
    name: teacherName,
    designation: teacherDesignation,
    photo: teacherPhoto,
    qualification: teacherQualification,
    description: teacherDescription,
    papers: teacherPapers,
    books: teacherBooks,
  });

  useEffect(
    () =>
      setEditInputData({
        name: teacherName,
        designation: teacherDesignation,
        photo: teacherPhoto,
        qualification: teacherQualification,
        description: teacherDescription,
        papers: teacherPapers,
        books: teacherBooks,
      }),
    [
      source,
      teacherName,
      teacherDesignation,
      teacherPhoto,
      teacherQualification,
      teacherDescription,
      teacherPapers,
      teacherBooks,
    ]
  );

  const onEditCancel = () => {
    closeEditTeacher();
    setEditInputData({
      name: teacherName,
      designation: teacherDesignation,
      photo: teacherPhoto,
      qualification: teacherQualification,
      description: teacherDescription,
      papers: teacherPapers,
      books: teacherBooks,
    });
  };

  const onSaveHandler = () => {
    setActiveAddTeacher();
    source === "edit"
      ? updateTeacher({ ...editInputData, id: teacherId })
      : setTeacher(inputData);
    setInputData({
      name: "",
      designation: "",
      photo: "",
      qualification: "",
      description: "",
      papers: "",
      books: "",
    });
  };

  const onDeleteHandler = () => {
    deleteTeacher(teacherId);
    closeEditTeacher();
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
      onClick={() => setActiveAddTeacher()}
    >
      <div className="teacherContent" onClick={(e) => e.stopPropagation()}>
        <Typography>Update teachers table</Typography>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            required
            name="name"
            label="Name"
            variant="outlined"
            value={source === "edit" ? editInputData.name : inputData.name}
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
            name="designation"
            label="Designation"
            variant="outlined"
            value={
              source === "edit"
                ? editInputData.designation
                : inputData.designation
            }
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="photo"
            label="Photo"
            variant="outlined"
            value={source === "edit" ? editInputData.photo : inputData.photo}
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="qualification"
            label="Qualification"
            variant="outlined"
            value={
              source === "edit"
                ? editInputData.qualification
                : inputData.qualification
            }
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={
              source === "edit"
                ? editInputData.description
                : inputData.description
            }
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="papers"
            label="Papers"
            variant="outlined"
            value={source === "edit" ? editInputData.papers : inputData.papers}
            onChange={
              source === "edit"
                ? (e) => onEditChange(e.target.name, e.target.value)
                : (e) => onChange(e.target.name, e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <TextField
            name="books"
            label="Books"
            variant="outlined"
            value={source === "edit" ? editInputData.books : inputData.books}
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
