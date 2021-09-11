import { mount } from '@vue/test-utils'
import ContextMenu from './ContextMenu.vue'
import { config } from '@vue/test-utils'

// provide a mock shapeList prop
config.provide['shapeList'] = {
  val: {}
}

test('displays message', () => {
  const menu = mount(ContextMenu, {
    propsData: {
      collectionVisible: false
    }
  })

  expect(menu.text()).toContain('edit shape')
});
