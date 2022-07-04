import { Test, TestingModule } from '@nestjs/testing';
import { PocketController } from './pocket.controller';

describe('PocketController', () => {
  let controller: PocketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PocketController],
    }).compile();

    controller = module.get<PocketController>(PocketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
