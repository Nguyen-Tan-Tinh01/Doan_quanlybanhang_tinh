import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
import Slider from '../shop/slider'
import Grid from '@mui/material/Grid';
import Cate from './categoryChildren'
import Product from './Product'
const Category = styled(Box)(
    () => `
    border: 2px solid #6767672e;
    margin-top: 30px;
    border-radius: 10px;
    padding: 10px 0px 10px 0px;
    `
)

const GridCategory = styled(Box)(
    () => `
    padding: 10px;
    border: 1px solid #00000017;
    height: 150px;
    width: 125px;
    `
)


export default function Home() {

    const [category, setCategory] = useState([
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        },
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        }, {
            "name": "Thoi Trang Nam",
            "image": "url"
        },
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        },
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        },
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        },
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        },
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        },
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        },
        {
            "name": "Thoi Trang Nam",
            "image": "url"
        }]

    )
     const [products, setProducts] = useState([
        {
            "image": "",
            "name": "Áo thun",
            "price": 2553545,
            "cart": 245
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 25534636545,
            "cart": 6
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 77777,
            "cart": 77
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 654,
            "cart": 77
        },        {
            "image": "",
            "name": "Áo thun",
            "price": 2553545,
            "cart": 245
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 25534636545,
            "cart": 6
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 77777,
            "cart": 77
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 654,
            "cart": 77
        },        {
            "image": "",
            "name": "Áo thun",
            "price": 2553545,
            "cart": 245
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 25534636545,
            "cart": 6
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 77777,
            "cart": 77
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 654,
            "cart": 77
        },        {
            "image": "",
            "name": "Áo thun",
            "price": 2553545,
            "cart": 245
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 25534636545,
            "cart": 6
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 77777,
            "cart": 77
        },
        {
            "image": "",
            "name": "Áo thun",
            "price": 654,
            "cart": 77
        },
     ])
    const showCategory = () => {
        return (
            <div style={{ display: '-webkit-inline-box', overflowX: 'auto', width: '-webkit-fill-available' }}>
                {
                    category.map((item) => {
                        return (
                            <div>
                                <img src="https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=125"></img>
                                <GridCategory>{item.name}</GridCategory>
                            </div>
                        )
                    })
                }
            </div>
        )


    }
    return (
        <Box px={10}>
            <Slider />
            <Category >
                <label style={{ padding: '10px' }}>Danh Muc</label>
                {showCategory()}
            </Category>
            <Box pt={6}>
                <Grid container>
                    <Grid item md={3} xs={12}>
                        <Cate data={category} />
                    </Grid>
                    <Grid item md={9} xs={12} container spacing={2} pl={2}>
                        {products.map((value, index) => {
                            return (
                                <Grid item>
                                    <Product key={index} data={value}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Box>
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            a
        </Box>

    )
}


