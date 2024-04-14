import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})
export class AuthNavComponent {
  lang:any='en'

    constructor(private _TranslateService:TranslateService){}

  ngOnInit(): void {
    this.lang = this._TranslateService.currentLang
  }
    changeLanguage():void{
      if(this.lang == 'en'){
        localStorage.setItem('language','ar')
      }
      else{
        localStorage.setItem('language','en')
      }
      window.location.reload()
    }
}
