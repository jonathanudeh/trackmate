import { useEffect, useRef, useState } from "react";

function StatisticsHeaderNav({
  header,
  onFrequencyDisplay,
  frequencyDisplay,
  activeScreen,
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

  const date = new Date();
  let formattedDate;

  if (frequencyDisplay === "daily") {
    formattedDate = date.toDateString().split(" ").slice(0, 3).join(" ");
  } else if (frequencyDisplay === "monthly") {
    formattedDate = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  } else if (frequencyDisplay === "yearly") {
    formattedDate = date.getFullYear().toString();
  }

  return (
    <div className="w-full bg-blue-800 md:bg-transparent h-[35vh] md:h-10 pb-0 text-white px-5 flex flex-col justify-center gap-5">
      <div className="flex items-center justify-center">
        <button
          className="cursor-pointer"
          onClick={() => onActiveScreen("home")}
        >
          <img src="/assets/white-arrow-back.svg" />
        </button>

        <p className="text-2xl text-center md:hidden mx-auto">
          {frequencyDisplay === "yearly" && header[0]}
          {frequencyDisplay === "monthly" && header[1]}
          {frequencyDisplay === "daily" && header[2]}
          Report
        </p>
      </div>
      <h1 className="text-3xl text-center font-bold md:hidden ">
        {formattedDate}
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
            ? "fixed top-0 left-0 w-full px-6 shadow-md z-50 h-17 bg-blue-800 "
            : "static"
        }`}
      >
        <button
          className={`${
            frequencyDisplay === "yearly"
              ? "border-b-2 text-white md:text-black"
              : "text-white/70 border-transparent md:text-black/70 border-b-2"
          } ${
            activeScreen !== "home" ? "md:hidden" : ""
          }   cursor-pointer px-1  h-10 text-lg`}
          onClick={() => onFrequencyDisplay("yearly")}
        >
          Year
        </button>
        <button
          className={`${
            frequencyDisplay === "monthly"
              ? "border-b-2 text-white md:text-black"
              : "text-white/70 border-transparent md:text-black/70 border-b-2"
          } ${
            activeScreen !== "home" ? "md:hidden" : ""
          }   cursor-pointer px-1 h-10 text-lg`}
          onClick={() => onFrequencyDisplay("monthly")}
        >
          Month
        </button>
        <button
          className={`${
            frequencyDisplay === "daily"
              ? "border-b-2 text-white md:text-black"
              : "text-white/70 md:text-black/70 border-transparent border-b-2"
          } ${
            activeScreen !== "home" ? "md:hidden" : ""
          }  cursor-pointer px-1 h-10 text-lg`}
          onClick={() => onFrequencyDisplay("daily")}
        >
          Today
        </button>
      </div>
    </div>
  );
}

export default StatisticsHeaderNav;
