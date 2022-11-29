import React from 'react'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ElementComponent from './ElementComponent';
import { eventlist } from '../common/lists';

const useStyles = makeStyles({
    eventContainer: {
        display: "flex",
        flexDirection: "column",
        border: "2px solid #282c34",
        width: "30%",
        height: "500px",
        padding: "10px 0px"
    },
    keyValueStyle: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0px 10px",
        margin: "10px 0px"
    },
    keyStyle: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
    }
});

function EventDiv(props) {
    const classes = useStyles();



    // console.log(props)
    return (
        <div className={classes.eventContainer}>

            <div className={classes.keyValueStyle}>
                <Typography className={classes.keyStyle}>Trigger</Typography>

                <FormControl style={{ width: "50%" }}>
                    <InputLabel id="demo-simple-select-label">Trigger</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.selectedTriggerEvent}
                        label={"Trigger"}
                        onChange={(e) => props.eventHandler(e, "selectedTriggerEvent")}
                        size="small"
                    >
                        <MenuItem value={null} disabled>Select Any</MenuItem>
                        {
                            eventlist.map(item => (
                                <MenuItem value={item.value}>{item.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>

            <ElementComponent {...props} classes={classes} />


        </div>
    )
}

export default EventDiv