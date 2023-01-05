import axios from "axios";

export interface Category {
    id: string,
    name: string,
}

export default class CategoryService {
    private static readonly baseController = "categories";
   
    static get(id: string) {
        return axios.get<Category>(`${CategoryService.baseController}/${id}`).then(result => result.data)
    }
    static delete(id: string) {
        return axios.delete<void>(`${CategoryService.baseController}/${id}`).then(result => result.data)
    }
    static add(productId: string, categoryName: string) {
        return axios.post<Category>(`${CategoryService.baseController}`, { name: categoryName,productId }).then(result => result.data)
    }
}