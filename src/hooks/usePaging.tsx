
import { useSearchParams } from "react-router-dom";

export default function usePaging(initial: undefined | { pageNumber: number, pageSize: number }) {
    let [searchParams] = useSearchParams({ pageNumber: initial?.pageNumber.toString() || "1", pageSize: initial?.pageSize.toString() || "30" });
    let pageNumber = +searchParams.get("pageNumber")!;
    let pageSize = +searchParams.get("pageSize")!;
    return { pageNumber, pageSize }
}