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
          { id: 1, name: "one", position: 1 },
          { id: 2, name: "two", position: 2 },
          { id: 3, name: "three", position: 3 },
          { id: 4, name: "four", position: 4 },
          { id: 5, name: "five", position: 5 },
          { id: 6, name: "six", position: 6 },
          { id: 7, name: "seven", position: 7 },
        ]}
        RenderListItem={RenderListItem}
        onDragEnd={(items) => console.log(items)}
      />
    </Grid>
  );
}

export default App;
