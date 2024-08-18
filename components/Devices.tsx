import React, { useState } from "react";
import { Switch } from "@nextui-org/switch";
import ComputerIcon from "@mui/icons-material/Computer";
import { PiFanFill } from "react-icons/pi";

const Devices = ({ phase }: any) => {
  // const [phase, setphase] = useState<boolean>(false);
  return (
    <div className=" devices min-w-[550px] w-[65%] h-[90%] flex justify-center items-center gap-10  rounded-md  p-14 relative">
      <h2
        className={` ${
          phase ? "text-slate-700" : "text-slate-200"
        }  font-semibold text-xl absolute top-2 left-2`}
      >
        Devices
      </h2>
      <div
        className={` cards w-[200px] h-[200px] bg-gray-700 rounded-md flex flex-col justify-between relative ${
          phase ? "daycard" : "nightcard"
        }`}
      >
        <div className=" absolute bottom-4 w-full flex justify-between mx-2 px-2 items-center">
          <h4
            className={`${
              phase ? "text-slate-700" : "text-slate-200"
            } font-medium`}
          >
            Desktop
          </h4>
          <Switch style={{ color: "white" }} />
        </div>
        <div
          className={`
        icon w-full h-[80%] flex justify-center items-center ${
          phase ? "text-[#1f1f20]" : "text-slate-200"
        } `}
        >
          <ComputerIcon sx={{ fontSize: "4rem" }} />
        </div>
      </div>
      <div
        className={` cards w-[200px] h-[200px] bg-gray-700 rounded-md flex flex-col justify-between relative ${
          phase ? "daycard" : "nightcard"
        }`}
      >
        <div className=" absolute bottom-4 w-full flex justify-between mx-2 px-2 items-center">
          <h4
            className={`${
              phase ? "text-slate-700" : "text-slate-200"
            } font-medium`}
          >
            Fan
          </h4>
          <Switch />
        </div>
        <div
          className={`
          icon w-full h-[80%] flex justify-center items-center ${
            phase ? "text-[#1f1f20]" : "text-slate-200"
          } `}
        >
          <PiFanFill fontSize={"4rem"} />
        </div>
      </div>
    </div>
  );
};

export default Devices;
