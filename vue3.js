// proxy 的拦截操作
const baseHandle = {
  get(target, key) {
    // 获取当前get的值
    const res = target[key];
    // 如果是对象类型进行递归调用 reactive
    // 依赖收集
    track(target, key);
    typeof res === "object" ? reactive(res) : res;
  },
  set(target, key, value) {
    const info = { oldVal: target[key], newVal: value };
  },
};
// 将对象变为响应🦁️
// 返回一个响应式对象 observed
function reactive(target) {
  // 验证target 是否是一个对象类型
  const observed = new Proxy(target, baseHandle);
  return observed;
}

// 计算属性
function computed() {}

// 副作用
function effect() {}

// 储存
const effectStack = [];
// 储存target [{target:dep}]
const targetMap = new WeakMap();
// 收集依赖 track
function track(target, key) {
  // 取最新一个effect
  const effect = effectStack[effectStack.length - 1];
  if (effect) {
    let depMap = targetMap.get(target);
    if (!depMap) {
      // 如果没有 depMap 就初始化一个depmap
      depMap = new Map();
      targetMap.set(target, depMap);
    }
    let dep = depMap.get(key);
    if(!dep){
        // 初始化一个dep
        dep = new Set();
        depMap.set(key,dep)
    }
  }
}

// trigger 数据变化触发通知更新
function trigger() {}
