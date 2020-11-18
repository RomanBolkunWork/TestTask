import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from '../app/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadComponent } from './components/file-upload/file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        FileUploadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FormsModule
    ],
    providers: [
        ApiService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
