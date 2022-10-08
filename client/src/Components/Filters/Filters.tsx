import "./Filters.scss";
import React, { useEffect, useState } from "react";
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
import { useAppSelector } from "../../Hooks/Selector";
import { useActions } from "../../Hooks/Actions";

export const Filters = () => {
  const { status, state, district, category } = useAppSelector(
    (state) => state.colleges
  );
  const {
    setSearchStatus,
    setSearchState,
    setSearchDistrict,
    setSearchCategory,
  } = useActions();
  const [districtsList, setDistrictsList] = useState<string[] | null>(null);

  useEffect(() => {
    // @ts-ignore
    setDistrictsList(distrcits[state]);
  }, [state]);

  const handleStateChange = (event: SelectChangeEvent) => {
    setSearchState(event.target.value);
    setSearchDistrict("");
    setSearchCategory("");
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setSearchDistrict(event.target.value);
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
              onChange={(event) => setSearchStatus(event.target.value)}
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
              onChange={(event) => setSearchCategory(event.target.value)}
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
        <SearchBtn />
      </div>
    </div>
  );
};
