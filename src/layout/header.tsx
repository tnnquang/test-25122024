import { memo } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const menuList = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Menu 1",
      path: "#",
      sub: undefined,
    },
    {
      title: "Menu 2",
      path: "#",
    },
    {
      title: "Menu 3",
      path: "#",
    },
    // {
    //   title: "Menu 4",
    //   path: "#",
    // },
    // {
    //   title: "Menu 5",
    //   path: "#",
    // },
    // {
    //   title: "Menu 6",
    //   path: "#",
    //   sub: [
    //     {
    //       title: "Sub 1",
    //       path: "#",
    //     },
    //     {
    //       title: "Sub 1",
    //       path: "#",
    //     },
    //     {
    //       title: "Sub 1",
    //       path: "#",
    //     },
    //   ],
    // },
  ];
  const { pathname } = useLocation();

  return (
    <header
      id="header"
      className="fixed z-10 backdrop-blur w-full max-w-[1280px] left-1/2 -translate-x-1/2 bottom-6 px-4 lg:px-5 xl:px-10 mx-auto"
    >
      <div className="header-content py-3 rounded-xl bg-gray-500 bg-opacity-25 relative border border-gray-500 shadow-lg">
        <ul className="flex items-center justify-center gap-2 lg:gap-4">
          {menuList.map((e, i) => {
            const sub = e.sub;
            if (!sub) {
              return (
                <li
                  key={i}
                  className={`menu-item hover:bg-slate-200 hover:bg-opacity-25 text-gray-200 hover:text-white text-xs sm:text-sm lg:text-base xl:text-lg font-semibold rounded transition-all duration-300 ${
                    pathname == e.path ? "active" : ""
                  }`}
                >
                  <a href={e.path} className="relative inline-block py-2 px-3">
                    {e.title}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </header>
  );
}

export default memo(Header);
