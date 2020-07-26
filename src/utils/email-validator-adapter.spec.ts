import { EmailValidatorAdpter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}))

describe('EmailValidator adapter', () => {
    test('Should return false if validator returns false', () => {
        const sut = new EmailValidatorAdpter()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isValid('invalid_email@mail.com')
        expect(isValid).toBe(false)
    })
    test('Should return true if validator returns true', () => {
        const sut = new EmailValidatorAdpter()
        const isValid = sut.isValid('valid_email@mail.com')
        expect(isValid).toBe(true)
    })
})