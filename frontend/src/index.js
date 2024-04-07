import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AddNewPatient from "./screens/AddNewPatient";
import AllPatients from "./screens/AllPatients";
import PatientInfo from "./screens/PatientInfo";
import Admin from "./screens/Admin";
import EditPatient from "./screens/EditPatient";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/patients/new" element={<AddNewPatient />} />
      <Route path="/patients" element={<AllPatients />} />
      <Route path="/patients/:id" element={<PatientInfo />} />
      <Route path="/patients/:id/edit" element={<EditPatient />} />

      <Route path="/admin" element={<Admin />} />
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
