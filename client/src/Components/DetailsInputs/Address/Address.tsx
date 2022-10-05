import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useActions } from "../../../Hooks/Actions";
import { useAppSelector } from "../../../Hooks/Selector";
import "./Address.scss";
import { states, distrcits } from "../../../StaticData/StaticData";

export const Address = () => {
  const { address, contactNumber, emailAddress } = useAppSelector(
    (state) => state.details
  );
  const { setState, setDistrict, setPinCode, setContact, setEmail } =
    useActions();
  const [districtsList, setDistrictsList] = useState<string[] | null>(null);
  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    setDistrict("");
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setDistrict(event.target.value);
  };
  useEffect(() => {
    // @ts-ignore
    setDistrictsList(distrcits[address.state]);
  }, [address]);

  return (
    <div className="address">
      <div className="address__inner">
        <Typography ml={2}>Address:</Typography>
        <FormControl sx={{ ml: 2, mt: 1 }}>
          <InputLabel id="state">State</InputLabel>
          <Select
            labelId="state"
            id="state-select"
            value={address.state}
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
            value={address.city}
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
          <TextField
            id="pin"
            label="Pin code"
            variant="outlined"
            value={address.pinCode}
            onChange={(event) => setPinCode(event)}
          />
        </FormControl>
        <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
          <TextField
            id="contact"
            label="Contact"
            variant="outlined"
            value={contactNumber}
            onChange={(event) => setContact(event)}
          />
        </FormControl>
        <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
          <TextField
            id="email"
            label="Email id"
            variant="outlined"
            value={emailAddress}
            onChange={(event) => setEmail(event)}
          />
        </FormControl>
      </div>
    </div>
  );
};
