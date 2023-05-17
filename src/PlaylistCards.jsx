import React from "react";

export default function PlaylistCards() {
  return (
    <>
      <div className="bg-gray-600 w-44 h-44 mb-4 mt-2 p-0 ml-5 flex flex-row-reverse flex-col rounded-lg items-center cursor-pointer relative">
        <div onClick={handleAddSong} className="h-6 w-6 p-0 self-start">
          <img className="m-0 p-0" src="../public/assets/plus.png" />
        </div>

        <div className="flex mb-2" onClick={handlePlay}>
          <img src={track.albumUrl} className="w-24 h-24 rounded-full" />
        </div>
        <div className="text-white p-0 m-0 flex-inline items-center text-center justify-center">
          <div>
            <h1 className="text-sm text-white p-0 m-0">{track.title}</h1>
            <p className="text-xs mb-1 text-white p-0 m-0">{track.artist}</p>
          </div>
        </div>
      </div>
    </>
  );
}
