export const moduleLoader = <T>(
  moduleNameList: string[] = [],
  modulePathList: string[]
): T[] => {
  const moduleList: T[] = []

  moduleNameList.map((moduleName: string) => {
    let module: T | null = null

    for (const key in modulePathList) {
      if (!modulePathList.hasOwnProperty(key)) {
        continue
      }
      try {
        module = require(`${modulePathList[key]}/${moduleName}`).default
        break
      } catch (err) {}
    }

    if (module) {
      moduleList.push(module)
      console.log(`${moduleName} を読み込みました`)
    } else {
      console.log(`${moduleName} は読み込めませんでした`)
    }
  })

  return moduleList
}
