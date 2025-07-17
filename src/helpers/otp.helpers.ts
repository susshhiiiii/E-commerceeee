import { User } from "src/schema/user.schema"

async function OtpGenerator(){
  const Otp=Math.floor(Math.random()*1000000).toString()
  const length=Otp.length
  
  const OtpString=Otp+'0'.repeat(6-length)
  return OtpString
}

function VerifyOtp(otp: string, user: User) {
    
    if (otp != user.otp)
        return false

    if(((new Date().getTime()-new Date(user.otpEnteredTime).getTime())/1000)>120)
        return false        
    return true
}
export{OtpGenerator,VerifyOtp}