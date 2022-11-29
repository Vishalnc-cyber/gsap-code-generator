import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { tweensList, animationPropertiesList } from '../common/lists';

export class ElementComponent extends Component {
    render() {
        const { classes } = this.props
        // console.log(this.props)
        return (
            <div>
                <div className={classes.keyValueStyle}>
                    <Typography className={classes.keyStyle}>Target Element</Typography>

                    <TextField
                        style={{ width: "50%" }}
                        size="small"
                        id="outlined-basic"
                        label="Class/ID/Attribute"
                        variant="outlined"
                        value={this.props.targetElementValue}
                        onChange={(e) => this.props.eventHandler(e, "targetElementValue")}
                    />
                </div>
                <div className={classes.keyValueStyle}>
                    <Typography className={classes.keyStyle}>Tween</Typography>

                    <FormControl style={{ width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">Tween</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.props.selectedTween}
                            label="Tween"
                            onChange={(e) => this.props.eventHandler(e, "selectedTween")}
                            size="small"
                        >
                            <MenuItem value={null} disabled>Select Any</MenuItem>
                            {
                                tweensList.map(item => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.keyValueStyle}>
                    {/* <Typography className={classes.keyStyle}>Animation</Typography> */}

                    <FormControl style={{ width: "48%" }}>
                        <InputLabel id="demo-simple-select-label">Property</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.props.selectedAnimationProperty}
                            label="Prperty"
                            onChange={(e) => this.props.eventHandler(e, "selectedAnimationProperty")}
                            size="small"
                        >
                            <MenuItem value={null} disabled>Select Any</MenuItem>
                            {
                                animationPropertiesList.map(item => (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                ))
                            }
                        </Select>

                    </FormControl>
                    <TextField
                        style={{ width: "48%" }}
                        size="small"
                        id="outlined-basic"
                        label="Value"
                        variant="outlined"
                        value={this.props.animationValue}
                        onChange={(e) => this.props.eventHandler(e, "animationValue")}
                    />
                </div>
            </div>
        )
    }
}

export default ElementComponent