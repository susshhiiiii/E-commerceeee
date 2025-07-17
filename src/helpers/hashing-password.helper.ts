import * as bcrypt from 'bcrypt'


const saltRounds=10
async function PasswordHash(password: string) {
    return await bcrypt.hash(password,saltRounds)
}

async function ComparePassword(typedPassword: string, originalPassword: string) {    
    return bcrypt.compare(typedPassword,originalPassword)
}

export {ComparePassword,PasswordHash}