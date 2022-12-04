import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, styled } from '@mui/material'


const Title = styled(Typography)(
    () => `
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        `
)
export default function MediaCard(props) {
    return (
        <Card sx={{ width: 275 }}>
            <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
            // alt="green iguana"
            />
            <CardContent>
                <Title gutterBottom component="div">
                    {props.data.name}
                </Title>
                {/* <Typography variant="body2" color="text.secondary">

                </Typography> */}
            </CardContent>
            <CardActions>
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center" >
                    <Grid item color="red">{new Intl.NumberFormat().format(props.data.price)} đ</Grid>
                    <Grid item fontSize={10}>{props.data.cart}</Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
