import React, { useEffect } from "react";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/shipper";
import { useToasts } from "react-toast-notifications";
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    companyName: '',
    phone: ''
}

const ShipperForm = ({ classes, ...props }) => {

    const { addToast } = useToasts()


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('companyName' in fieldValues)
            temp.companyName = fieldValues.companyName ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = (/^([(]{1}[0-9]{3}[)]{1}[ ]{1}[0-9]{3}[-]{1}[0-9]{4})$/).test(fieldValues.phone) ? "" : "Phone is not valid."

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createShipper(values, onSuccess)
            else
                props.updateShipper(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.ShipperList.find(x => x.shipperId === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="companyName"
                        variant="outlined"
                        label="Company Name"
                        value={values.companyName}
                        onChange={handleInputChange}
                        {...(errors.companyName && { error: true, helperText: errors.companyName })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="phone"
                        variant="outlined"
                        label="Phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        {...(errors.phone && { error: true, helperText: errors.phone })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMargin}
                        startIcon={<SaveIcon />}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.smMargin}
                        startIcon={<RotateLeftIcon />}
                        onClick={resetForm}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    ShipperList: state.shipper.list
})

const mapActionToProps = {
    createShipper: actions.create,
    updateShipper: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ShipperForm));