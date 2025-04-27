import { Request, Response } from "express";
import { getDbConnection } from "../config/db";

export const MedicalRecords = async (req: Request, res: Response) => {
  const { RecordID, PatientID, Diagnosis, Treatment, Notes, Date, Type } =
    req.body;

  try {
    const pool = await getDbConnection();

    const result: any = await pool
      .request()
      .input("RecordID", RecordID)
      .input("PatientID", PatientID)
      .input("Diagnosis", Diagnosis)
      .input("Treatment", Treatment)
      .input("Notes", Notes)
      .input("Date", Date)
      .input("Type", Type)
      .execute("Proc_MedicalRecord");

    // Extract IsSuccess and Msg from the first recordset
    const { IsSuccess, Msg } = result?.recordsets[0]?.[0] || {};

    let responseData = [];

    // Handle different types
    if (Type === 3 || Type === 4) {
      // For type 3 (Retrieve by ID) and type 4 (Retrieve All), use the first recordset as the data
      responseData = result?.recordsets[0];
    }

    // Handle success flag
    const success = IsSuccess !== undefined ? IsSuccess : true;

    // Determine the message based on the type
    let message = Msg;

    if (Type === 1) {
      message = message || "Data saved successfully";
    } else if (Type === 2) {
      message = message || "Data updated successfully";
    } else if (Type === 3) {
      message = message || "Data retrieved successfully";
    } else if (Type === 4) {
      message = "All Data retrieved successfully";
    } else if (Type === 5) {
      message = "Data deleted successfully";
    }

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
