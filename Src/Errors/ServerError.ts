import BaseError from './BaseError'

export default class ServerError extends BaseError {
    constructor(...errorArgs: [string, number, any, any]) {
        super(...errorArgs)
    }
}