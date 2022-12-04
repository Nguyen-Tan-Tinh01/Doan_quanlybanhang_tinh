import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

export default function SimpleSnackbar(props) {


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.close()
    }

    return (
        <div>

            <Snackbar
                open={props.data.open}
                autoHideDuration={6000}
                onClose={handleClose}

            >
                <Alert icon={false} severity={props.data.type}>
                    {props.data.text}
                </Alert>
            </Snackbar>
        </div>
    );
}
