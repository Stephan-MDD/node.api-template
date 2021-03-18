import BaseError from './BaseError'

export default class DefaultError extends BaseError {
    constructor(...errorArgs: [string, number, any, any]) {
        super(...errorArgs)
    }
}