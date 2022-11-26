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
    public rootDirectory$: Observable<Directory> = this.directoryService.rootDirectory$
    public subDirectories$: Observable<Directory[]> = this.directoryService.subDirectories$
    public files$: Observable<File[]> = this.directoryService.files$
    public selectedFile$: Observable<File> = this.directoryService.selectedFile$.asObservable()

    public isLoading = false

    constructor(
        private directoryService: DirectoryService
    ) {}

    ngOnInit(): void {
        this.populateDirectories()
    }

    private populateDirectories(): void {
        this.isLoading = true
        this.directoryService.populateDirectories().subscribe(() => {
            this.isLoading = false
        }, () => {
            this.isLoading = false
        })
    }

    public navigateToPreviousDirectory(): void {
        this.directoryService.navigateToPreviousDirectory()
    }
}
