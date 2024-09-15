"use client";
import { useState } from "react";
import HomeContext from "./HomeContext";

const defaultState = {
  router: true,
  music: false,
  rooms: [
    {
      id: 0,
      name: "Wohnzimmer",
      light: false,
      temperature: 25,
      tempChangable: true,
      controlTemperature: 0,
      humidity: 50,
    },
    {
      id: 1,
      name: "Schlafzimmer",
      light: false,
      temperature: 25,
      tempChangable: true,
      controlTemperature: 0,
      humidity: 50,
    },
    {
      id: 2,
      name: "Küche",
      light: false,
      fridge: true,
      temperature: 25,
      tempChangable: true,
      controlTemperature: 0,
      humidity: 50,
    },
    {
      id: 3,
      name: "Bad",
      light: false,
      temperature: 25,
      tempChangable: true,
      controlTemperature: 0,
      humidity: 50,
    },
    {
      id: 4,
      name: "Balkon",
      light: false,
      temperature: 25,
      tempChangable: false,
      controlTemperature: 0,
      humidity: 50,
    },
  ],
};

function HomeState({ children }) {
  const [homeState, setHomeState] = useState(defaultState);

  return (
    <HomeContext.Provider value={{ homeState, setHomeState }}>
      {children}
    </HomeContext.Provider>
  );
}

export default HomeState;
