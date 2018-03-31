BEGIN;

PRAGMA user_version = 2;

CREATE TABLE IF NOT EXISTS `appearance` (
  `id`           INTEGER NOT NULL DEFAULT    1 CHECK(id = 1),
  `dark_theme`   INTEGER NOT NULL DEFAULT    0 CHECK(dark_theme = 0 OR dark_theme = 1),
  PRIMARY KEY(id)
);

INSERT OR IGNORE INTO `appearance` ( `id` ) VALUES ( 1 );

CREATE TABLE IF NOT EXISTS `window` (
  `id`           INTEGER NOT NULL DEFAULT    1 CHECK(id = 1),
  `x`            INTEGER          DEFAULT NULL,
  `y`            INTEGER          DEFAULT NULL,
  `width`        INTEGER NOT NULL DEFAULT 1000 CHECK(width > 0),
  `height`       INTEGER NOT NULL DEFAULT  600 CHECK(height > 0),
  `maximized`    INTEGER NOT NULL DEFAULT    1 CHECK(maximized = 0 OR maximized = 1),
  PRIMARY KEY(id)
);

INSERT OR IGNORE INTO `window` ( `id` ) VALUES ( 1 );

CREATE TABLE IF NOT EXISTS `recently_opened_files` (
  `path`         TEXT    NOT NULL,
  `last_opened`  TEXT    NOT NULL,
  `pinned`       INTEGER NOT NULL DEFAULT    0 CHECK(pinned = 0 OR pinned = 1),
  PRIMARY KEY(path)
);

COMMIT;
