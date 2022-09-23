import { jest } from '@jest/globals';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { recommendationService } from '../../src/services/recommendationsService';

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Testes unitários do recommendation service', () => {
    it('Deve criar um video', async () => {
        const video = {
            name: "bla bla bla",
            youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U"
        }
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => {});
        jest.spyOn(recommendationRepository, 'create').mockImplementationOnce((): any => {});

        await recommendationService.insert({name: video.name, youtubeLink: video.youtubeLink});

        expect(recommendationRepository.findByName).toBeCalled()
        expect(recommendationRepository.create).toBeCalled();
    })
    it('Não deve criar um video duplicado', async () => {
        const video = {
            name: "bla bla bla",
            youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U"
        }
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => {
            return {
                name: "bla bla bla",
                youtubeLink: "https://www.youtube.com/watch?v=cGOyN-4Kb7U"
            }
        })
        const promise = recommendationService.insert({name: video.name, youtubeLink: video.youtubeLink});
        expect(promise).rejects.toEqual({
            type: 'conflict',
            message: 'Recommendations names must be unique'
        })
        expect(recommendationRepository.create).not.toBeCalled();
    })
    it('Deveria XXX', async () => {
        
    })
    it('Deveria XXX', async () => {

    })
    it('Deveria XXX', async () => {

    })
    it('Deveria XXX', async () => {

    })
    it('Deveria XXX', async () => {

    })
    it('Deveria XXX', async () => {

    })
})
