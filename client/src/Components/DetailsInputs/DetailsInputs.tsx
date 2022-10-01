import {
  Button,
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
import { categories, states, distrcits } from "../../StaticData/StaticData";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import icon from "../../Assets/icon.png";
import { TeachersTable } from "../TeachersTable/TeachersTable";
import { ReportsTable } from "../ReportsTable/ReportsTable";

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
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [state, setState] = useState("");
  const [districtsList, setDistrictsList] = useState<string[] | null>(null);
  const [district, setDistrict] = useState("");

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    setDistrict("");

    // @ts-ignore
    setDistrictsList(distrcits[event.target.value]);
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setDistrict(event.target.value);
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
            />
          </FormControl>

          <FormControl sx={{ m: 2, width: 300 }}>
            <InputLabel id="categories">Categories</InputLabel>
            <Select
              labelId="categories"
              id="categories-chip"
              multiple
              value={personName}
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
                      style={getStyles(name, personName, theme)}
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
          <TextField id="name" label="Programs" variant="outlined" />
        </FormControl>
        <div className="detailsInputs__address">
          <Typography ml={2}>Address:</Typography>
          <FormControl sx={{ ml: 2, mt: 1 }}>
            <InputLabel id="state">State</InputLabel>
            <Select
              labelId="state"
              id="state-select"
              value={state}
              label="State"
              onChange={handleStateChange}
            >
              {states.map((state) => {
                return (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            sx={{ ml: 2, mt: 1 }}
            disabled={districtsList ? false : true}
          >
            <InputLabel id="district">District</InputLabel>
            <Select
              labelId="district"
              id="district-select"
              value={district}
              label="District"
              onChange={handleDistrictChange}
            >
              {districtsList &&
                districtsList.map((district) => {
                  return (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl sx={{ ml: 2, mt: 1 }}>
            <TextField id="pin" label="Pin code" variant="outlined" />
          </FormControl>
          <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
            <TextField id="contact" label="Contact" variant="outlined" />
          </FormControl>
          <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
            <TextField id="email" label="Email id" variant="outlined" />
          </FormControl>
        </div>
        <div className="detailsInputs__images">
          <Typography sx={{ ml: 2 }}>College images:</Typography>
          <div className="detailsInputs__imagesList">
            {["1", "2", "3", "4"].map((img) => {
              return (
                <Card
                  sx={{ width: 100, ml: 2, mt: 1, textAlign: "center" }}
                  key={img}
                >
                  <CardMedia
                    component="img"
                    alt={img}
                    height="80"
                    image={icon}
                  />
                  <Checkbox />
                </Card>
              );
            })}
          </div>
        </div>
        <div className="detailsInputs__logo">
          <Typography sx={{ ml: 2, mt: 3 }}>Logo:</Typography>
          <Card sx={{ width: 100, ml: 2, mt: 1, textAlign: "center" }}>
            <CardMedia component="img" alt={"img"} height="80" image={icon} />
          </Card>
        </div>
        <div className="detailsInputs__grade">
          <FormControl sx={{ ml: 2, mt: 1, width: "100px" }}>
            <TextField id="naac" label="NAAC" variant="outlined" />
          </FormControl>
          <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
            <TextField id="nirf" label="NIRF report" variant="outlined" />
          </FormControl>
        </div>
        <div className="detailsInputs__social">
          <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
            <TextField id="linkedin" label="Linkedin URL" variant="outlined" />
          </FormControl>
          <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
            <TextField id="facebook" label="Facebook URL" variant="outlined" />
          </FormControl>
          <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
            <TextField
              id="instagram"
              label="Instagram URL"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              rows={5}
              multiline={true}
            />
          </FormControl>
        </div>
        <TeachersTable />
        <ReportsTable />
        <div className="detailsInputs__finalBtns">
          <Button variant="contained">Cancel</Button>
          <Button variant="contained">Save as draft</Button>
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </div>
  );
};
