//SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

contract ProcessMonitor {

    event newContract(address newContract);
    function instantiateProcess(address newProcess) public{
        //ProcessTemplate process = new ProcessTemplate();
        emit newContract(newProcess);
    }
}
