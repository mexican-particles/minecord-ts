import { error, info } from '@/core/logger'

export const moduleLoader = <T>(
  moduleNameList: string[] = [],
  modulePathList: string[]
): T[] => {
  const moduleList: T[] = []

  moduleNameList.forEach((moduleName: string) => {
    let module: T | null = null

    for (const key in modulePathList) {
      if (!Object.prototype.hasOwnProperty.call(modulePathList, key)) {
        continue
      }
      try {
        module = require(`${modulePathList[key]}/${moduleName}`).default
        break
      } catch (err) {
        error(
          'Module could not be loaded.', {
            moduleName
          },
          err)
      }
    }

    if (module) {
      moduleList.push(module)
      info(`${moduleName} is loaded.`)
    } else {
      error('Module could not be loaded.', {
        moduleName
      })
    }
  })

  return moduleList
}
