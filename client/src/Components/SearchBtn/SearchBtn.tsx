import React, { FC } from "react";
import "./SearchBtn.scss";
import Button from "@mui/material/Button";
import { adminPanelApi } from "../../Axios/Axios";
import { useActions } from "../../Hooks/Actions";

interface SearchBtnProps {
  district: string;
  category: string;
}

export const SearchBtn: FC<SearchBtnProps> = ({ district, category }) => {
  const { setCollegesData } = useActions();

  const handleSearchClick = async () => {
    const response = await adminPanelApi.fetchColleges({
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
