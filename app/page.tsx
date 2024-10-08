"use client";
import React, { useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import axios from "axios";
import Starfield from "@/components/Starfield";
import { MdOutlineSchedule } from "react-icons/md";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import FormGroup from "@mui/material/FormGroup";
import DevicesIcon from "@mui/icons-material/Devices";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import SwitchMain, { SwitchProps } from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import Devices from "@/components/Devices";
import Scheduler from "@/components/Scheduler";
const IOSSwitch = styled((props: SwitchProps) => (
  <SwitchMain
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 52,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    color: "#000000",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#ffffff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#000000",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#c92492",
      border: "6px solid #c92492",
    },
    "&.Mui-disabled": {
      color: "#c92492",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? "#ffffff" : "#000000",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    color: "#c92492",
    backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#ffffff",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Iot = () => {
  const [phase, setphase] = useState<boolean>(false);
  const [scope, animate] = useAnimate();
  const [open, setopen] = useState(false);
  const [scopesec, animatesec] = useAnimate();
  const [scopen, animaten] = useAnimate();
  const [scopesecn, animatesecn] = useAnimate();
  const [scopeMoon, animateMoon] = useAnimate();
  const [scopeSun, animateSun] = useAnimate();
  const [dhtdata, setdhtdata] = useState({ temperature: 32.8, humidity: 98 });
  const [show, setshow] = useState(false);
  const changephase = () => {
    switchon(!phase);
    setphase(!phase);
    lightcontrol(!phase);
  };
  const notify = () => {
    toast.success("Settings saved");
    setopen(false);
  };
  useEffect(() => {
    (async function () {
      const res = await axios.get(
        "https://iot-ff96.onrender.com/temperature_humidity"
      );
      setdhtdata(res.data);
    })();
  }, []);
  const lightcontrol = async (mode: boolean) => {
    if (mode) {
      const res = await axios.get("https://iot-ff96.onrender.com/on");
      console.log(res);
    } else {
      const res = await axios.get("https://iot-ff96.onrender.com/off");
      console.log(res);
    }
  };
  const switchon = async (mode: boolean) => {
    if (!mode) {
      animate(
        scope.current,
        { rotate: 0, x: 0, opacity: 1 },
        { type: "spring", duration: 2, stiffness: 40 }
      );
      animate(
        scopesec.current,
        { rotate: 0, x: 0, opacity: 1 },
        { type: "spring", duration: 2, stiffness: 40 }
      );
      animate(
        scopen.current,
        { rotate: 0, x: "-100vw", opacity: 0 },
        { type: "spring", duration: 2, stiffness: 40 }
      );
      animate(
        scopesecn.current,
        { rotate: 0, x: "100vw", opacity: 0 },
        { type: "spring", duration: 2, stiffness: 40 }
      );
      animate(
        scopeSun.current,
        { opacity: 0, y: "100vh" },
        { type: "spring", duration: 2, stiffness: 40 }
      );
      animate(
        scopeMoon.current,
        { opacity: 1, y: 0 },
        { type: "spring", duration: 2, stiffness: 40 }
      );
    } else {
      animate(
        scopen.current,
        { rotate: 0, x: 0, opacity: 1 },
        { type: "spring", duration: 2, stiffness: 50 }
      );
      animate(
        scopesecn.current,
        { rotate: 0, x: 0, opacity: 1 },
        { type: "spring", duration: 2, stiffness: 50 }
      );
      animate(
        scope.current,
        { rotate: 0, x: "-100vw", opacity: 0 },
        { type: "spring", duration: 2, stiffness: 50 }
      );
      animate(
        scopesec.current,
        { rotate: 0, x: "100vw", opacity: 0 },
        { type: "spring", duration: 2, stiffness: 50 }
      );
      animate(
        scopeSun.current,
        { opacity: 1, y: 0 },
        { type: "spring", duration: 2, stiffness: 50 }
      );
      animate(
        scopeMoon.current,
        { opacity: 0, y: "-100vh" },
        { type: "spring", duration: 2, stiffness: 50 }
      );
    }
  };
  return (
    <div
      className={`${
        phase ? "day" : "night"
      } w-screen h-screen flex flex-col justify-center overflow-hidden max-[500px]:pl-6 pl-12 relative`}
    >
      <Toaster />
      <div className="absolute left-0 top-0 bottom-0 right-0">
        <Starfield
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.05}
          backgroundColor="black"
        />
      </div>
      <div className={`  w-full h-[50%] relative `}>
        <div
          className={`absolute ${
            phase ? "text-slate-800" : "text-slate-100"
          }   mt-20`}
        >
          <p className=" font-semibold ">Welcome</p>
          <h2 className="   text-2xl font-semibold">Abhishek</h2>
        </div>
        <div className="absolute w-[270px] right-8 md:right-28   sm:right-20  h-full">
          <div className=" absolute w-full b flex flex-col justify-center items-center">
            <div className=" w-full flex justify-start">
              <motion.img
                initial={{
                  x: phase ? "100vw" : 0,
                  opacity: phase ? 0 : 1,
                  y: "140px",
                }}
                className="  w-32 h-32 z-10"
                src="./cloud.svg"
                alt=""
                ref={scope}
              />
            </div>
            <div className=" w-full flex justify-center">
              <motion.img
                initial={{ y: phase ? "-100vh" : 0, opacity: phase ? 0 : 1 }}
                className=" w-32 h-32 "
                src="./moon.png"
                alt=""
                ref={scopeMoon}
              />
            </div>
            <div className=" w-full flex justify-end">
              <motion.img
                initial={{
                  x: phase ? "-100vw" : 0,
                  opacity: phase ? 0 : 1,
                  y: "-110px",
                }}
                className=" w-32 h-32 "
                src="./cloud.svg"
                alt=""
                ref={scopesec}
              />
            </div>
          </div>
          <div className="absolute w-full b flex flex-col justify-center items-center">
            <div className=" w-full flex justify-start">
              <motion.img
                initial={{
                  x: phase ? 0 : "100vw",
                  opacity: phase ? 1 : 0,
                  y: "170px",
                }}
                className=" w-32 h-32 z-10"
                src="./whitecloud.svg"
                alt=""
                ref={scopen}
              />
            </div>
            <div className=" w-full flex justify-center">
              <motion.img
                initial={{ opacity: phase ? 1 : 0, y: phase ? 0 : "100vh" }}
                className=" w-48 h-32 "
                src="./sun.png"
                alt=""
                ref={scopeSun}
              />
            </div>
            <div className=" w-full flex justify-end">
              <motion.img
                initial={{
                  x: phase ? 0 : "-100vw",
                  opacity: phase ? 1 : 0,
                  y: "-100px",
                }}
                className=" w-32 h-32"
                src="./whitecloud.svg"
                alt=""
                ref={scopesecn}
              />
            </div>
          </div>
        </div>
      </div>
      <motion.div className=" absolute top-0  max-[480px]:right-[50px] right-[100px] w-max flex flex-col justify-center items-center z-20 ">
        <div className=" w-1 h-[80vh] bg-gray-400"></div>
        <div className="rotate-90">
          <FormGroup>
            <IOSSwitch
              sx={{ m: 1 }}
              checked={phase}
              value={phase}
              onChange={(e) => changephase()}
            />
          </FormGroup>
        </div>
      </motion.div>
      <div className="h-[50%] w-full flex gap-5">
        <div className=" w-[20%] min-w-[245px] flex flex-col justify-start">
          <div className=" w-max flex">
            <div className=" flex justify-center items-center">
              <div className="flex justify-center items-center bg-red-800 p-2 rounded-md">
                <DeviceThermostatIcon sx={{ color: "#ed6f5f" }} />
              </div>
              <div className=" ml-1">
                <p
                  className={`  font-medium text-sm ${
                    !phase ? "text-white" : "text-slate-600"
                  }`}
                >
                  Temperature
                </p>
                <h4
                  className={` text-2xl font-semibold    ${
                    !phase ? "text-slate-400" : "text-slate-400"
                  }`}
                >
                  {dhtdata.temperature}°C
                </h4>
              </div>
            </div>
            <div className="flex justify-center items-center ml-2">
              <div className="flex justify-center items-center bg-slate-600 p-2 rounded-md">
                <WaterDropIcon sx={{ color: "#27aef2" }} />
              </div>
              <div className=" text-slate-600 font-medium text-sm ml-1">
                <p
                  className={`  font-medium text-sm ${
                    !phase ? "text-white" : "text-slate-600"
                  }`}
                >
                  Humidity
                </p>
                <h4
                  className={` text-2xl font-semibold    ${
                    !phase ? "text-slate-400" : "text-slate-400"
                  }`}
                >
                  {dhtdata.humidity}%
                </h4>
              </div>
            </div>
          </div>

          <h1
            className={`montserrat text-4xl mt-9 font-bold ${
              !phase ? "text-white" : "text-black"
            }`}
          >
            Living Room
          </h1>
          <p
            className={` text-lg font-semibold  mt-4 ${
              !phase ? "text-slate-100" : "text-slate-600"
            } `}
          >
            {phase ? "Lights are on" : "Lights are off"}
          </p>
          <button
            onClick={() => setopen(!open)}
            className="   font-medium z-40  mt-4 hover:cursor-pointer hover:scale-105 rounded-md transition duration-150 flex justify-center items-center bg-black text-white w-max py-2  px-2"
          >
            <MdOutlineSchedule size={"1.5rem"} />{" "}
            <span className=" ml-2">Schedule</span>
          </button>
          <button
            onClick={() => setshow(!show)}
            className=" min-[850px]:hidden font-medium z-40  mt-4 hover:cursor-pointer hover:scale-105 rounded-md transition duration-150 flex justify-center items-center bg-black text-white w-max py-2  px-2"
          >
            <DevicesIcon sx={{ marginRight: "10px" }} /> My Devices
          </button>
        </div>
        <div className=" devicescontainer ml-12 w-[70%] h-full ">
          <Devices phase={phase} />
        </div>
      </div>
      <div
        className={`${
          show ? "show" : "hide"
        } absolute bottom-0 left-0 right-0 mobile_device h-[350px] w-screen z-50 flex justify-center items-center `}
      >
        <div
          className=" absolute right-2 top-2 text-white hover:cursor-pointer "
          onClick={() => setshow(!show)}
        >
          <CloseIcon />
        </div>

        <Devices />
      </div>
      <div
        className={` absolute w-[400px] right-0  bg-[#03070c] h-full flex justify-center items-center z-50 ${
          open ? "showslide" : "hideslide"
        } `}
      >
        <Scheduler notify={notify} />
      </div>
    </div>
  );
};

export default Iot;
