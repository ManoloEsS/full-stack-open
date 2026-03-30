export const logInfo = (...params: unknown[]) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

export const logError = (...params: unknown[]) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params)
    }
}
