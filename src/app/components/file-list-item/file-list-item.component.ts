import { Component, Input } from '@angular/core'
import { File } from '../../models/file.model'
import { DirectoryService } from '../../services/directory.service'

@Component({
    selector: 'app-file-list-item',
    templateUrl: './file-list-item.component.html',
    styleUrls: ['./file-list-item.component.scss']
})
export class FileListItemComponent {
    @Input() file: File

    constructor(private directoryService: DirectoryService) {
    }

    public selectFile(): void {
        this.directoryService.selectFile(this.file)
    }

    public unselectFile(): void {
        this.directoryService.selectFile(null)
    }
}
