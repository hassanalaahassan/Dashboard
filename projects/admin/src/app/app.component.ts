import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  language:any='en'
  constructor(private _translate: TranslateService) {
    if("language" in localStorage){
      this.language = localStorage.getItem('language')
      _translate.use(this.language);
    }
    else
    {
      localStorage.setItem('language','en')
      this.language = localStorage.getItem('language')
      _translate.use(this.language)
    }
  }
}
