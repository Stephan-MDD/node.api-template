import BaseError from './BaseError'

export default class SQLError extends BaseError {
    constructor(...errorArgs: [string, number, any, any]) {
        super(...errorArgs)
    }
}