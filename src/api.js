import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/EmployeeMasterlistSystem/api/"
});

export default api;