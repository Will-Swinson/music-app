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
  const [playlist, setPlaylist] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);

  let currentUser = window.localStorage.getItem("selectedUserId");
  // const accessToken = useAuth(code);

  const handlePlaylistClick = async (event) => {
    setShowPlaylist((prevState) => !prevState);

    event.preventDefault();

    console.log(currentUser);
    // Make the GET request
    const response = await axios.get("/api/playlist/all", {
      params: {
        userId: currentUser,
      },
    });

    const trackURI = response.data.playlist.map((track) => track.song_id);

    const trackInfoArray = [];

    for (const track of trackURI) {
      const trackId = track.split(":").pop();

      const spotifyResponse = await axios.get(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Extract the desired information from the response
      const { name, artists, album } = spotifyResponse.data;

      // Extract the first artist's name
      const artistName = artists[0].name;

      // Extract the album image URL
      const imageUrl = album.images[0].url;

      // Create an object with the track information
      const trackInfo = {
        name,
        artist: artistName,
        imageUrl,
        uri: track,
      };

      trackInfoArray.push(trackInfo);
    }

    setPlaylist(trackInfoArray);
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

  console.log(playingTrack);
  return (
    <>
      <div className="flex ml-96 mt-6">
        <div
          className="h-8 w-16 ml-84 bg-white text-blue-400 ml-64 mr-8 flex justify-center items-center text-center rounded-full"
          onClick={handlePlaylistClick}
        >
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
      {showPlaylist && (
        <div className="grid grid-cols-5 mt-6 mb-8">
          {playlist.map((track) => (
            <PlaylistCards
              track={track}
              key={track.name}
              chooseTrack={chooseTrack}
              selectedTrack={selectedTrack}
            />
          ))}
        </div>
      )}
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
      <div>
        {/* {playlist.map((song) => {
          console.log(song);
        })} */}
      </div>
    </>
  );
}
