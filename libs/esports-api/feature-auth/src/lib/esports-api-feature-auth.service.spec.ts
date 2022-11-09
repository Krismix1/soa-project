import { Test } from '@nestjs/testing';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';

describe('EsportsApiFeatureAuthService', () => {
  let service: EsportsApiFeatureAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EsportsApiFeatureAuthService],
    }).compile();

    service = module.get(EsportsApiFeatureAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
