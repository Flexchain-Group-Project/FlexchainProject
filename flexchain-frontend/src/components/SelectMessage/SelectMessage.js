import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMessage(props) {
    const [message, setMessage] = React.useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
        props.getMessage(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Message ID</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={message}
                    onChange={handleChange}
                    autoWidth
                    label="Message ID"
                >
                    {  props.idsList.map(

                        id=>(
                            <MenuItem value={id}>{id}</MenuItem>
                        )
                        )}


                </Select>
            </FormControl>
        </div>
    );
}
