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

    private initialRootDirectory: Directory

    constructor(
        private httpService: HttpService,
        private uiService: UiService
    ) {
        this.clearFileSelectionOnDirectoryChange()
    }

    public populateDirectories(path = ''): Observable<void> {
        return new Observable<void>(observer => {
            this.httpService.get(`/directory?path=${path}`).subscribe(result => {
                const directory = new Directory(result as { [key: string]: any })

                if (this.initialRootDirectory) {
                    const parentDirectory = this.findDirectory(path)
                    if (parentDirectory) {
                        parentDirectory.directories = directory.directories
                        parentDirectory.files = directory.files
                        parentDirectory.isDeadEnd = directory.isDeadEnd
                    }
                } else {
                    this.initialRootDirectory = directory
                }

                this.rootDirectory$.next(directory)
                observer.next()
                observer.complete()
            }, error => {
                observer.error(error)
            })
        })
    }

    public selectDirectory(directoryName: string): void {
        const newRootDirectory = this.rootDirectory$.value.directories.find(
            x => x.name?.toLowerCase() === directoryName?.toLowerCase()
        )

        if (newRootDirectory) {
            if (newRootDirectory.directories.length === 0 && !newRootDirectory.isDeadEnd) {
                this.populateDirectories(newRootDirectory.fullPath).subscribe()
            }
            this.rootDirectory$.next(newRootDirectory)
        }
    }

    public navigateToPreviousDirectory(): void {
        const currentDirectoryPathParts = this.rootDirectory$.value.fullPath.split('/')
        const parentDirectoryPath = currentDirectoryPathParts.slice(0, currentDirectoryPathParts.length - 1).join('/')

        const parentDirectory = this.findDirectory(parentDirectoryPath)
        if (parentDirectory) {
            this.rootDirectory$.next(parentDirectory)
        }
    }

    public selectFile(file: File): void {
        this.selectedFile$.next(file)
    }

    private findDirectory(fullPath: string, currentDirectory = this.initialRootDirectory): Directory {
        if (currentDirectory.fullPath === fullPath || currentDirectory.fullPath === fullPath + '/') return currentDirectory

        for (const x of currentDirectory.directories) {
            const matchingDirectory = this.findDirectory(fullPath, x)
            if (matchingDirectory) return matchingDirectory
        }

        return null
    }

    private clearFileSelectionOnDirectoryChange(): void {
        this.rootDirectory$.subscribe(() => {
            if (this.uiService.screenSize$.value <= ScreenSize.Tablet) {
                this.selectFile(null)
            }
        })
    }
}