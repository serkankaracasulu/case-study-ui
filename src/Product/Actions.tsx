import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useAppDispatch } from '../app/hooks';
import { deleteProductAsync, updateProductAsync } from '../redux/productSlice';


export default function ProductActions() {

    const dispatch = useAppDispatch();
    const handleUpdate = () => {
        dispatch(updateProductAsync());
    }
    const handleDelete = () => {
        dispatch(deleteProductAsync());
    }
    const actions = [
        { icon: <SaveIcon />, name: 'Save', action: handleUpdate },
        { icon: <DeleteIcon />, name: 'Delete', action: handleDelete },
    ];
    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}