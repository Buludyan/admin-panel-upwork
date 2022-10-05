import axios, { AxiosResponse } from "axios";
import { IDetails } from "../Interfaces/Interfaces";

const Axios = axios.create({
  baseURL: "http://localhost:4000",
});

export const adminPanelApi = {
  fetchColleges(data: {
    district: string;
    category: string;
  }): Promise<AxiosResponse> {
    return Axios.post("/colleges/list", data);
  },
  fetchDetails(data: { id: string }): Promise<AxiosResponse> {
    return Axios.post("/details/edit", data);
  },
  saveDetails(data: { details: IDetails; id: string }): Promise<AxiosResponse> {
    return Axios.post("/details/save", data);
  },
};
