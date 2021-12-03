import Web3 from "web3";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAddress(props) {
    const [address, setAddress] = React.useState([]);
    const handleChange = (event) => {
        setAddress(event.target.value);
    };

    // console.log(props.address)
     console.log(props.diagramsList)

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
                       {props.addressList.map(

                           (address,index)=>(
                                <MenuItem value={address.returnValues.newContract}>
                                {/*<em key={address.returnValues.newContract}>{address.returnValues.newContract}</em>*/}
                                 <em title={address.returnValues.newContract}>{props.diagramsList[index]}</em>
                                </MenuItem>

                            )
                        )}
                </Select>
            </FormControl>
        </div>
    );
}

function getWeb3() {
    return new Web3(Web3.givenProvider || "ws://localhost:8545");
}