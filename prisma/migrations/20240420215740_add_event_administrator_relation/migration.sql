/*
  Warnings:

  - Added the required column `adm_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "adm_id" TEXT NOT NULL,
    "maximum_attendes" INTEGER,
    CONSTRAINT "events_adm_id_fkey" FOREIGN KEY ("adm_id") REFERENCES "administrator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_events" ("details", "id", "maximum_attendes", "slug", "title") SELECT "details", "id", "maximum_attendes", "slug", "title" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
