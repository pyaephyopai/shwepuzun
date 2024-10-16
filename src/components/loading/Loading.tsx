import { useEffect } from "react";
import { loadingStore } from "../../store/isLoadingStore";

import "./css/Loading.css";

const Loading = () => {
  const { isLoading } = loadingStore();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.top = "0";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="loading_section absolute top-0 left-0 z-[999] bg-black w-full h-full opacity-75">
          <div className="banter-loader ">
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
