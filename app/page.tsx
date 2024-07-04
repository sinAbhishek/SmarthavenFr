"use client";
import React from "react";
import { color, motion } from "framer-motion";
import { SparklesCore } from "../components/ui/sparkles";
import { LampContainer } from "../components/ui/lamps";
import Chart from 'react-apexcharts'
import {Switch} from "@nextui-org/switch";

var chartptions = {
  series: [30], // Replace with your dynamic temperature value
  options: {
    chart: {
      height: 250,
      type: 'radialBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#65f0c8',
          strokeWidth: '50%', // Control the width of the background track
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#ffffff',
            fontSize: '17px'
          },
          value: {
            formatter: function(val:any) {
              return `${parseInt(val)}°C`;
            },
            color: '#ffffff',
            fontSize: '16px',
            show: true,
          },
          total: {
            show: true,
            label: 'Temperature',
            color:"#000000",
            formatter: function (w:any) {
              return `${w.globals.seriesTotals[0]}°C`;
            }
          }
        },
        stroke: {
          lineCap: 'round',
          width: 55 // Control the width of the bar
        },
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#FF0000'], // End color (red)
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      },
      colors: ['#FFFF00'] // Start color (yellow)
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Temperature'],
  }
};



const customGradient = {
  background: `conic-gradient(from 0deg, yellow, red ${30}%)`
};
export default function Home() {
 

  return (
<div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="opaque"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
    
        
      </div>
      {/* <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Build great products
      </h1> */}
    <div className=" absolute w-[85vw] h-[85vh] bg-tran flex justify-between  ">
      <div className=" w-[70%] h-full flex-col justify-center items-center ">
        <div className="h-[60%]  w-full flex gap-4 justify-center items-center relative  ">
         <div className=" tempchart  "> <Chart  options={chartptions.options} series={chartptions.series} type="radialBar" height={250}/>
  
     </div>
         <div className="tempchart"><Chart  options={chartptions.options} series={chartptions.series} type="radialBar" height={250}/></div>
        </div>
        <div className=" h-[40%] flex items-center gap-4 w-full  justify-center ">
          <div className=" w-[400px] h-[250px] bg-gray-950 flex flex-col justify-start items-between">
            <div className=" w-full flex justify-center"> <img className=" w-[200px] h-[200px]" src="./monitor.png" alt="" /></div>
           
            <div className=" flex justify-between items-center px-4">
              <h1>MY PC</h1>
              <Switch defaultSelected aria-label="Automatic updates"/>
            </div>
          </div>
          <div className=" w-[400px] h-[250px] bg-gray-950 flex flex-col justify-start items-between">
            <div className=" w-full flex justify-center"> <img className=" w-[200px] h-[200px]" src="./lamp.png" alt="" /></div>
           
            <div className=" flex justify-between items-center px-4">
              <h1>MY PC</h1>
              <Switch defaultSelected aria-label="Automatic updates"/>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[30%] h-full bg-slate-950 rounded-md  ">
        <h1>hello</h1>
      </div>
    </div>
    </div>
  );
}
