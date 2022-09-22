import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";
import _videoFactory from './factories/videoFactory'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`;
});

describe('Testa POST "/recommendations" - MainPage', () => {
  it("Deve retornar 201 ao criar vídeo corretamente", async () => {
    const video = await _videoFactory({});
    const result = await supertest(app).post('/recommendations').send(video);
    const createdVideo = await prisma.recommendation.findUnique({
      where: {name: video.name}
    });

    expect(result.status).toBe(201);
    expect(createdVideo).not.toBeNull();
  });
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
});
describe('Testa POST "/recommendations/:id/upvote" - Upvote Video', () => {
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
});
describe('Testa POST "/recommendations/:id/downvote" - Downvote Video', () => {
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
});

describe('Testa GET "/recommendations" - MainPage', () => {
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
});

describe('Testa GET "/recommendations/:id" - Video Page by Id', () => {
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
});
describe('Testa GET "/recommendations/random" - Random Video Recommended', () => {
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
});
describe('Testa GET "/recommendations/top/:amount" - Order Videos by score amount', () => {
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
  it.todo("Deve retornar XXX ao YYY");
});

afterAll(async () => {
  await prisma.$disconnect();
});
