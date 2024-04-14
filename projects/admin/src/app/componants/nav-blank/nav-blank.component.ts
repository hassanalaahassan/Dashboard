import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  lang:any
  constructor(
    private _AuthService:AuthService,
    private _Router:Router,
    private _TranslateService:TranslateService
    ){}

    ngOnInit(): void {
      this._AuthService.activeToken.subscribe()
      this.lang = this._TranslateService.currentLang
    }

  logOut():void{
    localStorage.removeItem('adminToken')
    this._Router.navigate(['/login'])
    this._AuthService.activeToken.next('')
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
