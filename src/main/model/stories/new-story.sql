PRAGMA user_version = 1;

CREATE TABLE `character` (
  `id`                  TEXT NOT NULL,
  `presence_history_id` TEXT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(`presence_history_id`) REFERENCES character_history(id)
);

CREATE TABLE `character_history` (
  `id`      TEXT    NOT NULL,
  `name`    TEXT    NOT NULL,
  `deleted` INTEGER NOT NULL DEFAULT 0 CHECK(deleted = 0 OR deleted = 1),
  PRIMARY KEY(id)
);

CREATE TABLE `character_changes_sequence` (
  `character_id` TEXT    NOT NULL,
  `queue`        INTEGER NOT NULL CHECK(queue = 0 OR queue = 1),
  `position`     INTEGER NOT NULL CHECK(position >= 0),
  `type`         INTEGER NOT NULL CHECK(type = 0 OR type = 1 OR type = 2),
  `history_id`   TEXT NOT NULL,
  FOREIGN KEY(`character_id`) REFERENCES character(id)
);

CREATE TABLE `entry_group` (
  `character_id`        TEXT NOT NULL,
  `id`                  TEXT NOT NULL,
  `presence_history_id` TEXT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(`character_id`)        REFERENCES character(id),
  FOREIGN KEY(`presence_history_id`) REFERENCES entry_group_history(id)
);

CREATE TABLE `entry_group_history` (
  `id`       TEXT    NOT NULL,
  `title`    TEXT    NOT NULL,
  `position` INTEGER NOT NULL           CHECK(position >= 0),
  `deleted`  INTEGER NOT NULL DEFAULT 0 CHECK(deleted = 0 OR deleted = 1),
  PRIMARY KEY(id)
);

CREATE TABLE `entry` (
  `group_id`            TEXT NOT NULL,
  `id`                  TEXT NOT NULL,
  `presence_history_id` TEXT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(`group_id`)            REFERENCES entry_group(id),
  FOREIGN KEY(`presence_history_id`) REFERENCES entry_history(id)
);

CREATE TABLE `entry_history` (
  `id`       TEXT    NOT NULL,
  `title`    TEXT    NOT NULL,
  `value`    TEXT    NOT NULL DEFAULT '',
  `position` INTEGER NOT NULL            CHECK(position >= 0),
  `deleted`  INTEGER NOT NULL DEFAULT 0  CHECK(deleted = 0 OR deleted = 1),
  PRIMARY KEY(id)
);
