import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './../services/api.service';


describe('apiSerice', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ApiService]
      }));

      it('should be created', () => {
      const service: ApiService = TestBed.get(ApiService);
      expect(service).toBeTruthy();
      });

      it('should have getFlights function', () => {
      const service: ApiService = TestBed.get(ApiService);
      expect(service.getFlights).toBeTruthy();
      });

    });
