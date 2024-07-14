import React from "react";
import DndComponent from "./DndComponent";
import "./App.css";
import { Grid } from "@mui/material";
import { ICommonComponent, IListItem } from "./interface";

function App() {
  const WithSortableItemContainer = ({ children }: ICommonComponent) => (
    <Grid item md={4}>
      {children}
    </Grid>
  );
  const RenderListItem = ({ item }) => (
    <div className={item.name}>{item.name}</div>
  );
  return (
    <Grid container spacing={2}>
      <DndComponent
        WithSortableItemContainer={WithSortableItemContainer}
        items={[
          { id: 1, name: "one" },
          { id: 2, name: "two" },
          { id: 3, name: "three" },
          { id: 4, name: "four" },
          { id: 5, name: "five" },
          { id: 6, name: "six" },
          { id: 7, name: "seven" },
        ]}
        RenderListItem={RenderListItem}
        onDragEnd={(items) => console.log(items)}
      />
    </Grid>
  );
}

export default App;
