import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Directory } from './models/directory.model'
import { File } from './models/file.model'
import { DirectoryService } from './services/directory.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public subDirectories$: Observable<Directory[]> = this.directoryService.subDirectories$
    public files$: Observable<File[]> = this.directoryService.files$

    constructor(
        private directoryService: DirectoryService
    ) {}

    ngOnInit(): void {
        this.directoryService.populateDirectories()
    }

    public navigateToPreviousDirectory(): void {
        this.directoryService.navigateToPreviousDirectory()
    }
}
