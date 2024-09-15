"use client";
import Image from "next/image";

import feuchtigkeitSVG from "@/public/img/feuchtigkeit.svg";
import temperatureSVG from "@/public/img/temperature.svg";
import arrow from "@/public/img/arrow.svg";
import arrowR from "@/public/img/arrowR.svg";
import check from "@/public/img/check.svg";
import fridgeSVG from "@/public/img/fridge.svg";
import routerSVG from "@/public/img/router.svg";
import musicSVG from "@/public/img/music.svg";
import lightSVG from "@/public/img/light.svg";
import lamp from "@/public/img/lamp2.svg";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import HomeContext from "./components/HomeContext";
import Link from "next/link";

export default function Home() {
  const { homeState, setHomeState } = useContext(HomeContext);
  
  useEffect(() => {
    const fetchData = async () => {
      console.log("BObro request!!!");
      
      try {
        const response = await fetch("http://localhost:5000/api/home/");
        const json = await response.json();
        setHomeState(json[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  

  const [room, setRoom] = useState(homeState.rooms[0]);

  let houseLights = homeState.rooms.some((thisRoom) => thisRoom.light === true);
  let devicesState =
    homeState.rooms.some(
      (thisRoom) => thisRoom.light === true || thisRoom.fridge === true
    ) ||
    homeState.music === true ||
    homeState.router === true;

  return (
    <div className="w-full h-fit lg:grid lg:grid-cols-10 mt-6 lg:gap-10">
      <div className="lg:col-span-6 xl:col-span-5">
        <div className="sm:flex sm:justify-between sm:items-center">
          <h1 className="font-bold text-2xl">Mein Zuhause</h1>
          <div className="flex gap-6 items-center font-semibold">
            <div className="flex gap-1">
              <Image src={feuchtigkeitSVG} alt="" />
              <h6 className="text-base">{room.humidity}%</h6>
            </div>
            <div className="flex gap-1 mr-3">
              <Image className="filter-gray" src={temperatureSVG} alt="" />
              <h6 className="text-base">{room.temperature}&deg;C</h6>
            </div>
            <Listbox
              value={room}
              onChange={(selectedRoom) => setRoom(selectedRoom)}
            >
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-pointer rounded-md bg-[#EDEEF4] py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                  <span className="min-w-32 ml-3 block truncate">
                    {room.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <Image src={arrow} alt="" />
                  </span>
                </ListboxButton>
                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  {homeState.rooms.map((thisRoom) => {
                    return (
                      <ListboxOption
                        key={thisRoom.id}
                        value={thisRoom}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                      >
                        <span className="ml-3 block truncate font-normal group-data-[room]:font-semibold">
                          {thisRoom.name}
                        </span>
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:filter-white ${
                            room === thisRoom ? "" : "hidden"
                          }`}
                        >
                          <Image src={check} alt="" />
                        </span>
                      </ListboxOption>
                    );
                  })}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 mt-5 gap-4 sm:gap-7">
          {/* Kühlschrank */}
          {room.fridge !== undefined && (
            <div className="rounded-[25px] bg-white p-5 border border-specialgray">
              <div className="flex items-center justify-between">
                <span className="font-bold">{room.fridge ? "EIN" : "AUS"}</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    onChange={() => {
                      setHomeState({
                        ...homeState,
                        rooms: homeState.rooms.map((currentRoom) => {
                          return room.id === currentRoom.id
                            ? { ...currentRoom, fridge: !currentRoom.fridge }
                            : currentRoom;
                        }),
                      });
                      setRoom({ ...room, fridge: !room.fridge });
                    }}
                    type="checkbox"
                    value={room.fridge}
                    className="sr-only peer"
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full peer dark:bg-gray-700 ${
                      room.fridge
                        ? "after:translate-x-full"
                        : "after:translate-x-0"
                    } after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 ${
                      room.fridge ? "bg-purple" : "bg-gray-200"
                    }`}
                  ></div>
                </label>
              </div>
              <Image
                className={`${
                  room.fridge ? "filter-purple-always" : "filter-gray"
                } mt-3`}
                src={fridgeSVG}
                alt=""
              />
              <h6
                className={`${
                  room.fridge ? "text-purple" : "text-[#9897AD]"
                } font-bold mt-2`}
              >
                Kühlschrank
              </h6>
            </div>
          )}
          {/* Temperatur */}
          {room.tempChangable && (
            <div className="rounded-[25px] bg-white p-5 border border-specialgray">
              <div className="flex items-center justify-between">
                <span className="font-bold">
                  {room.controlTemperature !== 0 ? "EIN" : "AUS"}
                </span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    onChange={() => {
                      setHomeState({
                        ...homeState,
                        rooms: homeState.rooms.map((currentRoom) => {
                          return room.id === currentRoom.id
                            ? {
                                ...currentRoom,
                                controlTemperature:
                                  currentRoom.controlTemperature !== 0 ? 0 : 25,
                              }
                            : currentRoom;
                        }),
                      });
                      setRoom({
                        ...room,
                        controlTemperature:
                          room.controlTemperature !== 0 ? 0 : 25,
                      });
                    }}
                    type="checkbox"
                    value={room.controlTemperature}
                    className="sr-only peer"
                  />
                  <div
                    className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 ${
                      room.controlTemperature !== 0
                        ? "after:translate-x-full"
                        : ""
                    }  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-specialgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 ${
                      room.controlTemperature !== 0 ? "bg-purple" : ""
                    }`}
                  ></div>
                </label>
              </div>
              <Image
                className={`${
                  room.controlTemperature !== 0
                    ? "filter-purple-always"
                    : "filter-gray"
                } mt-3`}
                src={temperatureSVG}
                width={16}
                alt=""
              />
              <h6
                className={`${
                  room.controlTemperature !== 0
                    ? "text-purple"
                    : "text-[#9897AD]"
                } font-bold mt-2`}
              >
                Temperatur
              </h6>
            </div>
          )}
          {/* Licht */}
          <div className="rounded-[25px] bg-white p-5 border border-specialgray">
            <div className="flex items-center justify-between">
              <span className="font-bold">{room.light ? "AN" : "AUS"}</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  onChange={() => {
                    setHomeState({
                      ...homeState,
                      rooms: homeState.rooms.map((currentRoom) => {
                        return room.id === currentRoom.id
                          ? {
                              ...currentRoom,
                              light: !currentRoom.light,
                            }
                          : currentRoom;
                      }),
                    });
                    setRoom({
                      ...room,
                      light: !room.light,
                    });
                  }}
                  type="checkbox"
                  value={room.light}
                  className="sr-only peer"
                />
                <div
                  className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 ${
                    room.light ? "after:translate-x-full" : ""
                  }  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-specialgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 ${
                    room.light ? "bg-purple" : ""
                  }`}
                ></div>
              </label>
            </div>
            <Image
              className={`${
                room.light ? "filter-purple-always" : "filter-gray"
              } mt-3`}
              src={lightSVG}
              width={26}
              alt=""
            />
            <h6
              className={`${
                room.light ? "text-purple" : "text-[#9897AD]"
              } font-bold mt-2`}
            >
              Licht
            </h6>
          </div>
        </div>
        {/* Temperaturregelung */}
        {room.controlTemperature !== 0 && (
          <div className="rounded-xl mt-6 pt-5 pb-16 px-7 bg-white border border-specialgray">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex justify-center items-center rounded-full bg-purple bg-opacity-15 aspect-square w-10">
                  <Image
                    className="filter-purple-always "
                    width={20}
                    src={lightSVG}
                    alt=""
                  />
                </div>
                <h2 className="text-purple font-semibold ml-3">
                  Temperaturregelung von {room.name}
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">EIN</span>
                <label className="inline-flex items-center cursor-pointer ml-3">
                  <input
                    onChange={() => {
                      setHomeState({
                        ...homeState,
                        rooms: homeState.rooms.map((currentRoom) => {
                          return room.id === currentRoom.id
                            ? {
                                ...currentRoom,
                                controlTemperature:
                                  currentRoom.controlTemperature !== 0 ? 0 : 25,
                              }
                            : currentRoom;
                        }),
                      });
                      setRoom({
                        ...room,
                        controlTemperature:
                          room.controlTemperature !== 0 ? 0 : 25,
                      });
                    }}
                    type="checkbox"
                    value={room.controlTemperature}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 rounded-full peer dark:bg-gray-700 after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-specialgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 bg-purple"></div>
                </label>
              </div>
            </div>
            <div className="flex justify-evenly mt-12">
              <button
                onClick={() => {
                  setHomeState({
                    ...homeState,
                    rooms: homeState.rooms.map((currentRoom) => {
                      return room.id === currentRoom.id
                        ? {
                            ...currentRoom,
                            controlTemperature:
                              currentRoom.controlTemperature - 1,
                          }
                        : currentRoom;
                    }),
                  });
                  setRoom({
                    ...room,
                    controlTemperature: room.controlTemperature - 1,
                  });
                }}
                className="bg-neutral-100 text-[#9897AD] hover:bg-purple hover:text-[#e1e1e1] text-xl font-extrabold p-2 rounded-xl w-12 aspect-square transition duration-100 ease-in"
              >
                —
              </button>
              <h1 className="text-5xl font-light">
                {room.controlTemperature}&deg;C
              </h1>
              <button
                disabled={room.controlTemperature >= 30}
                onClick={() => {
                  setHomeState({
                    ...homeState,
                    rooms: homeState.rooms.map((currentRoom) => {
                      return room.id === currentRoom.id
                        ? {
                            ...currentRoom,
                            controlTemperature:
                              currentRoom.controlTemperature + 1,
                          }
                        : currentRoom;
                    }),
                  });
                  setRoom({
                    ...room,
                    controlTemperature: room.controlTemperature + 1,
                  });
                }}
                className="bg-neutral-100 text-[#9897AD] enabled:hover:bg-purple enabled:hover:text-[#e1e1e1] text-xl font-extrabold p-2 rounded-xl w-12 aspect-square transition duration-100 ease-in"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Meine Geräte */}
      <div className="max-lg:mt-6 bg-neutral-100 rounded-tl-[30px] lg:col-span-4 xl:col-span-5 px-7 pt-3 lg:pt-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Meine Geräte</h2>
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                onChange={() => {
                  setHomeState({
                    router: !devicesState,
                    music: !devicesState,
                    rooms: homeState.rooms.map((currentRoom) =>
                      currentRoom.fridge !== undefined
                        ? {
                            ...currentRoom,
                            light: !devicesState,
                            fridge: !devicesState,
                          }
                        : {
                            ...currentRoom,
                            light: !devicesState,
                          }
                    ),
                  });
                  if (room.fridge !== undefined)
                    setRoom({
                      ...room,
                      fridge: !devicesState,
                      light: !devicesState,
                    });
                  else {
                    setRoom({ ...room, light: !devicesState });
                  }
                }}
                type="checkbox"
                value={devicesState}
                className="sr-only peer"
              />
              <div
                className={`relative w-11 h-6 rounded-full peer dark:bg-gray-700 ${
                  devicesState
                    ? "after:translate-x-full"
                    : "after:translate-x-0"
                } after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 ${
                  devicesState ? "bg-purple" : "bg-gray-200"
                }`}
              ></div>
            </label>
            <Link
              className="ml-4 w-10 aspect-square flex justify-center items-center rounded-[10px] bg-[#EDEEF4]"
              href="/"
            >
              <Image src={arrowR} alt="" />
            </Link>
          </div>
        </div>
        <div className="sm:max-lg:grid sm:max-lg:grid-cols-2 sm:max-lg:gap-5 xl:grid xl:grid-cols-2 xl:gap-5">
          {/* Kühlschrank */}
          <div
            className={`rounded-[25px] p-5 max-sm:mb-4 lg:max-xl:mb-4 ${
              room.fridge ? "bg-purple" : "bg-white border border-specialgray"
            }`}
          >
            <div className="flex items-center justify-between">
              <Image
                className={`${
                  room.fridge ? "filter-white" : "filter-gray"
                } mt-3`}
                src={fridgeSVG}
                alt=""
              />
              <div className="flex items-center">
                <span
                  className={`font-bold ${room.fridge ? "text-white" : ""}`}
                >
                  {room.fridge ? "EIN" : "AUS"}
                </span>
                <label className="inline-flex items-center cursor-pointer ml-3">
                  <input
                    onChange={() => {
                      setHomeState({
                        ...homeState,
                        rooms: homeState.rooms.map((currentRoom) => {
                          return room.id === currentRoom.id
                            ? { ...currentRoom, fridge: !currentRoom.fridge }
                            : currentRoom;
                        }),
                      });
                      setRoom({ ...room, fridge: !room.fridge });
                    }}
                    type="checkbox"
                    value={room.fridge}
                    className="sr-only peer"
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full peer dark:bg-gray-700 ${
                      room.fridge
                        ? "after:translate-x-full"
                        : "after:translate-x-0"
                    } after:content-[''] after:absolute after:top-[2px] after:start-[2px] ${
                      room.fridge ? "after:bg-purple" : "after:bg-white"
                    } after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 ${
                      room.fridge ? "bg-white" : "bg-gray-200"
                    }`}
                  ></div>
                </label>
              </div>
            </div>

            <h6
              className={`${
                room.fridge ? "text-white" : "text-[#9897AD]"
              } font-bold mt-3`}
            >
              Kühlschrank
            </h6>
          </div>
          {/* Router */}
          {homeState.router !== undefined && (
            <div
              className={`rounded-[25px] max-sm:mb-4 lg:max-xl:mb-4 p-5 ${
                homeState.router
                  ? "bg-[#F4C427]"
                  : "bg-white border border-specialgray"
              }`}
            >
              <div className="flex items-center justify-between">
                <Image
                  className={`${
                    homeState.router ? "filter-white" : "filter-gray"
                  } mt-3`}
                  src={routerSVG}
                  alt=""
                />
                <div className="flex items-center">
                  <span
                    className={`font-bold ${
                      homeState.router ? "text-white" : ""
                    }`}
                  >
                    {homeState.router ? "EIN" : "AUS"}
                  </span>
                  <label className="inline-flex items-center cursor-pointer ml-3">
                    <input
                      onChange={() =>
                        setHomeState({
                          ...homeState,
                          router: !homeState.router,
                        })
                      }
                      type="checkbox"
                      value={homeState.router}
                      className="sr-only peer"
                    />
                    <div
                      className={`relative w-11 h-6 rounded-full peer dark:bg-gray-700 ${
                        homeState.router
                          ? "after:translate-x-full"
                          : "after:translate-x-0"
                      } after:content-[''] after:absolute after:top-[2px] after:start-[2px] ${
                        homeState.router
                          ? "after:bg-[#F4C427]"
                          : "after:bg-white"
                      } after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 ${
                        homeState.router ? "bg-white" : "bg-gray-200"
                      }`}
                    ></div>
                  </label>
                </div>
              </div>

              <h6
                className={`${
                  homeState.router ? "text-white" : "text-[#9897AD]"
                } font-bold mt-3`}
              >
                Internet
              </h6>
            </div>
          )}
          {/* Musik */}
          <div
            className={`rounded-[25px] max-sm:mb-4 lg:max-xl:mb-4 p-5 ${
              homeState.music
                ? "bg-[#FF9060]"
                : "bg-white border border-specialgray"
            }`}
          >
            <div className="flex items-center justify-between">
              <Image
                className={`${
                  homeState.music ? "filter-white" : "filter-gray"
                } mt-3`}
                src={musicSVG}
                alt=""
              />
              <div className="flex items-center">
                <span
                  className={`font-bold ${homeState.music ? "text-white" : ""}`}
                >
                  {homeState.music ? "EIN" : "AUS"}
                </span>
                <label className="inline-flex items-center cursor-pointer ml-3">
                  <input
                    onChange={() =>
                      setHomeState({
                        ...homeState,
                        music: !homeState.music,
                      })
                    }
                    type="checkbox"
                    value={homeState.music}
                    className="sr-only peer"
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full peer dark:bg-gray-700 ${
                      homeState.music
                        ? "after:translate-x-full"
                        : "after:translate-x-0"
                    } after:content-[''] after:absolute after:top-[2px] after:start-[2px] ${
                      homeState.music ? "after:bg-[#FF9060]" : "after:bg-white"
                    } after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 ${
                      homeState.music ? "bg-white" : "bg-gray-200"
                    }`}
                  ></div>
                </label>
              </div>
            </div>

            <h6
              className={`${
                homeState.music ? "text-white" : "text-[#9897AD]"
              } font-bold mt-3`}
            >
              Musik
            </h6>
          </div>
          {/* Hausbeleuchtung */}
          <div
            className={`rounded-[25px] p-5 ${
              houseLights
                ? "bg-[#3ACBE9]"
                : "bg-white border border-specialgray"
            }`}
          >
            <div className="flex items-center justify-between">
              <Image
                className={`${
                  houseLights ? "filter-white" : "filter-gray"
                } mt-3`}
                src={lamp}
                alt=""
              />
              <div className="flex items-center">
                <span
                  className={`font-bold ${houseLights ? "text-white" : ""}`}
                >
                  {houseLights ? "EIN" : "AUS"}
                </span>
                <label className="inline-flex items-center cursor-pointer ml-3">
                  <input
                    onChange={() =>
                      setHomeState({
                        ...homeState,
                        rooms: homeState.rooms.map((thisRoom) => {
                          if (thisRoom.id === room.id)
                            setRoom({ ...room, light: !houseLights });
                          return { ...thisRoom, light: !houseLights };
                        }),
                      })
                    }
                    type="checkbox"
                    value={houseLights}
                    className="sr-only peer"
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full peer dark:bg-gray-700 ${
                      houseLights
                        ? "after:translate-x-full"
                        : "after:translate-x-0"
                    } after:content-[''] after:absolute after:top-[2px] after:start-[2px] ${
                      houseLights ? "after:bg-[#3ACBE9]" : "after:bg-white"
                    } after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-specialgray-600 ${
                      houseLights ? "bg-white" : "bg-gray-200"
                    }`}
                  ></div>
                </label>
              </div>
            </div>

            <h6
              className={`${
                houseLights ? "text-white" : "text-[#9897AD]"
              } font-bold mt-3`}
            >
              Hausbeleuchtung
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
