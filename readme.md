# EB

EB is Event bus based on TS

## 如何使用
```js
import {EventBus} from "@wsy998/eb"
```
or
```js
const {EventBus}=require("@wsy998/eb")
```
## 方法
```js
on(EventName,callback)// 监听EventName事件  
emit(EventName)//触发EventName事件  
off(EventName,callback)// 取消监听EventName事件的callback函数，当callback为空时，取消监听EventName事件的所有回调函数，当EventName为空时，取消监听所有事件的所有回调函数  
once(EventName)//监听EventName事件一次  
create()// 创建一个新的EventBus实例  
```

## Typescript

```typescript 
// 实现该接口就可实现监听器提示
interface ListenMap {
    [I: string]: Set<(...arg: any[]) => void>
}
```
```typescript
// 将参数转换为Set
export type TransformSet<T extends any[]> = Set<(...args: T) => void>
```



