import React from "react";
import PlaceholderCards from "./PlaceholderCards";
import PraysCards from "./PraysCards";
import useNews from "../Hooks/usePrays";

const Prays = () => {
  const [news, loading] = useNews();

  return (
    <div className="container py-3">
      {loading ? <PlaceholderCards /> : <PraysCards news={news} />}
    </div>
  );
};

export default Prays;
