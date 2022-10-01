import "./Filters.scss";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  categories,
  distrcits,
  states,
  statuses,
} from "../../StaticData/StaticData";
import { SearchBtn } from "../SearchBtn/SearchBtn";

export const Filters = () => {
  const [status, setStatus] = useState("");
  const [state, setState] = useState("");
  const [districtsList, setDistrictsList] = useState<string[] | null>(null);
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    setDistrict("");
    setCategory("");
    // @ts-ignore
    setDistrictsList(distrcits[event.target.value]);
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setDistrict(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <div className="filters">
      <div className="filters__inner">
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status-select"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              {statuses.map((status) => {
                return (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
            sx={{ m: 1, minWidth: 120 }}
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
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            disabled={district ? false : true}
          >
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category-select"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <SearchBtn district={district} category={category} />
      </div>
    </div>
  );
};
