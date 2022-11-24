import { Component, Input } from '@angular/core'
import { Directory } from '../../models/directory.model'
import { DirectoryService } from '../../services/directory.service'

@Component({
    selector: 'app-directory-list-item',
    templateUrl: './directory-list-item.component.html',
    styleUrls: ['./directory-list-item.component.scss']
})
export class DirectoryListItemComponent {
    @Input() directory: Directory

    constructor(private directoryService: DirectoryService) {}

    public onSelect(): void {
        this.directoryService.selectDirectory(this.directory.name)
    }
}
