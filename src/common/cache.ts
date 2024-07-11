/**
 * 存储非组件使用的数据，放在缓存中，不用localStorage
 * 调用方式：
 * useRequest(getUserInfo, {
 *     onSuccess: (res) => {
 *       res?.success && setCache('userInfo', res.data);
 *     }
 *   })
 *   ---------------
 * const user = getCache('userInfo');
 * 应用周期通常只会set一次get多次的场景，都可以用cache方案
 * 刷新之后，cache数据会被清空，注意
 */

interface Cache {
  userInfo: any;
}

const cache: Cache = {
  userInfo: {
    userId: "",
    userName: "",
    userType: "",
    userAvatar: "",
    token: "",
  },
};

export function setCache<T extends keyof Cache>(key: T, value: Cache[T]) {
  cache[key] = value;
}

export function getCache<T extends keyof Cache>(key: T): Cache[T] {
  return cache[key];
}
