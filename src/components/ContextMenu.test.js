import { mount } from '@vue/test-utils'
import ContextMenu from './ContextMenu.vue'

test('displays message', () => {
  const menu = mount(ContextMenu, {
    propsData: {
      collectionVisible: false
    }
  })

  expect(menu.text()).toContain('edit shape')
});
