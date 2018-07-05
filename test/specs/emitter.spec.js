import Emitter from '@/index'

describe('emitter', () => {
  let vm, spy
  beforeEach(() => {
    vm = new Emitter()
    spy = jest.fn()
  })

  it('$on', () => {
    vm.$on('test', function () {
      expect(this).toBe(vm)
      spy.apply(this, arguments)
    })

    vm.$emit('test', 1, 2, 3, 4)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(1, 2, 3, 4)
  })

  it('$on multi event', () => {
    vm.$on(['test1', 'test2'], function () {
      expect(this).toBe(vm)
      spy.apply(this, arguments)
    })
    vm.$emit('test1', 1, 2, 3, 4)
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(1, 2, 3, 4)
    vm.$emit('test2', 5, 6, 7, 8)
    expect(spy).toBeCalledTimes(2)
    expect(spy).toBeCalledWith(5, 6, 7, 8)
  })

  it('$off multi event', () => {
    vm.$on(['test1', 'test2', 'test3'], spy)
    vm.$off(['test1', 'test2'], spy)
    vm.$emit('test1')
    vm.$emit('test2')
    expect(spy).not.toBeCalled()
    vm.$emit('test3', 1, 2, 3, 4)
    expect(spy).toBeCalledTimes(1)
  })

  it('$off multi event without callback', () => {
    vm.$on(['test1', 'test2'], spy)
    vm.$off(['test1', 'test2'])
    vm.$emit('test1')
    expect(spy).not.toBeCalled()
  })

  it('$once', () => {
    vm.$once('test', spy)
    vm.$emit('test', 1, 2, 3)
    vm.$emit('test', 2, 3, 4)
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(1, 2, 3)
  })

  it('$off', () => {
    vm.$on('test1', spy)
    vm.$on('test2', spy)
    vm.$off()
    vm.$emit('test1')
    vm.$emit('test2')
    expect(spy).not.toBeCalled()
  })

  it('$off event', () => {
    vm.$on('test1', spy)
    vm.$on('test2', spy)
    vm.$off('test1')
    vm.$off('test1') // test off something that's already off
    vm.$emit('test1', 1)
    vm.$emit('test2', 2)
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(2)
  })

  it('$off event + fn', () => {
    let spy2 = jest.fn()
    vm.$on('test', spy)
    vm.$on('test', spy2)
    vm.$off('test', spy)
    vm.$emit('test', 1, 2, 3)
    expect(spy).not.toBeCalled()
    expect(spy2).toBeCalledTimes(1)
    expect(spy2).toBeCalledWith(1, 2, 3)
  })
})
