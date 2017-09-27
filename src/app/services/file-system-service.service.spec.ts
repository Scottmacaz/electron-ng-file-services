import { TestBed, inject } from '@angular/core/testing';

import { FileSystemServiceService } from './file-system-service.service';

describe('FileSystemServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileSystemServiceService]
    });
  });

  it('should be created', inject([FileSystemServiceService], (service: FileSystemServiceService) => {
    expect(service).toBeTruthy();
  }));
});
