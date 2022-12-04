import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Button,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
// core components
import React, { useEffect, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import categoryAPI from "api/categoryAPI";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Add } from "./Category/AddCategory02";
import Edit_02 from "./Category/EditCategory02"
import Del from "./Category/DelCategory02"

import Header from "components/Headers/Header.js";

const Tables = () => {
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const [data, setData] = useState([])

    useEffect(() => {
        categoryAPI.get().then((res) => {
            setData(res.data.data)
        })
    }, [])

    function addCategory02Success(index, value, id) {
        let temp = [...data]
        temp[index].category_02.push({
            id: id,
            name: value
        })
        setData(temp)
    }
    function EditCategorySuccess(item, index) {
        let temp = [...data]
        temp[index] = item
        setData(temp)
    }
    function EditCategory02Success(value, index, index02) {
        let temp = [...data]
        temp[index].category_02[index02] = value
        setData(temp)
    }

    function DelCategory02Success(index, index02) {
        let temp = [...data]
        temp[index].category_02.splice(index02, 1)
        setData(temp)
    }

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0" >
                                <h3 className="mb-0">Danh Mục</h3>
                            </CardHeader>
                            <Box p={2}>
                                {data.map((value, index) => {
                                    return (
                                        <Accordion key={index}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>
                                                    <Add name={value.name} id={value.id} item={value}
                                                        index={index} add={addCategory02Success} edit={EditCategorySuccess} />


                                                    {/* <div style={{}}>
                                                        {value.name}
                                                        <i className="ni ni-fat-add" />
                                                        Thêm
                                                       
                                                    </div> */}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <List>
                                                        {value.category_02.map((value, _index) => {
                                                            return (
                                                                <ListItem disablePadding>
                                                                    <ListItemButton>
                                                                        <ListItemText primary={value.name} />
                                                                        <Edit_02 item={value}
                                                                            index={index} index_02={_index}
                                                                            edit={EditCategory02Success} />

                                                                        <Del item={value}
                                                                            index={index} index_02={_index}
                                                                            del={DelCategory02Success} />
                                                                    </ListItemButton>
                                                                </ListItem>
                                                            )
                                                        })}
                                                    </List>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}

                                {/* <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography>Accordion 2</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                    >
                                        <Typography>Disabled Accordion</Typography>
                                    </AccordionSummary>
                                </Accordion> */}
                            </Box>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Tables;
