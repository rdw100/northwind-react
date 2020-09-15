import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/shipper";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import ShipperForm from "./ShipperForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const ShipperList = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    const { fetchAllShippers } = props;

    useEffect(() => {
        fetchAllShippers();
    }, [fetchAllShippers]);
    
    const { addToast } = useToasts()

    const onDelete = shipperId => {
        if (window.confirm('Delete this record?'))
            props.deleteShipper(shipperId,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <ShipperForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone</TableCell>
                                   <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.ShipperList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.companyName}</TableCell>
                                            <TableCell>{record.phone}</TableCell>
                                           <TableCell>
                                                <ButtonGroup variant="contained" >
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.shipperId) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.shipperId)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    ShipperList: state.shipper.list
})

const mapActionToProps = {
    fetchAllShippers: actions.fetchAll,
    deleteShipper: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ShipperList));