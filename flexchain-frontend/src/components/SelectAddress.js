import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAddress(addressList) {
    const [address, setAddress] = React.useState([]);
    let x = 1;
    const handleChange = (event) => {
        setAddress(event.target.value);
    };

    console.log(addressList)


    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Contract Address</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={address}
                    onChange={handleChange}
                    autoWidth
                    label="Contract Address"
                >

                       {addressList.addressList.map(
                            address=>(
                                <MenuItem value={address.returnValues.newContract}>
                                <em key={address.returnValues.newContract}>{address.returnValues.newContract}</em>
                                </MenuItem>
                            )
                        )}


                </Select>
            </FormControl>
        </div>
    );
}
