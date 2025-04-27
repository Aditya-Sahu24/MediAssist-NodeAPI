import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

import AuthRoutes from "./routes/authRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import PatientRoutes from "./routes/PatientRoutes";
import AppointmentRoutes from "./routes/AppointmentRoutes";
import BillingRoutes from "./routes/BillingRoutes";
import MedicalRecordsRoutes from "./routes/MedicalRecordsRoutes";
import PrescriptionRoutes from "./routes/PrescriptionRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const swaggerDocument = require("./docs/swagger.json");
app.use("/app", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Use auth routes
app.use("/auth", AuthRoutes);

app.use("/DoctorDetails", DoctorRoutes);
app.use("/PatientDetails", PatientRoutes);
app.use("/AppointmentDetails", AppointmentRoutes);
app.use("/MedicalRecordDetails", MedicalRecordsRoutes);
app.use("/PrescriptionDetails", PrescriptionRoutes);
app.use("/BillingDetails", BillingRoutes);
app.use("/Dashboard", DashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Socket.IO server running");
});
