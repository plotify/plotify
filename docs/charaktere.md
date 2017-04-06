# Charaktere

Ein Charakter ist eine handelnde Person in einer Geschichte.


## Attribute

Jeder Charakter hat die folgenden Attribute:

| Name      | Datentyp | Beschreibung                                                     |
|-----------|----------|------------------------------------------------------------------|
| id        | UUID     | Ein eindeutiger Bezeichner für den Charakter in Form einer UUID. |
| name      | String   | Der Name des Charakters.                                         |
| deleted   | boolean  | Wurde der Charakter gelöscht?                                    |

Jedem Charakter ist ein Steckbrief zugeordnet, der aus einer Reihe von
gruppierten Key-Value-Paaren besteht. Jeder Steckbrief hat die folgenden
Attribute:

| Name      | Datentyp | Beschreibung                                                     |
|-----------|----------|------------------------------------------------------------------|
| id        | UUID     | Die ID des Charakters, dem dieser Steckbrief zugeorndet ist.     |
| groups    | Group[]  | Ein Array mit den Gruppen des Steckbriefs.                       |

Jede Gruppe hat die folgenden Attribute:

| Name      | Datentyp | Beschreibung                                                     |
|-----------|----------|------------------------------------------------------------------|
| title     | String   | Der Titel der Gruppe.                                            |
| entries   | Entry[]  | Ein Array mit den Einträgen in der Gruppe.                       |

Jeder Eintrag hat die folgenden Attribute:

| Name      | Datentyp | Beschreibung                                                     |
|-----------|----------|------------------------------------------------------------------|
| title     | String   | Der Titel des Eintrags.                                          |
| value     | String   | Der Wert des Eintrags.                                           |


## Tabellen in SQLite

Charaktere und deren Steckbriefe werden in den folgenden Tabellen in einer
SQLite-Datenbank abgelegt. Alle Texte werden in der Zeichenkodierung UTF-8
gespeichert.

### characters

```sql
CREATE TABLE `characters` (
  `id`      BLOB    NOT NULL,
  `name`    TEXT    NOT NULL,
  `deleted` INTEGER NOT NULL CHECK(deleted = 0 OR deleted = 1),
  PRIMARY KEY(id)
);
```

Die ID sind die 16 Bytes der UUID des Charakters.
