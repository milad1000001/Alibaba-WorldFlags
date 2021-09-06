import { shallowMount } from '@vue/test-utils'
import Dropdown from './Dropdown'

describe('Dropdown', () => {
  it(`GIVEN: if user select a value from dropdown, 
      THEN: value is emitted and value is equal with the set data value
      `, async () => {
    const wrapper = shallowMount(Dropdown)
    await wrapper.setData({
      selectModel: 'test-data'
    })

    const emittedSelectValue = wrapper.emitted('send-out')
    expect(emittedSelectValue).toHaveLength(1)

    const expectedValue = emittedSelectValue[0][0]
    expect(expectedValue).toEqual('test-data')
  })
})
