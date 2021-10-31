import { Test, TestingModule } from '@nestjs/testing';
import { GongmoController } from './gongmo.controller';

describe('GongmoController', () => {
  let controller: GongmoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GongmoController],
    }).compile();

    controller = module.get<GongmoController>(GongmoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
