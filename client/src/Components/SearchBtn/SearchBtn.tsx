import React, { FC } from "react";
import "./SearchBtn.scss";
import Button from "@mui/material/Button";
import { adminPanelApi } from "../../Axios/Axios";
import { useActions } from "../../Hooks/Actions";
import { useAppSelector } from "../../Hooks/Selector";

export const SearchBtn: FC = () => {
  const { setCollegesData } = useActions();
  const { status, district, category } = useAppSelector(
    (state) => state.colleges
  );

  const handleSearchClick = async () => {
    const response = await adminPanelApi.fetchColleges({
      status,
      district,
      category,
    });

    // @ts-ignore
    setCollegesData(response.data);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleSearchClick}
        disabled={district ? false : true}
      >
        Search
      </Button>
    </div>
  );
};
