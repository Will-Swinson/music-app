DROP TABLE IF EXISTS playlists,users, playlist_songs;


CREATE TABLE users
(
  id       serial NOT NULL,
  username TEXT   NOT NULL,
  password TEXT   NOT NULL,
  email    TEXT   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE playlists
(
  id                serial  NOT NULL,
  title             text    NOT NULL,
  created           date    NOT NULL,
  public_or_private boolean NOT NULL,
  last_modified     date    NOT NULL,
  user_id           INT  NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  PRIMARY KEY (id)
);

CREATE TABLE playlist_songs
(
  playlist_id INT NOT NULL,
  song_id     INT NOT NULL,
  FOREIGN KEY (playlist_id) REFERENCES playlists (id),
  PRIMARY KEY (playlist_id, song_id)
);
