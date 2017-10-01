import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveZipFileComponent } from './save-zip-file.component';

describe('SaveZipFileComponent', () => {
  let component: SaveZipFileComponent;
  let fixture: ComponentFixture<SaveZipFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveZipFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveZipFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
