import { EmailValidatorAdpter } from './email-validator'

describe('EmailValidator adapter', () => {
    test('Should return false if validator returns false', () => {
        const sut = new EmailValidatorAdpter()
        const isValid = sut.isValid('invalid_email@mail.com')
        expect(isValid).toBe(false)
    })
})