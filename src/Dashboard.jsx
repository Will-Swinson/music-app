import React from "react";
import Header from "./Header";
import TrackSearchResult from "./TrackSearchResult";
import Searchbar from "./Searchbar";

export default function Dashboard({ code }) {
  return (
    <>
      <Header code={code} />
      <Searchbar code={code} />
    </>
  );
}
