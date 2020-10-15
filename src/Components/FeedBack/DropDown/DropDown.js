import React, {useState} from 'react';
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

function DropDown({menu,label}) {
    const classes = useStyles();
    const [selected,setSelected] = useState('')
    //eslint-disable-next-line
    const newMenu = menu.filter((item,i)=>{
        if (i!==0){
            return item;
        }
    })

    const handleChange = (event) => {
        setSelected(event.target.value);
    };
    return (
        <FormControl className={classes.formControl}>
            <p className={'dropdown-label'}>{label}</p>
            <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={selected}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
            >
                <MenuItem value="">
                    <em>{menu[0]}</em>
                </MenuItem>
                {newMenu?.map(item=>{
                    return (<MenuItem value={item}>
                        {item}
                    </MenuItem>)
                })}
            </Select>
        </FormControl>
    )
}

export default DropDown;
