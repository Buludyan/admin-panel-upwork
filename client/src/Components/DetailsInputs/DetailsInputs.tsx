import {
  Card,
  CardMedia,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./DetailsInputs.scss";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { categories } from "../../StaticData/StaticData";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TeachersTable } from "../TeachersTable/TeachersTable";
import { ReportsTable } from "../ReportsTable/ReportsTable";
import { useAppSelector } from "../../Hooks/Selector";
import { EventsTable } from "../EventsTable/EventsTable";
import { useActions } from "../../Hooks/Actions";
import { Address } from "./Address/Address";
import { Social } from "./Social/Social";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const DetailsInputs = () => {
  const { collegeName, programs, images, logo, nirfReport, naacGrade } =
    useAppSelector((state) => state.details);
  const { setPrograms, setNAAC, setNIRF, setName, setImageCheck } =
    useActions();
  const theme = useTheme();

  const [category, setCategory] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;

    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="detailsInputs">
      <div className="detailsInputs__inner">
        <div className="detailsInputs__header">
          <div className="detailsInputs__id">
            <Typography
              sx={{
                width: "50%",
                height: "100%",
                borderRight: "1px solid black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              ID
            </Typography>
            <Typography sx={{ width: "50%" }}>GUID</Typography>
          </div>
          <FormControl sx={{ m: 2 }}>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Publish"
                control={<Radio />}
                label="Publish"
              />
              <FormControlLabel
                value="Recheck"
                control={<Radio />}
                label="Recheck"
              />
              <FormControlLabel
                value="Do not publish"
                control={<Radio />}
                label="Do not publish"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="detailsInputs__nameDrop">
          <FormControl sx={{ m: 2 }}>
            <TextField
              id="name"
              label="College name"
              variant="outlined"
              sx={{ width: "650px" }}
              value={collegeName}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl sx={{ m: 2, width: 300 }}>
            <InputLabel id="categories">Categories</InputLabel>
            <Select
              labelId="categories"
              id="categories-chip"
              multiple
              value={category}
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Categories" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((name) => {
                if (name !== "None") {
                  return (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, category, theme)}
                    >
                      {name}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>
        </div>
        <FormControl sx={{ mt: 4, ml: 2 }}>
          <TextField
            id="name"
            label="Programs"
            variant="outlined"
            value={programs.join(",")}
            onChange={(event) => setPrograms(event)}
          />
        </FormControl>
        <Address />
        <div className="detailsInputs__images">
          <Typography sx={{ ml: 2 }}>College images:</Typography>
          <div className="detailsInputs__imagesList">
            {images.map((img, idx) => {
              return (
                <Card
                  sx={{ width: 100, ml: 2, mt: 1, textAlign: "center" }}
                  key={idx}
                >
                  <CardMedia
                    component="img"
                    alt="image"
                    height="80"
                    image={img[0]}
                  />
                  <Checkbox
                    checked={img[1] === "active" ? true : false}
                    onClick={() => setImageCheck(idx)}
                  />
                </Card>
              );
            })}
          </div>
        </div>
        <div className="detailsInputs__logo">
          <Typography sx={{ ml: 2, mt: 3 }}>Logo:</Typography>
          <Card sx={{ width: 100, ml: 2, mt: 1, textAlign: "center" }}>
            <CardMedia component="img" alt="logo" height="80" image={logo} />
          </Card>
        </div>
        <div className="detailsInputs__grade">
          <FormControl sx={{ ml: 2, mt: 1, width: "100px" }}>
            <TextField
              id="naac"
              label="NAAC"
              variant="outlined"
              value={naacGrade}
              onChange={(event) => setNAAC(event)}
            />
          </FormControl>
          <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
            <TextField
              id="nirf"
              label="NIRF report"
              variant="outlined"
              value={nirfReport}
              onChange={(event) => setNIRF(event)}
            />
          </FormControl>
        </div>
        <Social />
        <EventsTable />
        <TeachersTable />
        <ReportsTable />
      </div>
    </div>
  );
};
