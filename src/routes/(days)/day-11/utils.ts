import Enumerable from "linq"

interface FullnameElf {
    firstname: string
    lastname: string
}

interface AlphabetObject {
    [key: string]: number
}

export interface NameList {
    firstNames: string[]
    lastNames: string[]
}

export async function getElfNameByName(firstName: string, lastName: string, listName: NameList): Promise<FullnameElf> {
    let fname: string, lname: string

    try {
        const alphabet = Enumerable.range(1, 26).select(a => String.fromCharCode(a + 64)).toArray()
        const alphabetObject: AlphabetObject = {};

        alphabet.push(' ')
        alphabet.forEach((letter, index) => {
            alphabetObject[letter] = index + 1;
        })

        const listCharFname = firstName.split('')
        const listCharLname = lastName.split('')
        let valueCharFname = 0
        let valueCharLname = 0

        listCharFname.forEach(a => {
            valueCharFname += alphabetObject[a.toUpperCase()]
        })

        listCharLname.forEach(a => {
            valueCharLname += alphabetObject[a.toUpperCase()]
        })

        fname = listName.firstNames[Math.floor((valueCharFname / 1000) * listName.firstNames.length)]
        lname = listName.lastNames[Math.floor((valueCharLname / 1000) * listName.lastNames.length)]
    } catch {
        fname = ''
        lname = ''    
    }

    return {
        firstname: fname,
        lastname: lname
    }
}