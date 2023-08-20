import config from '@util/store/store'
export { Config, Template } from '@util/store/store'

export const set = (key: string, value: any) => config.set(key, value)

export const get = (key: string) => config.get(key)

export const del = (key: string) => config.delete(key)

export const use = (key: string, value: any) => {
  set(key, value)
  return [() => get(key), (value: any) => set(key, value)]
}

// TODO: reset
// export const reset = () => (
//   // config.clear(),
//   // Object.keys(defaultConfig).forEach((key) =>
//   //   set(key, defaultConfig[key as keyof config])
//   // )
// )

export const getPath = () => config.path
