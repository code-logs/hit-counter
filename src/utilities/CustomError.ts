class CustomError extends Error {
  code: number

  constructor(message: string, code: 400 | 500 = 500) {
    super(message)
    this.code = code
  }
}

export default CustomError
