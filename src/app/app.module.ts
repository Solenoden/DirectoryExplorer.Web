import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { DirectoryListItemComponent } from './components/directory-list-item/directory-list-item.component'
import { FileListItemComponent } from './components/file-list-item/file-list-item.component'

@NgModule({
    declarations: [
        AppComponent,
        DirectoryListItemComponent,
        FileListItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
