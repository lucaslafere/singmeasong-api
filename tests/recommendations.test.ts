import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`;
});

describe('Testa POST "/recommendations" - MainPage', () => {
  it.todo("Deve retornar XXX ao YYY");
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
