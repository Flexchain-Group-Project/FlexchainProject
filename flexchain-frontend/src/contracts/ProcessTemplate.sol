//SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.7;

contract ProcessTemplate {

    enum State { ENABLED, DISABLED, COMPLETED }

    event newRule(string[] messageId, string[] rule);
    event messageExecute(string messageId, string[] inputs);

    string[]  IDs;
    mapping(string => string) rules;
    mapping(string => State)  elements;
    mapping(string => string) stringValues;
    mapping(string => bool)   booleanValues;
    mapping(string => uint)   uintValues;
    uint8 update = 0;


    constructor(){
        ProcessMonitor process = ProcessMonitor(0xf262302558914efABb3b71d000a2FAA9A1f30Ea6);
        process.instantiateProcess(address(this));
    }

    function getMessage(string memory messageId) public view returns (State){
        return elements[messageId];
    }

    function getIDs() public view returns(string[] memory ids){
        return IDs;
    }

    function setRules(string[] memory messageId, string[] memory rule) public{
        if(update == 0){
            IDs = messageId;
            update = 1;
        }
        for(uint i = 0; i < messageId.length; i++){
            rules[messageId[i]] = rule[i];
            elements[messageId[i]] = State.DISABLED;
        }
        emit newRule(messageId, rule);
    }

    function getRule(string memory messageId) public view returns (string memory){
        return rules[messageId];
    }

    function deleteRules(string[] memory ids) public{
        for(uint a = 0; a < ids.length; a++){
            delete rules[ids[a]];
            for(uint b = 0; b < IDs.length; b++){
                if(compareStrings(IDs[b], ids[a])){
                    delete IDs[b];
                    delete elements[ids[a]];
                }
            }
        }

    }

    function addRules(string[] memory messageIds, string[] memory newRrules) public{
        for(uint i = 0; i < messageIds.length; i++){
            rules[messageIds[i]] = newRrules[i];
            IDs.push(messageIds[i]);
            elements[messageIds[i]] = State.DISABLED;
        }
    }


    function executeMessage(string memory messageToExecute, string[] memory inputs) public {
        elements[messageToExecute] = State.ENABLED;
        emit messageExecute(messageToExecute, inputs);

    }

    function getString(string memory variable) public view returns (string memory){
        return stringValues[variable];
    }

    function getInt(string memory variable) public view returns (uint){
        return uintValues[variable];
    }

    function getBool(string memory variable) public view returns (bool){
        return booleanValues[variable];
    }



    function setVariables(string[] memory types, string[] memory variables, string[] memory values, string memory messageID) public{
        if(types.length > 0){
            for(uint i = 0; i < types.length; i++){
                if(compareStrings(types[i], "string")){
                    stringValues[variables[i]] = values[i];
                }else if(compareStrings(types[i], "uint")){
                    uintValues[variables[i]] = stringToUint(values[i]);
                }else if(compareStrings(types[i], "bool")){
                    booleanValues[variables[i]] = stringToBool(values[i]);
                }
            }
        }

        elements[messageID] = State.COMPLETED;
    }

    function compareStrings (string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encode(a)) == keccak256(abi.encode(b));
    }

    function stringToUint(string memory s) public pure returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint8 c = uint8(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }

    function stringToBool(string memory s) internal pure returns (bool result){

        if(compareStrings(s, "true")){
            return true;
        } else if(compareStrings(s, "false")){
            return false;
        }
    }
}
contract ProcessMonitor{

    event newContract(address newContract);

    function instantiateProcess(address newProcess) public{
        //ProcessTemplate process = new ProcessTemplate();
        emit newContract(newProcess);
    }


}