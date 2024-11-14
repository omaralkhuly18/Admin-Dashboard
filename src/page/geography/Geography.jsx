// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line no-unused-vars
import { ResponsiveChoropleth } from "@nivo/geo";
import { Box, useTheme } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { geo } from "./world_countries";
// eslint-disable-next-line no-unused-vars
import { data } from "./data";
import Geo from "./geo";
import Header from "../../components/Header";

const Geography = () => {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  return (
    <Box>
      <Header title="Geography" subTitle="Simple Geography Chart" />

      <Geo />
    </Box>
  );
};

export default Geography;
