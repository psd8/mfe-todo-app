import React, { useState } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import AutoSaveComponent from "./AutoSave";

function App() {
  const [data, setData] = useState<{ [key: string]: any }>({
    /* your initial data */
  });

  const handleDataChange = (newData: { [key: string]: any }) => {
    setData(newData);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <button
          onClick={() =>
            handleDataChange({
              /* new data */
            })
          }
        >
          Update Data
        </button>
        <AutoSaveComponent data={data} url="/api/save" />
      </Grid>
    </Grid>
  );
}

export default App;
