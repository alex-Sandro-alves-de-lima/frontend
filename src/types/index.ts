export interface IItem {
    id: number,
    code: string,
    description: string,
    ean: string,
    price: string,
    urlImage: string,
    stateItem: boolean
}


export interface GooglePayloadLogin {
    iss: string; // "https://accounts.google.com"
    azp: string; // "117403387590-p32jt9n5fuip6t9tvegk5f58jus9ck6d.apps.googleusercontent.com"
    aud: string; // "117403387590-p32jt9n5fuip6t9tvegk5f58jus9ck6d.apps.googleusercontent.com"
    sub: string; // "102085299726941926698"
    email: string; // "lexjustin5@gmail.com"
    email_verified: boolean; // true
    nbf: number; // 1719837826
    name: string; // "Alex Sandro"
    picture: string; // "https://lh3.googleusercontent.com/a/ACg8ocKfYW81V2VbJPxTAvqMLn2xv-Jtf-7kUS90xCDEVORRMZcihWRz=s96-c"
    given_name: string; // "Alex"
    family_name: string; // "Sandro"
    iat: number; // 1719838126
    exp: number; // 1719841726
    jti: string; // "f595888c2146adc352b2a5876224cc44c4bc5aa0"
  }
  