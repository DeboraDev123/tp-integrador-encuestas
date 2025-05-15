import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    ConfirmDialogModule,
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
