import { importProvidersFrom } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DataService } from './service/data.service';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

import { FilterPipe } from './components/pipes/filter.pipe';
import { UploadcsvComponent } from './components/uploadcsv/uploadcsv.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

const routes: Routes = [
  {path: '', component: ListUsersComponent},
  {path: 'list-users', component: ListUsersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListUsersComponent,
    FilterPipe,
    UploadcsvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    DataService,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
