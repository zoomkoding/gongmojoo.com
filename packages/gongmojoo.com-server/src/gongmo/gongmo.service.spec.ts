import { Test, TestingModule } from '@nestjs/testing';
import { GongmoService } from './gongmo.service';

describe('GongmoService', () => {
  let service: GongmoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GongmoService],
    }).compile();

    service = module.get<GongmoService>(GongmoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
