// import { Request, Response } from "express";
// import { getDbConnection } from "../config/db";

// export const Appointment = async (req: Request, res: Response) => {
//   const {
//     AppointmentID,
//     PatientID,
//     DoctorID,
//     AppointmentDate,
//     TimeSlot,
//     Status,
//     Type,
//   } = req.body;

//   try {
//     const pool = await getDbConnection();

//     const result: any = await pool
//       .request()
//       .input("AppointmentID", AppointmentID)
//       .input("PatientID", PatientID)
//       .input("DoctorID", DoctorID)
//       .input("AppointmentDate", AppointmentDate)
//       .input("TimeSlot", TimeSlot)
//       .input("Status", Status)
//       .input("Type", Type)
//       .execute("Proc_Appointment");

//     // Extract IsSuccess and Msg from the first recordset
//     const { IsSuccess, Msg } = result?.recordsets[0]?.[0] || {};

//     let responseData = [];

//     // Handle different types
//     if (Type === 3 || Type === 4) {
//       // For type 3 (Retrieve by ID) and type 4 (Retrieve All), use the first recordset as the data
//       responseData = result?.recordsets[0];
//     }

//     // Handle success flag
//     const success = IsSuccess !== undefined ? IsSuccess : true;

//     // Determine the message based on the type
//     let message = Msg;

//     if (Type === 1) {
//       message = message || "Data saved successfully";
//     } else if (Type === 2) {
//       message = message || "Data updated successfully";
//     } else if (Type === 3) {
//       message = message || "Data retrieved successfully";
//     } else if (Type === 4) {
//       message = "All Data retrieved successfully";
//     } else if (Type === 5) {
//       message = "Data deleted successfully";
//     }

//     res.status(200).json({
//       success,
//       message,
//       data: responseData,
//     });
//   } catch (error) {
//     console.error("Error executing procedure:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

import { Request, Response } from "express";
import { getDbConnection } from "../config/db";

export const Appointment = async (req: Request, res: Response) => {
  const {
    AppointmentID,
    PatientID,
    DoctorID,
    AppointmentDate,
    TimeSlot,
    Status,
    Type,
  } = req.body;

  try {
    const pool = await getDbConnection();

    const result: any = await pool
      .request()
      .input("AppointmentID", AppointmentID)
      .input("PatientID", PatientID)
      .input("DoctorID", DoctorID)
      .input("AppointmentDate", AppointmentDate)
      .input("TimeSlot", TimeSlot)
      .input("Status", Status)
      .input("Type", Type)
      .execute("Proc_Appointment");

    const { IsSuccess, Msg } = result?.recordsets[0]?.[0] || {};
    let responseData: any[] = [];

    // If Type is 3 or 4, enrich appointment data with patient & doctor names
    if (Type === 3 || Type === 4) {
      responseData = result?.recordsets[0];

      // Fetch all patients
      const patientRes = await pool.request().query("SELECT PatientID, Name FROM Patient");
      const doctorRes = await pool.request().query("SELECT DoctorID, Name FROM Doctor");

      const patients = patientRes.recordset;
      const doctors = doctorRes.recordset;

      // Add patient and doctor names to each appointment record
      responseData = responseData.map((appt) => {
        const patient = patients.find((p) => p.PatientID === appt.PatientID);
        const doctor = doctors.find((d) => d.DoctorID === appt.DoctorID);
        return {
          ...appt,
          PatientName: patient?.Name || "",
          DoctorName: doctor?.Name || "",
        };
      });
    }

    // Determine success
    const success = IsSuccess !== undefined ? IsSuccess : true;

    // Response message based on Type
    let message = Msg;
    if (Type === 1) message = message || "Data saved successfully";
    else if (Type === 2) message = message || "Data updated successfully";
    else if (Type === 3) message = message || "Data retrieved successfully";
    else if (Type === 4) message = "All Data retrieved successfully";
    else if (Type === 5) message = "Data deleted successfully";

    res.status(200).json({
      success,
      message,
      data: responseData,
    });
  } catch (error) {
    console.error("Error executing procedure:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

