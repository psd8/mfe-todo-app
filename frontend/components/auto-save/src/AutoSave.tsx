import React, { useEffect, useState, useRef, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AutoSaveComponentProps } from "./interface";

const AutoSaveComponent = ({
  data,
  url,
  autoSaveCheckTimer = 10000,
}: AutoSaveComponentProps) => {
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // check for every 5 second if any changes detected then save
  const hasChanges = useRef<boolean>(false); // update flag if any changes detected when data change
  const latestDataRef = useRef<typeof data>(); // store ref to latest data to make sure we don't lose last updated data beteween rerenders caused due to timer state update

  const saveData = useCallback(async () => {
    try {
      setIsSaving(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(latestDataRef.current),
      });
      await response.json();
      // Handle result if needed
      setLastSaved(new Date());
      setElapsedTime(0);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false);
      hasChanges.current = false;
    }
  }, [url]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (hasChanges.current) {
        saveData();
      }
    }, autoSaveCheckTimer);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoSaveCheckTimer, saveData]);

  useEffect(() => {
    if (data?.length) {
      hasChanges.current = true;
      latestDataRef.current = data;
    }
  }, [data]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      !isSaving &&
        setElapsedTime(
          Math.floor((new Date().getTime() - lastSaved.getTime()) / 1000)
        );
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [lastSaved]);

  return (
    <Box display={"flex"} justifyContent={"flex-end"} height={"2rem"}>
      {isSaving && <CircularProgress />}

      {!isSaving && (
        <div>
          Last saved:{" "}
          {elapsedTime > 60
            ? `${(elapsedTime / 60).toFixed(1)} mins ago`
            : `${elapsedTime} seconds ago`}
        </div>
      )}
    </Box>
  );
};

export default AutoSaveComponent;
