import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { tweensList, animationPropertiesList } from '../common/lists';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export class ElementComponent extends Component {
    render() {
        const { classes, index } = this.props
        // console.log(this.props.selectedTween)
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", padding: "0px 10px" }}>
                    <div>

                    </div>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => this.props?.handleDeleteTargetElement(e, index)}
                    >X</Button>
                </div>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Target Element Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        // value={this.props.targetElementTypeValue}
                        onChange={(e) => this.props.handleTargetElementEvents(e, index, "targetElementTypeValue")}
                    >
                        <FormControlLabel value="class" control={<Radio />} label="Class" />
                        <FormControlLabel value="ID" control={<Radio />} label="ID" />
                        <FormControlLabel value="attribute" control={<Radio />} label="Attribute" />
                        {/* <FormControlLabel
                            value="disabled"
                            disabled
                            control={<Radio />}
                            label="other"
                        /> */}
                    </RadioGroup>
                </FormControl>
                <div className={classes.keyValueStyle}>
                    <Typography className={classes.keyStyle}>Tween</Typography>

                    <FormControl style={{ width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">Tween</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.props.selectedTween}
                            label="Tween"
                            onChange={(e) => this.props.handleTargetElementEvents(e, index, "selectedTween")}
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
                    <Typography className={classes.keyStyle}>Target Element</Typography>

                    <TextField
                        style={{ width: "50%" }}
                        size="small"
                        id="outlined-basic"
                        label="Class/ID/Attribute"
                        variant="outlined"
                        value={this.props.targetElementValue}
                        onChange={(e) => this.props.handleTargetElementEvents(e, index, "targetElementValue")}
                    />
                </div>

                {this.props.animations.map((animation, j) =>
                    <div className={classes.keyValueStyle}>
                        {/* <Typography className={classes.keyStyle}>Animation</Typography> */}

                        <FormControl style={{ width: "35%" }}>
                            <InputLabel id="demo-simple-select-label">Property</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={animation.selectedAnimationProperty}
                                label="Prperty"
                                onChange={(e) => this.props.handleAnimationObjectValueChange(e, index, "selectedAnimationProperty", j)}
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
                            style={{ width: "35%" }}
                            size="small"
                            id="outlined-basic"
                            label="Value"
                            variant="outlined"
                            value={animation.animationValue}
                            onChange={(e) => this.props.handleAnimationObjectValueChange(e, index, "animationValue", j)}
                        />
                        {/* </div> */}
                        <Button
                            style={{ width: "15%" }}
                            variant="outlined"
                            size="small"
                            onClick={(e) => this.props?.handleDeleteAnimationObject(e, index, j)}
                        >X</Button>
                        {/* </div> */}
                    </div>
                )}
                <div>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => this.props?.handleAddMoreAnimationObject(e, index)}
                    >+ADD</Button>
                </div>

                <Divider variant="li" />
            </div>
        )
    }
}

export default ElementComponent