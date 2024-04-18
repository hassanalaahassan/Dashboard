import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './componants/register/register.component';
import { LoginComponent } from './componants/login/login.component';
import { BlankComponent } from './layout/blank/blank.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AuthNavComponent } from './componants/auth-nav/auth-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { NavBlankComponent } from './componants/nav-blank/nav-blank.component';
import { AlltasksComponent } from './componants/alltasks/alltasks.component';
import { UsersComponent } from './componants/users/users.component';
import { CoreModule } from './core/core.module';
import { NewTaskComponent } from './componants/alltasks/new-task/new-task.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { ImgNamePipe } from './pipe/img-name.pipe';
import { SearchPipe } from './pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from './componants/confirm/confirm.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaginationPipe } from './pipe/pagination.pipe';
import {TranslateLoader,TranslateService, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ErrorComponent } from './componants/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BlankComponent,
    AuthComponent,
    AuthNavComponent,
    NavBlankComponent,
    AlltasksComponent,
    UsersComponent,
    NewTaskComponent,
    ImgNamePipe,
    SearchPipe,
    ConfirmComponent,
    PaginationPipe,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    CoreModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
