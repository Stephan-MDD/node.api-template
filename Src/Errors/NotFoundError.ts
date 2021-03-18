import BaseError from './BaseError'

export default class NotFoundError extends BaseError {
    constructor(...errorArgs: [string, number, any, any]) {
        super(...errorArgs)
    }
}