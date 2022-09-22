import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`;
});

describe('Testa POST "/" --- MainPage', () => {
    it.todo('Deve retornar XXX ao YYY', async () => {

    });
    it.todo('Deve retornar XXX ao YYY', async () => {

    });
    it.todo('Deve retornar XXX ao YYY', async () => {

    });
    it.todo('Deve retornar XXX ao YYY', async () => {

    });
});
describe('Testa GET "/" --- MainPage', () => {
    it.todo('Deve retornar XXX ao YYY', async () => {

    });
    it.todo('Deve retornar XXX ao YYY', async () => {

    });
    it.todo('Deve retornar XXX ao YYY', async () => {

    });
    it.todo('Deve retornar XXX ao YYY', async () => {

    });
});