// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { columns } from "./data"; // العمود فقط ثابت
import Header from "../../components/Header";
import { fetchData } from "./data"; // الدالة لجلب البيانات من Firebase

const Invoices = () => {
  const [rows, setRows] = useState([]); // حالة لتخزين البيانات
  const [loading, setLoading] = useState(true); // حالة لتحميل البيانات

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setRows(fetchedData); // تخزين البيانات في الحالة
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // إيقاف التحميل
      }
    };

    getData();
  }, []);

  return (
    <Box>
      <Header title="INVOICES" subTitle="List of Invoice Balances" />
      <Box sx={{ height: 650, mx: "auto" }}>
        {loading ? ( // عرض مؤشر التحميل أثناء جلب البيانات
          <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
        ) : (
          <DataGrid
            checkboxSelection
            slots={{
              toolbar: GridToolbar,
            }}
            rows={rows}
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default Invoices;
