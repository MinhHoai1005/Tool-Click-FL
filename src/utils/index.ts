export * from './history'


export const removeItemLocalStorage = (key) => {
    localStorage.removeItem(key)
}
export function sleep(time): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time))
}
export const setItemLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}

export const formatIntToString = (numStr: string) => {
    if (numStr.length === 0) {
        return 0
    }
    numStr = numStr.replaceAll(',', "")
    return parseInt(numStr, 10)
}