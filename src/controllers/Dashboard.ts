import { Request, Response } from "express";
import { getDbConnection } from "../config/db";

export const Dashboard = async (req: Request, res: Response) => {
  try {
    const pool = await getDbConnection();
    const request = pool.request();

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const query = `
      SELECT 
        (SELECT COUNT(*) FROM Doctor) AS TotalDoctors,
        (SELECT COUNT(*) FROM Patient) AS TotalPatients,
        (SELECT ISNULL(SUM(Amount), 0) FROM Billing WHERE PaymentStatus = 'Paid') AS TotalRevenue,
        (SELECT COUNT(*) FROM Appointment WHERE AppointmentDate = @Today) AS TodaysAppointments
    `;

    const result = await request.input("Today", today).query(query);

    const stats = result.recordset[0];

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: {
        totalDoctors: stats.TotalDoctors,
        totalPatients: stats.TotalPatients,
        totalRevenue: stats.TotalRevenue,
        todaysAppointments: stats.TodaysAppointments,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
