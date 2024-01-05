// place files you want to import through the `$lib` alias in this folder.
export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function toDecimalString(num: number) {
    // console.log(new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(num), Number(new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(num)))
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(num)
}

export function toDecimal(num: number) {
    // console.log(new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(num), Number(new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(num)))
    return Number(new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(num))
}