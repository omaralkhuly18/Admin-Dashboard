// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { columns } from "./data";
import Header from "../../components/Header";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../firebaseConfig"; // تأكد من استخدام مسار إعداد Firebase الصحيح

const Invoices = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // استدعاء البيانات من Firestore
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "invoices"));
        const fetchedRows = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(fetchedRows);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <Box>
      <Header title="INVOICES" subTitle="List of Invoice Balances" />
      <Box sx={{ height: 650, mx: "auto" }}>
        <DataGrid
          checkboxSelection
          loading={loading}
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
