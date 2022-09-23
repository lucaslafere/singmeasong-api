import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testes unitários do recommendation service", () => {
  it("Deve criar um video", async () => {
    const video = {
      name: "bla bla bla",
      youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
    };
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    await recommendationService.insert({
      name: video.name,
      youtubeLink: video.youtubeLink,
    });

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });
  it("Não deve criar um video duplicado", async () => {
    const video = {
      name: "bla bla bla",
      youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
    };
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return {
          name: "bla bla bla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
        };
      });
    const promise = recommendationService.insert({
      name: video.name,
      youtubeLink: video.youtubeLink,
    });
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "Recommendations names must be unique",
    });
    expect(recommendationRepository.create).not.toBeCalled();
  });
  it("Deveria dar upvote", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: "blabla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
          score: 2,
        };
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: "blabla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
          score: 3,
        };
      });
    const promise = await recommendationService.upvote(1);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Deveria dar downvote", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: "blabla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
          score: 2,
        };
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: "blabla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
          score: 3,
        };
      });
    await recommendationService.downvote(1);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Deveria remover video com 6 ou mais votos negativos totais (< -5 votos)", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: "blabla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
          score: -5,
        };
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: "blabla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
          score: -6,
        };
      });
    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});
    await recommendationService.downvote(1);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });
  it("Deveria retornar todos os videos", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: "blabla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
          score: 2,
        };
      });
    const promise = await recommendationService.get();
    expect(promise).toBeDefined();
    expect(recommendationRepository.findAll).toBeCalled();
  });
  it("Deveria retornar o video mais votado", async () => {
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: "bla",
          youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
          score: 2,
        };
      });
    const promise = await recommendationService.getTop(1);
    expect(promise).toBeDefined();
    expect(recommendationRepository.getAmountByScore).toBeCalled();
  });
  it("Deveria retornar um video aleatorio", async () => {
    jest.spyOn(Math, "random").mockImplementationOnce((): any => {
      1;
    });
    jest.spyOn(Math, "floor").mockImplementationOnce((): any => {
      1;
    });
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementation((): any => {
        return [
          {
            id: 1,
            name: "bla",
            youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
            score: 20,
          },
        ];
      });
    await recommendationService.getRandom();
    expect(recommendationRepository.findAll).toBeCalled();
    expect(Math.random).toBeCalled();
    expect(Math.floor).toBeCalled();
  });
  it("Deveria retornar um video aleatorio, testando numero menor que 0.7 para random", async () => {
    jest.spyOn(Math, "random").mockImplementation((): any => {
        return 0.2;
      });
      jest.spyOn(Math, "floor").mockImplementationOnce((): any => {
        0;
      });
      jest
        .spyOn(recommendationRepository, "findAll")
        .mockImplementation((): any => {
          return [
            {
              id: 1,
              name: "bla",
              youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
              score: 20,
            },
          ];
        });
      await recommendationService.getRandom();
      expect(recommendationRepository.findAll).toBeCalled();
      expect(Math.random).toBeCalled();
      expect(Math.floor).toBeCalled();
  });
  it("Deveria retornar not_found", async () => {
    jest.spyOn(Math, "random").mockImplementation((): any => {
        return 0.2;
      });
      jest
        .spyOn(recommendationRepository, "findAll")
        .mockImplementation((): any => {
          return {};
        });
      await recommendationService.getRandom();
      expect(recommendationRepository.findAll).toBeCalled();
      expect(Math.random).toBeCalled();
  });
  it("Deveria XXX", async () => {});
  it("Deveria XXX", async () => {});
  it("Deveria XXX", async () => {});
  it("Deveria XXX", async () => {});
  it("Deveria XXX", async () => {});
});

afterEach(() => {
    jest.spyOn(Math, 'random').mockRestore();
  });