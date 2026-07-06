import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 3; i++) {
    const name = faker.lorem.word();
    const folder = await createFolder({ name });
    const folderID = folder.id;
    for (let y = 0; y < 5; y++) {
      const name = faker.lorem.word();
      const size = faker.number.int({ min: 10, max: 100 });
      await createFile({ name, size, folderID });
    }
  }
}
