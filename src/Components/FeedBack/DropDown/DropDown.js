import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        display: 'block'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function DropDown({menu,label,value,setValue}) {
    const classes = useStyles();
    //eslint-disable-next-line
    const newMenu = menu.filter((item,i)=>{
        if (i!==0){
            return item;
        }
    })

    const handleChange = (event) => {
        setValue(event.target.value);

        console.log(value)
    };
    return (
        <FormControl className={classes.formControl}>
            <p className={'dropdown-label'}>{label}</p>
            <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={value}
                onChange={handleChange}
                className={classes.selectEmpty}
            >
                <MenuItem value={menu[0]}>
                    <em>{menu[0]}</em>
                </MenuItem>
                {newMenu?.map((item,i)=>{
                    return (<MenuItem key={`${i}${item}${Math.random()}`} value={item}>
                        {item}
                    </MenuItem>)
                })}
            </Select>
        </FormControl>
    )
}

export default DropDown;
