import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";


interface iVideo {
    name: string,
    youtubeLink: string
}
 export default async function _videoFactory({ persist = false }): Promise<iVideo> {
  const youtubeLink = `https://www.youtube.com/${faker.lorem.words()}`;

  const video = {
    name: faker.name.firstName(),
    youtubeLink,
  };
  if (persist) {
    await prisma.recommendation.create({
      data: video,
    });
    return video;
  }

  return video;
}