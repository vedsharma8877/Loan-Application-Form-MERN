import {
    Button,
    Box,
  } from "@mui/material";
  import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import App from "../App";
import Form from "../components/form"
import JsonDataDisplay from "./table";
const Navigate = () => {
    return(
        <div>
            <Box container justifyContent="center" mx={3} my={2}>
            <Button component={Link} to={'form'} variant="contained" size="large" fullWidth>Loan Application Form</Button>
            </Box>
            <Box container justifyContent="center" mx={3} my={2}>
                <Button component={Link} to={'user'} variant="contained" size="large" fullWidth>User Details</Button>
            </Box>
            <Outlet />
            </div>
    )
}

export default Navigate;