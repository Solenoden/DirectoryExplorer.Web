/* istanbul ignore file */

export const environment = {
    production: true,
    backendUrl: window['env'] && window['env']['backendUrl']
        ? window['env']['backendUrl']
        : ''
}
