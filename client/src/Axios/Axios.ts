import axios, { AxiosResponse } from "axios";

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
};
