import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { serverError, badRequest, ok } from '../helpers/http-helpers'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError, MissingParamError } from '../errors'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor (emailValidator: EmailValidator) {
      this.emailValidator = emailValidator
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const { email, password, passwordConfirmation } = httpRequest.body
            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('password confirmation invalid'))
            }

            return ok('Test')
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}