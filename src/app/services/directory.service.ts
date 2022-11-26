import { BehaviorSubject, Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpService } from './http.service'
import { Directory } from '../models/directory.model'
import { File } from '../models/file.model'
import { map } from 'rxjs/operators'
import { ScreenSize, UiService } from './ui.service'

@Injectable({ providedIn: 'root' })
export class DirectoryService {
    public rootDirectory$: BehaviorSubject<Directory> = new BehaviorSubject<Directory>(null)
    public subDirectories$: Observable<Directory[]> = this.rootDirectory$.pipe(map(x => x?.directories))
    public files$: Observable<File[]> = this.rootDirectory$.pipe(map(x => x?.files))
    public selectedFile$: BehaviorSubject<File> = new BehaviorSubject<File>(null)

    private previousRootDirectory: Directory
    private initialRootDirectory: Directory

    constructor(
        private httpService: HttpService,
        private uiService: UiService
    ) {}

    public populateDirectories(): void {
        // TODO: Possibly 'paginate' directory
        this.httpService.get('/directory').subscribe(result => {
            const directory = new Directory(result as { [key: string]: any })

            this.initialRootDirectory = directory
            this.rootDirectory$.next(directory)
        })
    }

    public selectDirectory(directoryName: string): void {
        const newRootDirectory = this.rootDirectory$.value.directories.find(
            x => x.name?.toLowerCase() === directoryName?.toLowerCase()
        )

        if (newRootDirectory) {
            this.previousRootDirectory = this.rootDirectory$.value
            this.rootDirectory$.next(newRootDirectory)
        }
    }

    public navigateToPreviousDirectory(): void {
        if (this.previousRootDirectory) {
            const tempPreviousRootDirectory = { ...this.previousRootDirectory }
            this.previousRootDirectory = this.rootDirectory$.value
            this.rootDirectory$.next(tempPreviousRootDirectory)

            if (this.uiService.screenSize$.value <= ScreenSize.Tablet) {
                this.selectFile(null)
            }
        }
    }

    public selectFile(file: File): void {
        this.selectedFile$.next(file)
    }
}