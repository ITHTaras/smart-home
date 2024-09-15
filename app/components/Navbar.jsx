"use client";
import home from "@/public/img/Home.svg";
import menu from "@/public/img/menu.svg";
import lamp from "@/public/img/lamp.svg";
import alarm from "@/public/img/alarm.svg";
import info from "@/public/img/info.svg";
import abmeldenSVG from "@/public/img/abmelden.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import useWindowWidth from "./DimensionsHook";
import useOutsideTrigger from "./ClickTrigger";

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const windowWidth = useWindowWidth();

  const menuRef = useRef(null);
  useOutsideTrigger(menuRef, menuActive, setMenuActive);

  return (
    <nav
      className={`z-[1] max-sm:fixed h-[calc(100vh-24px)] ${
        menuActive ? "" : "max-sm:flex max-sm:items-end"
      }`}
    >
      <button
        ref={menuRef}
        disabled={windowWidth >= 640 || menuActive}
        onClick={() => setMenuActive(true)}
        className={`flex flex-col items-center sm:px-8 sm:py-16 bg-purple sm:rounded-[28px] sm:h-full ${
          menuActive
            ? "h-full rounded-[28px] px-4 py-8"
            : "max-sm:justify-center max-sm:w-20 max-sm:aspect-square max-sm:rounded-full"
        }`}
      >
        <Image priority className="w-8 h-8 sm:w-10 sm:h-10" src={home} alt="" />
        <div
          className={`${
            menuActive ? "" : "max-sm:hidden"
          } mt-20 flex flex-col items-center gap-10`}
        >
          <div className="w-12 hover:bg-white rounded-full transition duration-150 ease-in-out">
            <Image className="filter-white filter-purple" src={menu} alt="" />
          </div>
          <div className="w-12 hover:bg-white rounded-full transition duration-150 ease-in">
            <Image className="filter-white filter-purple" src={lamp} alt="" />
          </div>
          <div className="w-12 hover:bg-white rounded-full transition duration-150 ease-in">
            <Image className="filter-white filter-purple" src={alarm} alt="" />
          </div>
          <div className="w-12 hover:bg-white rounded-full transition duration-150 ease-in">
            <Image
              className="filter-white filter-purple"
              width={50}
              height={50}
              src={info}
              alt=""
            />
          </div>
        </div>
        <div
          className={`${
            menuActive ? "" : "max-sm:hidden"
          } hover:bg-white rounded-full mt-auto transition duration-150 ease-in`}
        >
          <Image
            className="filter-white filter-purple"
            width={50}
            height={50}
            src={abmeldenSVG}
            alt=""
          />
        </div>
      </button>
    </nav>
  );
}

export default Navbar;
