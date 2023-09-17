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