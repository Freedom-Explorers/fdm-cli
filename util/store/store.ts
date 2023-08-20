import Configstore from 'configstore'

export interface Template {
  name: string
  description: string
}

export interface Config {
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

const config = new Configstore('fdm-cli', defaultConfig)

const defaultTemSymbolSet = new Set(
  defaultConfig.templateList.map((item) => Symbol.for(JSON.stringify(item)))
)

const templateList: Template[] = config.get('templateList')

templateList.forEach((item: Template) => {
  const symbol = Symbol.for(JSON.stringify(item))
  if (defaultTemSymbolSet.has(symbol)) {
    defaultTemSymbolSet.delete(symbol)
  }
})

if (defaultTemSymbolSet.size) {
  defaultTemSymbolSet.forEach((symbol) =>
    templateList.push(JSON.parse(Symbol.keyFor(symbol)) as Template)
  )

  config.set(
    'templateList',
    templateList.sort((a, b) => a.name.localeCompare(b.name))
  )
}

export default config
