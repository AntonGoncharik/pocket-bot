import { Test, TestingModule } from '@nestjs/testing';
import { PocketService } from './pocket.service';

describe('PocketService', () => {
  let service: PocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PocketService],
    }).compile();

    service = module.get<PocketService>(PocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
