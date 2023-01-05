import * as React from "react";
import { usePromise } from "../hooks/usePromise";
import ProductService from "../services/ProductService";
import LinearProgress from "@mui/material/LinearProgress"
import Container from "@mui/material/Container"
import BottomPagination from "../pagination/BottomPagination";
import List from "@mui/material/List/List";
import ListSubheader from "@mui/material/ListSubheader/ListSubheader";
import ProductListItem from "./ProductItem";
import usePaging from "../hooks/usePaging";
import ProductAddButton from "./Add";

const ProductList = () => {
    const { pageNumber, pageSize } = usePaging({ pageNumber: 1, pageSize: 30 });
    const [added, setAdded] = React.useState(0);
    const { data, loading } = usePromise(() => ProductService.list(pageNumber, pageSize), {
        items: [],
        pageNumber: 0,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false
    }, [pageNumber, added])

    return <Container maxWidth="lg" sx={{ p: 2 }}>
        <ProductAddButton onComplete={() => setAdded(added + 1)} />
            {loading && <LinearProgress />}
            <List sx={{ display: "flex", flexWrap: "wrap" }} subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ width: "100%" }}>
                    Products
                </ListSubheader>
            }>

                {data.items.map(product => <ProductListItem product={product} key={product.id} />)}
            </List>
            <BottomPagination paging={data} />
    </Container>
}
export default ProductList;