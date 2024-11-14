// eslint-disable-next-line no-unused-vars
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// eslint-disable-next-line no-unused-vars
import { Box, Typography } from "@mui/material";
import { columns, rows } from "./data";
import Header from "../../components/Header";

const Invoices = () => {
  return (
<Box>
  
        <Header title="INVOICES" subTitle="List of Invoice Balances" />
  
  
        <Box sx={{ height: 650,   mx: "auto" }}>
        <DataGrid
          checkboxSelection
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows}
          // @ts-ignore
          columns={columns}
        />
      </Box>
  
  
  
</Box>

  );
};

export default Invoices;
