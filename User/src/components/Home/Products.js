import { useEffect, useState } from "react"
import { Card, CardTitle, CardText, Button } from "reactstrap"
import { Grid, Tooltip } from "@mui/material"
import productAPI from "api/productsAPI"
import { cart } from "../../store"
import Order from './Order'
import Detail from './Detail'
export default function Products(props) {

    function onClick(id) {
        // cart.data = [1]
        cart.count += 1
        Object.freeze(cart.count)
    }

    const show = () => {
        if (props.data.length === 0) {
            return (
                <Grid item>Không có sản phẩm nào</Grid>
            )
        }
        else {
            return (
                props.data.map((value) => {
                    return (
                        // <Tooltip title={<Order id={value.id} image={value.image}
                        //     name={value.name} price={value.price}
                        // />} placement="top" style={{ zIndex: 10 }}>
                            <Grid item>

                                <Card
                                    body
                                    className="my-2"
                                    style={{
                                        width: '12rem'
                                    }}
                                >

                                    <CardTitle>
                                        <Detail data={value}>
                                            
                                        </Detail>
                                    </CardTitle>
                                    {/* </Tooltip> */}
                                    <CardText style={{ textAlign: 'center' }}>
                                        <Grid container>
                                            <Grid item>
                                                {value.name}
                                            </Grid>
                                            <Grid item sx={{ color: 'red' }}>
                                                {value.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            </Grid>
                                        </Grid>
                                    </CardText>
                                </Card>

                            </Grid>
                        // </Tooltip>
                    )
                })
            )
        }
    }
    return (
        <Grid container p={2} spacing={2}>
            {show()}
        </Grid>
    )
}