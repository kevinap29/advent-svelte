export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function toDecimalString(num: number) {
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
}

export function toDecimal(num: number) {
    return Number(new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num))
}