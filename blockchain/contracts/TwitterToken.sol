// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

error TwitterToken_InefficientBalane();
error TwitterToken_NotEnoughAllowances();

contract TwitterToken {
    uint256 public constant TOTAL_SUPPLY = 1000;
    string public s_name = "TwitterToken";
    string public s_symbol = "TWT";
    uint8 public s_decimals = 8;
    mapping(address => uint256) public s_balanceOf;
    mapping(address => mapping(address => uint256)) public s_allowances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    function name() public view returns (string memory) {
        return s_name;
    }

    function symbol() public view returns (string memory) {
        return s_symbol;
    }

    function decimals() public view returns (uint8) {
        return s_decimals;
    }

    function totalSupply() public pure returns (uint256) {
        return TOTAL_SUPPLY;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return s_balanceOf[_owner];
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        // Prevent transfer to 0x0 address. Use burn() instead
        require(_to != address(0x0));
        // Check if the sender has enough
        require(s_balanceOf[_from] >= _value);
        // Check for overflows
        require(s_balanceOf[_to] + _value >= s_balanceOf[_to]);
        uint256 previousBalances = s_balanceOf[_from] + s_balanceOf[_to];
        s_balanceOf[_from] -= _value;
        s_balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        assert(s_balanceOf[_from] + s_balanceOf[_to] == previousBalances);
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        if (s_allowances[_from][msg.sender] >= _value) {
            revert TwitterToken_NotEnoughAllowances();
        }
        s_allowances[_from][msg.sender] -= _value;
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        s_allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}

// https://eips.ethereum.org/EIPS/eip-20#simple-summary
