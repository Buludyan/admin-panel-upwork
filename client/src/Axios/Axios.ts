import axios, { AxiosResponse } from "axios";
import { ICollege, IDetails } from "../Interfaces/Interfaces";

const Axios = axios.create({
  baseURL: "http://localhost:4000",
});

export const adminPanelApi = {
  fetchColleges(data: {
    status: string;
    district: string;
    category: string;
  }): Promise<AxiosResponse> {
    return Axios.post("/colleges/list", data);
  },
  fetchCollege(data: { id: string }): Promise<AxiosResponse> {
    return Axios.post("/details/college", data);
  },
  fetchDetails(data: { id: string }): Promise<AxiosResponse> {
    return Axios.post("/details/edit", data);
  },
  saveDetails(data: {
    details: IDetails;
    college: ICollege;
    id: string;
  }): Promise<AxiosResponse> {
    return Axios.post("/details/save", data);
  },
};
