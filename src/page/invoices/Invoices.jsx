// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../firebaseConfig"; // إعدادات Firebase
import { columns } from "./data"; // مسار ملف الأعمدة


const Invoices = () => {
  const [rows, setRows] = useState([]); // بيانات الصفوف
  const [loading, setLoading] = useState(true); // حالة التحميل

  // استدعاء البيانات من Firestore
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "invoices")); // استرجاع البيانات
        const fetchedRows = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRows(fetchedRows); // تعيين البيانات إلى الحالة
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false); // إنهاء التحميل
      }
    };

    fetchInvoices();
  }, []);

  return (
    <Box>
      <Header title="INVOICES" subTitle="List of Invoice Balances" />
      <Box sx={{ height: 650, mx: "auto", mt: 4 }}>
        <DataGrid
          checkboxSelection
          loading={loading}
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows} // البيانات التي سيتم عرضها
          columns={columns} // الأعمدة المعرفة مسبقًا
        />
      </Box>
    </Box>
  );
};

export default Invoices;
