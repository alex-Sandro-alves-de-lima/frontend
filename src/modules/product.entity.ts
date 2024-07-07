

import {api} from '../services/api'

interface Image {
    id?: string;
    end_link_imagem: string;
    cod_prod: number;
    productId?: string;
}

interface EanCode {
    id?: string;
    ean: string[];
    emba: number;
    status: boolean;
    cod_prod: number;
    productId?: string;
}

interface Price {
    id?: string;
    status: boolean;
    cod_prod: number;
    productId?: string;
}

interface Measure {
    id?: string;
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
    productId?: string;
}

export interface IProduct {
    id?: string;
    cod_prod: number;
    cod_prod_origem: number;
    desc_marca: string;
    desc_cor: string[];
    ind_prod_peso: string;
    desc_prod: string[];
    ind_prod_status: boolean;
    created_at?: string;
    updated_at?: string;
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


export class CProduct {
    public products: IProduct[];
    public lastId: number;
    constructor() {
        this.products = [];
        this.lastId = 0;
    }

    public generateId(): number {
        return ++this.lastId;
    }

    async fetchAllProducts(): Promise<void> {
        try {
            const response = await api.get(`/product/all`);
            this.products = response.data;
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    }

    async addProduct(product: IProduct): Promise<void> {
        try {
            
            const response = await api.post(`/product`, product);
            const newProduct = { ...response.data, cod_prod: this.generateId() };
            this.products.push(newProduct);
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    }

    async editProduct(cod_prod: number, newProduct: IProduct): Promise<void> {
        try {
            const response = await api.put(`/product/${cod_prod}`, newProduct);
            const index = this.products.findIndex(product => product.cod_prod === cod_prod);
            if (index !== -1) {
                this.products[index] = { ...response.data, cod_prod };
            }
        } catch (error) {
            console.error("Error editar product: ", error);
        }
    }

    async deleteProduct(cod_prod: number): Promise<void> {
        try {
            await api.delete(`/product/${cod_prod}`);
            this.products = this.products.filter(product => product.cod_prod !== cod_prod);
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    }

    getAllProducts(): IProduct[] {
        return this.products;
    }

    getProductById(cod_prod: number): IProduct | undefined {
        return this.products.find(product => product.cod_prod === cod_prod);
    }
}