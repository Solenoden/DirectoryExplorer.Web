import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

export enum ScreenSize {
    Mobile = 400,
    Tablet = 768,
    Desktop = 9999
}

@Injectable({ providedIn: 'root' })
export class UiService {
    public screenSize$: BehaviorSubject<ScreenSize> = new BehaviorSubject<ScreenSize>(ScreenSize.Mobile);

    constructor() {
        this.trackScreenSize()
    }

    public trackScreenSize(): void {
        window.addEventListener('resize', (event) => {
            // eslint-disable-next-line no-extra-parens
            const screenWidth = (event.target as unknown as { outerWidth: number }).outerWidth
            const screenSizeKey = Object.keys(ScreenSize).find(x => ScreenSize[x] >= screenWidth)
            this.screenSize$.next(ScreenSize[screenSizeKey])
        })

        window.dispatchEvent(new Event('resize'))
    }
}