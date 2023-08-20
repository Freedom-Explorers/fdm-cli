import Configstore from 'configstore'
import { name } from '@/package.json'

interface Template {
  name: string
  description: string
}

interface Config {
  packageManager: string
  templateList: Template[]
}

const defaultConfig: Config = {
  packageManager: '',
  templateList: [
    {
      name: 'vue2app',
      description: 'vue2 app template'
    },
    {
      name: 'vue3app',
      description: 'vue3 app template'
    },
    {
      name: 'springboot',
      description: 'a java template'
    }
  ]
}

const config = new Configstore(name, defaultConfig)

export const set = (key: string, value: any) => config.set(key, value)

export const get = (key: string) => config.get(key)

export const del = (key: string) => config.delete(key)

export const use = (key: string, value: any) => {
  set(key, value)
  return [() => get(key), (value: any) => set(key, value)]
}

export const reset = () => (
  config.clear(), Object.keys(defaultConfig).forEach((key) => set(key, defaultConfig[key as keyof Config]))
)

export const getPath = () => config.path

export default config
