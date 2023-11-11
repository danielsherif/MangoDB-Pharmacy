import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // backend API URL
  timeout: 5000, // Timeout duration
  headers: {
    "Content-Type": "application/json",
  },
});

export const viewMeds = () => API.get("/Patient/viewMed");
export const getMeds = (id) => API.get(`/Patient/getMed/${id}`);
export const addMedicineToCart = (medicineName, quantity) =>
  API.post("/Patient/addMedicineInCart", { medicineName, quantity });
export const removeMedicineFromCart = (medicineName) =>
  API.delete("/Patient/removecart", { medicineName });
export const viewAllOrders = () => API.get("/Patient/viewListOfOrders");
export const viewOrderDetails = (id) =>
  API.get(`/Patient/viewOrderDetails/${id}`);
export const cancelOrder = (id) => API.post(`/Patient/cancelOrder/${id}`);
export const patientReg = (patient) =>
  API.post("/Patient/createPatient", patient);
export const pharmacistReg = (pharmacist) =>
  API.post("/Guest/regPharma", pharmacist);

export const viewCartItems = (id) => API.get(`/Patient/ViewCartItems/${id}`);
export const changeCartItemAmount = async (id, medicineName, quantity) => {
  const response = await API.post(`/Patient/changeCartItemAmount/${id}`, {
    medicineName,
    quantity,
  });
  return response.data;
};
export const removeCartItems = async (id, medicineName) => {
  await API.delete(`/Patient/removecartItems/${id}`, {
    data: { medicinename: medicineName },
  });
};
export const addressesByPatientId = async (id) => {
  const response = await API.get(`/Patient/addressesByPatientId/${id}`);
  return response.data.addresses;
};
export const addAddress = async (patientId, address) => {
  try {
    const response = await API.post(`/Patient/addAddress/${patientId}`, {
      address,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to add address");
  }
};

export default API;
