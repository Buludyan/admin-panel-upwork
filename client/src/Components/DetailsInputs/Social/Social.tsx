import { FormControl, TextField } from "@mui/material";
import React from "react";
import { useActions } from "../../../Hooks/Actions";
import { useAppSelector } from "../../../Hooks/Selector";
import "./Social.scss";

export const Social = () => {
  const { description, links } = useAppSelector((state) => state.details);
  const { setDescription, setSocial } = useActions();

  return (
    <div className="social">
      <div className="social__inner">
        <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
          <TextField
            id="linkedin"
            label="Linkedin URL"
            variant="outlined"
            value={links[0][1]}
            onChange={(event) => setSocial(event)}
          />
        </FormControl>
        <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
          <TextField
            id="facebook"
            label="Facebook URL"
            variant="outlined"
            value={links[1][1]}
            onChange={(event) => setSocial(event)}
          />
        </FormControl>
        <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
          <TextField
            id="instagram"
            label="Instagram URL"
            variant="outlined"
            value={links[2][1]}
            onChange={(event) => setSocial(event)}
          />
        </FormControl>
        <FormControl sx={{ ml: 2, mt: 1, width: "300px" }}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            rows={5}
            multiline={true}
            value={description}
            onChange={(event) => setDescription(event)}
          />
        </FormControl>
      </div>
    </div>
  );
};
