# emitter
Just the built-in emitter from Vue core

## Get Started

```bash
npm i @savo/emitter
```

## Usage
```js
import Emitter from '@savo/emitter'

const emitter = new Emitter()

emitter.$on('event', msg => {
  console.log('event fire', msg)
})

emitter.$emit('event', 'test msg')
```

## Links
- [Vue events](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95-%E4%BA%8B%E4%BB%B6)