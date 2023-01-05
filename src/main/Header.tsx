import * as React from "react"
import HealthAndSafetyIcon from '@mui/icons-material/ProductionQuantityLimits';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
    return <AppBar position="relative">
        <Toolbar>
            <HealthAndSafetyIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
                {"Products"}
            </Typography>
        </Toolbar>
    </AppBar>
}