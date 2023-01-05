import { styled } from '@mui/material';
import MaterialLink from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { usePromise } from '../hooks/usePromise';
import ProductService, { Product } from '../services/ProductService';

interface ProductListItemProps {
    product: Product
}

const CustomListItem = styled(ListItem)<{ component?: React.ElementType, }>({
    border: "solid 1px lightgrey",
    width: 200, overflow: "hidden", margin: 2, borderRadius: 4,
    display: "flex", flexDirection: "column",
});


export default function ProductListItem(props: ProductListItemProps) {
    const { product } = props;
    const { data } = usePromise(() => ProductService.images(product.id, 1, 1), null, [])

    return (
        <CustomListItem alignItems="flex-start">
            {data?.items[0] && <img src={`data:image/jpeg;base64,${data?.items[0].image}`} style={{ height: "100%", width: "100%", backgroundPosition: "center center", backgroundSize: "cover" }} alt={product.name} />}
            <ListItemText
                primary={product.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline', overflow: "hidden", whiteSpace: "nowrap" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            overflow={"clip"}
                        >
                            {product.description}
                        </Typography>
                    </React.Fragment>
                }
            />
            <MaterialLink component={Link} to={`/product/${product.id}`} variant="button" color="primary" sx={{ width: "100%" }}>{"Go to product"}</MaterialLink>
        </CustomListItem>
    );
}