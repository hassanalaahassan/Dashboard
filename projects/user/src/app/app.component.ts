import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user';
  constructor(private translate: TranslateService) {
    translate.defaultLang
    translate.use('en');
    console.log(translate.currentLang);

  }
}
