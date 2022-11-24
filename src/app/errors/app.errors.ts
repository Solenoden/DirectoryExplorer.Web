/* istanbul ignore file */

import { UserFriendlyError } from './user-friendly-error.model'

const defaultUnexpectedErrorMessage = 'An unexpected error occurred'

export class ApiCallError extends UserFriendlyError {
    constructor(
        httpMethod: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE',
        endpoint: string,
        originalError: Error
    ) {
        super(
            defaultUnexpectedErrorMessage,
            `API call to ${httpMethod} ${endpoint} failed`,
            originalError
        )
    }
}