import Vue from 'vue'
import Table from '@/views/Table/Table'
import App from '@/App'

describe('Table.vue', () => {
  it('Table should be defined', () => {
    const Constructor = Vue.extend(Table)
    const vm = new Constructor().$mount()
    expect(vm).toBeDefined()
  })
})

describe('App.vue', () => {
  it('App should be defined', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm).toBeDefined()
  })
})
