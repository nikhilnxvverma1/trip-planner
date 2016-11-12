import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './login/signup.component';
import { DataService } from './services/data.service';

import {SearchComponent} from "./search/search.component";
import {CompareComponent} from "./compare/compare.component";

const routing = RouterModule.forRoot([
    { path: '',      component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'search', component: SearchComponent },
    { path: 'compare', component: CompareComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SearchComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    DataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
