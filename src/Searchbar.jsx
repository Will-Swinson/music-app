import React, { useState, useEffect } from "react";
import useAuth from "./useAuth.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult.jsx";
import Player from "./Player.jsx";
import PlaylistCards from "./PlaylistCards.jsx";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "6149eda588f347a0856c12deaaff09a3",
});

export default function Searchbar({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  let currentUser = window.localStorage.getItem("selectedUserId");
  // const accessToken = useAuth(code);

  const handlePlaylistClick = async (event) => {
    event.preventDefault();

    console.log(currentUser);
    // Make the GET request
    const response = await axios.get("/api/playlist/all", {
      params: {
        userId: currentUser,
      },
    });

    const trackURI = response.data.playlist.song_id;
    // Set the track URI you want to search for
    // const trackURI = response.data.playlist.song_id;

    // // Make the search request
    const spotifyResponse = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: `uri:${trackURI}`,
          type: "track",
          limit: 1,
        },
      }
    );
    console.log(spotifyResponse.data.tracks.items[0]);
    const songName = track.name;
    const artist = track.artists[0].name;
    const songImage = track.album.images[0].url;
  };

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  function selectedTrack(track) {
    let selectedTrack = track;
    return selectedTrack;
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (!accessToken) return;
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      console.log(searchResults);
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <>
      <div className="flex ml-96 mt-6">
        <div className="h-4 w-8 text-white" onClick={handlePlaylistClick}>
          <button>Playlists</button>
        </div>
        <form
          onSubmit={handleSearchSubmit}
          className="w-64 h-8 flex  justify-center bg-white"
        >
          <input
            className="pl-2 pr-2 w-full"
            type="search"
            placeholder="Search songs,artists, albums..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="grid grid-cols-5 mt-6 mb-8">
        {searchResults.map((track) => {
          return (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
              selectedTrack={selectedTrack}
            />
          );
        })}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
      <div>{/* <PlaylistCards accessToken={accessToken} />{" "} */}</div>
    </>
  );
}
