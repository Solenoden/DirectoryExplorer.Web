import { Component, Input } from '@angular/core'
import { File } from '../../models/file.model'
import * as moment from 'moment'

@Component({
    selector: 'app-file-details-card',
    templateUrl: './file-details-card.component.html',
    styleUrls: ['./file-details-card.component.scss']
})
export class FileDetailsCardComponent {
    @Input() file: File

    public get creationDate(): string {
        const creationDate = moment(this.file.creationDateEpoch)
        return creationDate.format('DD/MM/YYYY') + ' - ' + creationDate.fromNow()
    }

    public get modifiedDate(): string {
        const modificationDate = moment(this.file.modificationDateEpoch)
        return modificationDate.format('DD/MM/YYYY') + ' - ' + modificationDate.fromNow()
    }
}
