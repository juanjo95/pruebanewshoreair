import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newshoreair';

  constructor(private token:TokenService){
  }

}
