import { Component, Input } from '@angular/core'
import { File } from '../../models/file.model'
import { DirectoryService } from '../../services/directory.service'
import { ScreenSize, UiService } from '../../services/ui.service'

@Component({
    selector: 'app-file-list-item',
    templateUrl: './file-list-item.component.html',
    styleUrls: ['./file-list-item.component.scss']
})
export class FileListItemComponent {
    @Input() file: File

    constructor(
        private directoryService: DirectoryService,
        private uiService: UiService
    ) {
    }

    public selectFile(): void {
        this.directoryService.selectFile(this.file)
    }

    public unselectFile(): void {
        if (this.uiService.screenSize$.value > ScreenSize.Tablet) {
            this.directoryService.selectFile(null)
        }
    }
}
