/* istanbul ignore file */

(function(window) {
    window.env = window.env || {}

    // Environment variables
    window['env']['backendUrl'] = '${BACKEND_URL}'
})(this)
