import React from "react";
import Player from "./Player";
import Searchbar from "./Searchbar";

export default function TrackSearchResult({ track, chooseTrack }) {
  console.log(track.albumUrl, track.title, track.artist);

  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <>
      <div
        onClick={handlePlay}
        className="bg-gray-600 w-44 h-44 mb-4 mt-2 p-0 ml-5 flex justify-end flex-col rounded-lg items-center cursor-pointer"
      >
        <div className="flex mb-2">
          <img src={track.albumUrl} className=" w-24 m-0 h-24 rounded-full" />
        </div>
        <div className="text-white p-0 m-0 flex-inline items-center text-center justify-center">
          <div>
            <h1 className="text-sm text-white p-0 m-0  ">{track.title}</h1>
            <p className="text-xs mb-1 text-white p-0 m-0 ">{track.artist}</p>
          </div>
        </div>
      </div>
    </>
  );
}
