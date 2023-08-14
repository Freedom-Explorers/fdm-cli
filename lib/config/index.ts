import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(dirname(__filenameNew))

export const CWD = process.cwd()
export const VUE_TEMPLATE = resolve(__dirnameNew, 'template')
