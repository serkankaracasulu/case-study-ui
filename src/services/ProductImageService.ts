import axios from "axios";

export interface ProductImage {
    id: string,
    image: string,
}

export default class ProductImageService {
    private static readonly baseController = "images";

    static get(id: string) {
        return axios.get<ProductImage>(`${ProductImageService.baseController}/${id}`).then(result => result.data)
    }
    static delete(id: string) {
        return axios.delete<string>(`${ProductImageService.baseController}/${id}`).then(result => result.data)
    }
    static add(productId: string, file: File) {
        const formElement = new FormData();
        formElement.append("image", file,file.name);
        formElement.append("productId", productId);
        return axios.post<ProductImage>(`${ProductImageService.baseController}`, formElement).then(result => result.data)
    }
}