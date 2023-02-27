import * as consola from 'consola'

let created: consola.Consola | undefined
export const configLoggerFactory = (): consola.Consola => {
  if (created instanceof consola.Consola) {
    return created
  }

  created = consola.default.create({
    level: consola.LogLevel.Debug,
    reporters: [
      new consola.JSONReporter()
    ]
  })

  created
    .withTag('loggerFactory')
    .debug('Object: ConfigLogger is loaded.')

  return created
}
