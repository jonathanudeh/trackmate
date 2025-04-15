import { useEffect, useRef, useState } from "react";

function HeaderNavigation({
  header,
  message,
  onFrequencyDisplay,
  frequencyDisplay,
  activeScreen,
  streak,
  onActiveScreen,
}) {
  const [navIsSticky, setNavIsSticky] = useState(false);
  const navRef = useRef(null);
  const [navTop, setNavTop] = useState(0);

  // Store the initial position once after mounting
  useEffect(() => {
    if (navRef.current) {
      setNavTop(navRef.current.offsetTop);
    }
  }, []);

  useEffect(
    function () {
      function handleScroll() {
        if (window.innerWidth < 768) {
          setNavIsSticky(window.scrollY > navTop);
        } else {
          setNavIsSticky(false);
        }
      }

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
      };
    },
    [navTop]
  );

  return (
    <div className="w-full bg-pink-600 md:bg-transparent min-h-[35vh] md:h-65 pb-0 text-white px-5 flex flex-col justify-center gap-5 md:flex-col-reverse">
      <div className="relative flex items-center justify-center w-full px-4 md:h-10">
        <p className="text-2xl text-center md:text-xs md:hidden mx-auto w-full">
          {header}
        </p>
        <span
          className="absolute top-0 right-0 w-15 h-15 flex items-center justify-center   font-bold text-xl  md:left-1/2 md:translate-y-1/2 md:-translate-x-1/2  cursor-pointer border-[1px] drop-shadow-lg  shadow-2xl rounded-lg md:w-20 md:h-20"
          onClick={() => onActiveScreen("stats")}
        >
          🔥
          <span className="text-3xl">{streak}</span>
        </span>
      </div>
      <h1 className="text-3xl text-center font-bold md:text-xs md:hidden ">
        {message}
      </h1>

      {/* Placeholder div to prevent layout shift when the nav becomes sticky */}
      {navIsSticky && (
        <div
          style={{
            height: navRef.current?.offsetHeight,
            backgroundColor: "transparent",
            visibility: "hidden",
          }}
        />
      )}

      <div
        ref={navRef}
        className={`flex justify-between items-center text-md font-medium px-6 md:flex-col-reverse md:gap-5 md:justify-between md:items-center transition-all duration-300  min-h-15 ${
          navIsSticky
            ? "fixed top-0 left-0 w-full px-6 shadow-md z-50 h-17 bg-pink-600 "
            : "static"
        }`}
      >
        <button
          className={`${
            frequencyDisplay === "yearly"
              ? "border-b-2 text-white md:text-black"
              : "text-white/70 border-transparent md:text-black/70 border-b-2"
          } ${
            activeScreen !== "home" ? "" : ""
          }   cursor-pointer px-1  h-10 text-lg`}
          onClick={() => {
            onFrequencyDisplay("yearly");
            onActiveScreen("home");
          }}
        >
          Year
        </button>
        <button
          className={`${
            frequencyDisplay === "monthly"
              ? "border-b-2 text-white md:text-black"
              : "text-white/70 border-transparent md:text-black/70 border-b-2"
          } ${
            activeScreen !== "home" ? "" : ""
          }   cursor-pointer px-1 h-10 text-lg`}
          onClick={() => {
            onFrequencyDisplay("monthly");
            onActiveScreen("home");
          }}
        >
          Month
        </button>
        <button
          className={`${
            frequencyDisplay === "daily"
              ? "border-b-2 text-white md:text-black"
              : "text-white/70 md:text-black/70 border-transparent border-b-2"
          } ${
            activeScreen !== "home" ? "" : ""
          }  cursor-pointer px-1 h-10 text-lg`}
          onClick={() => {
            onFrequencyDisplay("daily");
            onActiveScreen("home");
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
}

export default HeaderNavigation;
