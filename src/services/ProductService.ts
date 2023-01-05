import axios from "axios";
import { PaginatedList } from "../types";
import { Category } from "./CategoryService";
import { ProductImage } from "./ProductImageService";

export interface Product {
    id: string,
    name: string,
    description: string,
}

export default class ProductService {
    private static readonly baseController = "products";
    static list(pageNumber: number, pageSize: number = 10) {
        return axios.get<PaginatedList<Product>>(ProductService.baseController, { params: { pageNumber, pageSize } }).then(result => result.data)
    }
    static categories(productId: string, pageNumber: number, pageSize: number = 10) {
        return axios.get<PaginatedList<Category>>(`${ProductService.baseController}/${productId}/categories`, { params: { pageNumber, pageSize } }).then(result => result.data)
    }
    static images(productId: string, pageNumber: number, pageSize: number = 10) {
        return axios.get<PaginatedList<ProductImage>>(`${ProductService.baseController}/${productId}/images`, { params: { pageNumber, pageSize } }).then(result => result.data)
    }
    static get(id: string) {
        return axios.get<Product>(`${ProductService.baseController}/${id}`).then(result => result.data)
    }
    static update(id: string, product: Omit<Product, "id">) {
        return axios.put<Product>(`${ProductService.baseController}/${id}`, product).then(result => result.data)
    }
    static delete(id: string) {
        return axios.delete<Product>(`${ProductService.baseController}/${id}`).then(result => result.data)
    }
    static add(product: Omit<Product, "id">) {
        return axios.post<Product>(`${ProductService.baseController}`, product).then(result => result.data)
    }
}