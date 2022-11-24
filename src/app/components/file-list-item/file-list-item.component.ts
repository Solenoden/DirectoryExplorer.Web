import { Component, Input } from '@angular/core'
import { File } from '../../models/file.model'

@Component({
    selector: 'app-file-list-item',
    templateUrl: './file-list-item.component.html',
    styleUrls: ['./file-list-item.component.scss']
})
export class FileListItemComponent {
    @Input() file: File
}
