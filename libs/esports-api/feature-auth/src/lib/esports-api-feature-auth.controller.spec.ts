import { Test } from '@nestjs/testing';
import { EsportsApiFeatureAuthController } from './esports-api-feature-auth.controller';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';

describe('EsportsApiFeatureAuthController', () => {
  let controller: EsportsApiFeatureAuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EsportsApiFeatureAuthService],
      controllers: [EsportsApiFeatureAuthController],
    }).compile();

    controller = module.get(EsportsApiFeatureAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
