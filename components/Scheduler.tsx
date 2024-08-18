import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
const Scheduler = ({ notify }: any) => {
  const [selectedDevice, setselectedDevice] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setselectedDevice(event.target.value as string);
  };
  return (
    <div className=" w-full h-full flex flex-col px-6 pt-16 gap-6 relative ">
      <div className=" absolute left-0 right-0 flex justify-center top-2">
        <h2 className=" font-semibold text-xl">Device Schedule</h2>
      </div>
      <div className=" flex justify-between items-center">
        <h4 className=" font-medium ">Select Device</h4>
        <Box sx={{ minWidth: 120 }}>
          <FormControl
            fullWidth
            sx={{ outline: "none", color: "white", padding: "0px" }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedDevice}
              label="Age"
              sx={{ border: "1px solid white", color: "white", padding: "0px" }}
              onChange={handleChange}
            >
              <MenuItem value={"Light"}>Light</MenuItem>
              <MenuItem value={"Fan"}>Fan</MenuItem>
              <MenuItem value={"Desktop"}>Desktop</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      {selectedDevice && (
        <div className=" w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              sx={{ display: "flex", flexDirection: "row", width: "100%" }}
              components={["MobileTimePicker"]}
            >
              <DemoItem
                sx={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div className=" flex justify-between w-[350px]">
                  <h4 className=" font-medium ">Start Time</h4>
                  <MobileTimePicker
                    className=" testing w-[10px] min-w-0 "
                    defaultValue={dayjs("2022-04-17T15:30")}
                    sx={{ color: "cyan", backgroundColor: "darkblue" }}
                  />
                </div>

                <div className=" flex justify-between">
                  <h4 className=" font-medium ">End Time</h4>
                  <MobileTimePicker
                    className=" testing w-[10px] min-w-0 "
                    defaultValue={dayjs("2022-04-17T15:30")}
                    sx={{ color: "cyan", backgroundColor: "darkblue" }}
                  />
                </div>
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <div className=" w-full mt-8 flex justify-center">
            <button
              onClick={() => notify()}
              className=" w-max px-4 py-2 bg-pink-400"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
