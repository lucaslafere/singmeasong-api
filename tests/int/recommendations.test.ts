import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import _videoFactory from "../factories/videoFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`;
});

describe('Testa POST "/recommendations" - MainPage', () => {
  it("Deve retornar 201 ao criar vídeo corretamente", async () => {
    const video = await _videoFactory({});
    const result = await supertest(app).post("/recommendations").send(video);
    const createdVideo = await prisma.recommendation.findUnique({
      where: { name: video.name },
    });

    expect(result.status).toBe(201);
    expect(createdVideo).not.toBeNull();
  });
  it("Deve retornar 422 ao criar com body errado", async () => {
    const video = await _videoFactory({});
    delete video.name;
    const result = await supertest(app).post("/recommendations").send(video);
    expect(result.status).toBe(422);
  });
  it("Deve retornar 409 ao criar um video com mesmo nome", async () => {
    const video = await _videoFactory({ persist: true });
    const result = await supertest(app).post("/recommendations").send(video);
    expect(result.status).toBe(409);
  });
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
  it("Deve retornar 200 ao fazer um GET", async () => {
    await _videoFactory({ persist: true });
    const result = await supertest(app).get("/recommendations");
    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
  });
});

describe('Testa GET "/recommendations/:id" - Video Page by Id', () => {
  it("Deve retornar 200 ao buscar um video existente para aquele ID", async () => {
    await _videoFactory({persist: true});
    const result = await supertest(app).get(`/recommendations/1`);
    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
  });
  it("Deve retornar 404 ao buscar um ID que nao existe", async () => {
    const result = await supertest(app).get(`/recommendations/99999999999`);
    expect(result.status).toBe(404);
  });
});
describe('Testa GET "/recommendations/random" - Random Video Recommended', () => {
  it("Deve retornar 200 ao buscar um video aleatório quando existe um video no banco de dados", async () => {
    await _videoFactory({persist: true});
    const result = await supertest(app).get('/recommendations/random');
    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
  });
  it("Deve retornar 404 ao buscar um video aleatório quando NÃO existe um vídeo no banco de dados", async () => {
    const result = await supertest(app).get('/recommendations/random');
    expect(result.status).toBe(404);
  });
});
describe('Testa GET "/recommendations/top/:amount" - Order Videos by score amount', () => {
  it("Deve retornar 200 ao buscar os top vídeos, passando como params a quantidade de videos a serem listados", async () => {
    await _videoFactory({persist: true});
    const result = await supertest(app).get('/recommendations/top/10')
    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
  });
  it("Deve retornar 200 e 10 videos", async () => {
    await _videoFactory({persist: true});
    await _videoFactory({persist: true});
    await _videoFactory({persist: true});
    await _videoFactory({persist: true});
    await _videoFactory({persist: true});
    const result = await supertest(app).get('/recommendations/top/10')
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(5);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
