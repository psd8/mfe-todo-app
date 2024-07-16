import React, { Suspense, useCallback, useEffect, useState } from "react";
import "./App.css";
import { ICommonComponent } from "./interface";
import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import Data from "./data.json";
import useFetch from "./hooks";

const DndComponent = React.lazy(() => import("DndComponent/Grid"));
function App() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { data, isLoading } = useFetch("http://localhost:9999/data");
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleClickOpen = (url: string) => {
    setImageUrl(url);
  };

  const handleClose = () => {
    setImageUrl("");
  };

  const WithSortableItemContainer = useCallback(
    ({ children }: ICommonComponent) => (
      <Grid item md={4}>
        {children}
      </Grid>
    ),
    []
  );
  const RenderListItem = useCallback(
    ({ item }) => (
      <Card onClick={() => handleClickOpen(item.thumbnail)}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={140}
            animation="wave"
          />
        )}
        <CardMedia
          component="img"
          height="140"
          image={item.thumbnail}
          alt={item.name}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    ),
    [imageLoaded]
  );

  return (
    <Suspense fallback={"loading"}>
      <div className="App">
        <body>
          <main>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
            >
              {!isLoading && (
                <DndComponent
                  WithSortableItemContainer={WithSortableItemContainer}
                  items={data}
                  RenderListItem={RenderListItem}
                  onDragEnd={(items) => console.log(items)}
                  onClick={handleClickOpen}
                />
              )}
            </Grid>
            <Dialog
              open={!!imageUrl}
              onClose={handleClose}
              maxWidth="md"
              fullWidth
            >
              <DialogContent>
                <img src={imageUrl} style={{ width: "100%", height: "auto" }} />
              </DialogContent>
            </Dialog>
          </main>
        </body>
      </div>
    </Suspense>
  );
}

export default App;
