import { MongoHelper } from '../helpers/mongo-helper'
import { AcccountMongoRepository } from './account'

describe(('Mongo Repository'), () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.desconnect
    })
    test(('Should return and account on success'), async () => {
       const sut = new AcccountMongoRepository()
       const accout = await sut.add({
           name: 'any_name',
           email: 'any_mail@mail.com',
           password: 'any_password'
       })
       expect(accout).toBeTruthy()
       expect(accout.id).toBeTruthy()
       expect(accout.name).toBe('any_name')
       expect(accout.email).toBe('any_mail@mail.com')
       expect(accout.password).toBe('any_password')
    })
})