import axios from "axios";

export const api = axios.create({
  baseURL: "https://hammerhead-app-hql3o.ondigitalocean.app/",
});
