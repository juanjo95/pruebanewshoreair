import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from './../services/token.service';


describe('tokenService', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TokenService]
      }));

      it('should be created', () => {
      const service: TokenService = TestBed.get(TokenService);
      expect(service).toBeTruthy();
      });

      it('should have generateToken function', () => {
      const service: TokenService = TestBed.get(TokenService);
      expect(service.generateToken).toBeTruthy();
      });

      it('should have getToken function', () => {
        const service: TokenService = TestBed.get(TokenService);
        expect(service.getToken).toBeTruthy();
        });

    });
