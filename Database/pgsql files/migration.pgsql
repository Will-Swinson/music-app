CREATE TABLE playlists
(
  id                SERIAL  NOT NULL,
  title             TEXT    NOT NULL,
  created_date      date    NOT NULL,
  public_or_private boolean NOT NULL,
  last_modified     date    NOT NULL,
  user_id           integer NOT NULL,
  song_id           integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (song_id) REFERENCES songs (id)
);

CREATE TABLE songs
(
  id          SERIAL NOT NULL,
  song_name   text   NOT NULL,
  artist      text   NOT NULL,
  genre       text   NOT NULL,
  length      text   NOT NULL,
  sound_link  text   NOT NULL,
  playlist_id integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (playlist_id) REFERENCES playlists (id)
);


CREATE TABLE playlist_songs
(
  id          SERIAL  NOT NULL,
  playlist_id integer NOT NULL,
  song_id     integer NOT NULL,
  PRIMARY KEY (playlist_id, song_id),
  FOREIGN KEY (playlist_id) REFERENCES playlists (id),
  FOREIGN KEY (song_id) REFERENCES songs (id)
);

CREATE TABLE users
(
  id          SERIAL NOT NULL,
  username    TEXT   NOT NULL,
  password    TEXT   NOT NULL,
  email       TEXT   NOT NULL,
  playlist_id integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (playlist_id) REFERENCES playlists (id)
);
