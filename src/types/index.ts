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
  
  interface Image {
    id: string;
    end_link_imagem: string;
    cod_prod: number;
    productId: string;
}

interface EanCode {
    id: string;
    ean: string[];
    emba: number;
    status: boolean;
    cod_prod: number;
    productId: string;
}

interface Price {
    id: string;
    status: boolean;
    cod_prod: number;
    productId: string;
}

interface Measure {
    id: string;
    ean_prod: string[];
    unm_desc: string;
    prod_altura: number;
    prod_larg: number;
    prod_comprimento: number;
    prod_peso_bruto: number;
    prod_peso_liquido: number;
    prod_peso_unm: number;
    prod_mtc: number;
    cod_prod: number;
    productId: string;
}

export interface Product {
    id: string;
    cod_prod: number;
    cod_prod_origem: number;
    desc_marca: string;
    desc_cor: string[];
    ind_prod_peso: string;
    desc_prod: string[];
    ind_prod_status: boolean;
    created_at: string;
    updated_at: string;
    departmentId: string;
    categoryId: string;
    subcategoryId: string;
    sectionId: string;
    groupId: string;
    subgroupId: string;
    images: Image[];
    ean_codes: EanCode[];
    prices: Price[];
    measures: Measure[];
}