import { mocker } from '../../testHelper'
import { cmdInvoker } from '@/definitions/plugins/libs/cmdInvoker'

const invoker = mocker.wrap<Parameters<typeof cmdInvoker>[1]>(
  (command: string) => {
    // expect(command).toBe(...)
  }
)

it('sample', () => {
  const mockedInvoker = jest.fn(invoker)
  cmdInvoker('sample', mockedInvoker)
  expect(mockedInvoker).not.toHaveBeenCalled()
})
