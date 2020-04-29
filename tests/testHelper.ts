import * as nodeCrypto from 'crypto'

export const mocker = {
  /**
   * 渡された引数をジェネリクスで指定された型へ強制的にキャストする
   * 引数が省略された場合はランダムな10文字の文字列が実態となる
   * @param arg
   * @param isUndefined
   */
  wrap: <T>(arg?: any, isUndefined?: boolean): T => {
    if (typeof arg !== 'undefined') {
      return (arg as unknown) as T
    }
    if (isUndefined) {
      return (undefined as unknown) as T
    }
    return (generateRandomString() as unknown) as T
  },
  get randStr(): string {
    return generateRandomString()
  },
  get randNum(): number {
    return generateRandomNumber()
  },
}

/**
 * ランダムな文字列を生成する
 * @param digits
 */
const generateRandomString = (digits: number = 10): string => {
  return nodeCrypto.randomBytes(digits).toString('base64').substring(0, digits)
}

/**
 * ランダムな数値を生成する
 * Math.random() が生成する乱数はセキュアでないためテスト以外で参照しないこと
 * @param digits
 */
const generateRandomNumber = (digits: number = 10): number => {
  const max: number = 10 ** (digits + 1) - 1
  const min: number = 10 ** digits
  return Math.floor(Math.random() * (max - min + 1) + min)
}
