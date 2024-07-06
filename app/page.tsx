"use client";
import React, { useEffect, useState } from "react";
import { color, motion } from "framer-motion";
import { SparklesCore } from "../components/ui/sparkles";
import { LampContainer } from "../components/ui/lamps";
import Chart from "react-apexcharts";
import { Switch } from "@nextui-org/switch";
import { Dropdown } from "flowbite-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
var chartptions = {
  series: [30], // Replace with your dynamic temperature value
  options: {
    chart: {
      height: 250,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#65f0c8",
          strokeWidth: "50%", // Control the width of the background track
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#ffffff",
            fontSize: "17px",
          },
          value: {
            formatter: function (val: any) {
              return `${parseInt(val)}°C`;
            },
            color: "#ffffff",
            fontSize: "16px",
            show: true,
          },
          total: {
            show: true,
            label: "Temperature",
            color: "#ffffff",
            fontSize: "13px",
            formatter: function (w: any) {
              return `${w.globals.seriesTotals[0]}°C`;
            },
          },
        },
        stroke: {
          lineCap: "round",
          width: 55, // Control the width of the bar
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#FF0000"], // End color (red)
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: ["#FFFF00"], // Start color (yellow)
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Temperature"],
  },
};

var humidityoptions = {
  series: [90], // Replace with your dynamic temperature value
  options: {
    chart: {
      height: 250,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#65f0c8",
          strokeWidth: "50%", // Control the width of the background track
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#ffffff",
            fontSize: "10px",
          },
          value: {
            formatter: function (val: any) {
              return `${parseInt(val)}°C`;
            },
            color: "#ffffff",
            fontSize: "16px",
            show: true,
          },
          total: {
            show: true,
            label: "Humidity",
            color: "#ffffff",
            fontSize: "13px",
            formatter: function (w: any) {
              return `${w.globals.seriesTotals[0]}%`;
            },
          },
        },
        stroke: {
          lineCap: "round",
          width: 55, // Control the width of the bar
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#0c28f7"], // End color (red)
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: ["#34e5eb"], // Start color (yellow)
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Humidity"],
  },
};

const customGradient = {
  background: `conic-gradient(from 0deg, yellow, red ${30}%)`,
};

export default function Home() {
  const [age, setAge] = React.useState("");
  const [devicedetails, setdevicedetails] = useState([
    { Desktop: { starttime: "7:30:00 A.M", endtime: "6:30:00 P.M" } },
    { Lamp: { starttime: "7:30:00 A.M", endtime: "6:30:00 P.M" } },
  ]);
  const [starttime, setstarttime] = useState("");
  const [selecteddevice, setselecteddevice] = useState("");
  const [currentdevice, setcurrentdevice] = useState([]);
  const [endtime, setendtime] = useState("");
  const handleChange = (event: any) => {
    event.preventDefault();
    console.log(event.target.value);
    setselecteddevice(event.target.value);
  };
  const handlestarttime = (e: any) => {
    console.log(e);
    const h = e.$H;
    const m = e.$m;
    const time = `${h}:${m}`;
    console.log(time);
    const date = new Date(e.$d);
    setstarttime(date.toLocaleTimeString());
  };
  const handleendtime = (e: any) => {
    console.log(e);
    const h = e.$H;
    const m = e.$m;
    const time = `${h}:${m}`;
    console.log(time);
    const date = new Date(e.$d);
    setendtime(date.toLocaleTimeString());
  };
  const changetime = () => {
    let currdevice = "";
    const updateddetails = devicedetails.map((c) => {
      if (c[selecteddevice]) {
        starttime.length !== 0 && (c[selecteddevice].starttime = starttime);
        endtime.length !== 0 && (c[selecteddevice].endtime = endtime);
        currdevice = c;
        return c;
      }
      return c;
    });
    console.log(updateddetails);
    setdevicedetails(updateddetails);
    console.log(currdevice);
    setcurrentdevice(currdevice[selecteddevice]);
    setstarttime("");
    setendtime("");
  };
  useEffect(() => {
    console.log(selecteddevice);
    if (selecteddevice.length !== 0) {
      const currdevice = devicedetails.filter(
        (c) => c[selecteddevice] !== undefined
      );
      console.log(currdevice);
      setcurrentdevice(currdevice[0][selecteddevice]);
    }
  }, [selecteddevice]);
  return (
    <div className="h-screen relative w-full bg-[#00010a] flex flex-col items-center justify-center overflow-hidden rounded-md">
      {/* <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="opaque"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div> */}
      {/* <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Build great products
      </h1> */}
      <div className="bg-black w-[95vw] h-[95vh] bg-tran flex justify-center  items-center">
        <div className=" w-[100%]  h-full flex flex-col  items-center justify-center gap-2 ">
          <div className="h-[45%] border border-slate-600   w-[80vw] flex gap-32 justify-center  items-center relative bg-[#040101] rounded-md  ">
            <h1 className=" absolute top-0 left-0 p-1 text-slate-800 font-medium bg-gray-100 w-max px-2 py-1 ">
              Living room
            </h1>
            <div className="tempchartt  w-[320px] h-[220px] flex justify-center bg-black rounded-md   ">
              {" "}
              <Chart
                options={chartptions.options}
                series={chartptions.series}
                type="radialBar"
                height={"100%"}
              />
            </div>
            <div className="tempchart w-[320px] h-[220px] flex justify-center bg-black rounded-md ">
              <Chart
                options={humidityoptions.options}
                series={humidityoptions.series}
                type="radialBar"
                height={"100%"}
              />
            </div>
          </div>
          <div className=" h-[45%] border border-slate-500 flex items-center gap-4 w-[80vw]  justify-center bg-[#0b0202] rounded-md p-2 relative ">
            <h1 className=" absolute top-0 left-0 p-1 text-slate-800 font-medium bg-cyan-200 w-max px-2 py-1 ">
              Your Devices
            </h1>
            <div className=" w-[400px] h-[250px] bg-[#208289] flex flex-col justify-start items-between rounded-md my-1 border border-slate-300">
              <div className=" w-full flex justify-center">
                {" "}
                <img
                  className=" w-[200px] h-[200px]"
                  src="./monitor.png"
                  alt=""
                />
              </div>

              <div className=" flex justify-between items-center px-4">
                <h1 className=" font-medium text-slate-200">Desktop</h1>
                <Switch defaultSelected aria-label="Automatic updates" />
              </div>
            </div>
            <div className=" w-[400px] h-[250px] bg-[#113e57] flex flex-col justify-start items-between rounded-md border border-slate-300">
              <div className=" w-full flex justify-center">
                {" "}
                <img
                  className="lamp w-[200px] h-[200px]"
                  src="./lamp.png"
                  alt=""
                />
              </div>

              <div className=" flex justify-between items-center px-4">
                <h1 className="font-medium text-slate-200">Lamp</h1>
                <Switch defaultSelected aria-label="Automatic updates" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" min-w-[350px] w-[20%] h-full bg-black rounded-md overflow-hidden mr-4  ">
          <div className=" h-10 bg-gray-900 w-full flex justify-between items-center px-4">
            <h1>Timer</h1>
            <Switch defaultSelected aria-label="Automatic updates" />
          </div>
          <div className=" flex justify-between items-center w-full px-4 mt-4 ">
            <div className="">
              <h1 className=" text-white"> Select Device</h1>
            </div>
            <div className="">
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  border: "1px solid white",
                  color: "white",
                  borderRadius: "5px",
                }}
                size="small"
              >
                <InputLabel
                  id="demo-select-small-label "
                  sx={{ color: "white" }}
                >
                  Devices
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selecteddevice}
                  label="Devices"
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  <MenuItem selected value={selecteddevice}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Desktop"}>Desktop</MenuItem>
                  <MenuItem value={"Lamp"}>Lamp</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {currentdevice.length !== 0 && (
            <div className=" bg-black py-2">
              <div className=" flex gap-4 items-center px-4">
                <h1>Active timer</h1>
                <div className="">
                  {currentdevice.starttime} - {currentdevice.endtime}
                </div>
              </div>
              <div className=" flex justify-between gap-4 mr-4 items-center px-4">
                <div className="">
                  <h1> Select Time</h1>
                </div>
                <div className=" flex  justify-center w-max ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        border: "1px solid white",
                        width: "100px",
                      }}
                    >
                      <MobileTimePicker
                        onChange={(e) => handlestarttime(e)}
                        sx={{
                          width: "100px",
                        }}
                        defaultValue={dayjs("2022-04-17T15:30")}
                      />
                    </Box>
                  </LocalizationProvider>
                </div>
                <div className=" flex  justify-center ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        border: "1px solid white",
                        width: "100px",
                      }}
                    >
                      <MobileTimePicker
                        onChange={(e) => handleendtime(e)}
                        defaultValue={dayjs("2022-04-17T15:30")}
                      />
                    </Box>
                  </LocalizationProvider>
                </div>
              </div>
              <div className=" w-full flex justify-center items-center">
                <button
                  onClick={() => changetime()}
                  className=" bg-cyan-500 w-max px-2 py-1"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
