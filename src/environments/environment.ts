/* istanbul ignore file */

export const environment = {
    production: false,
    backendUrl: window['env'] && window['env']['backendUrl']
        ? window['env']['backendUrl']
        : 'http://localhost:3000/api/v1'
}
