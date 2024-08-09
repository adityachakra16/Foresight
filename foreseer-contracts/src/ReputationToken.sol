// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Auth} from "./mixins/Auth.sol";

contract ReputationToken is ERC1155, Auth {
    uint256 private _currentTokenId;

    mapping(uint256 => uint256) private _reputationScores;

    constructor() ERC1155("https://api.foresight.finance/token/{id}.json") {}

    function setURI(string memory newuri) public onlyAdmin {
        _setURI(newuri);
    }

    function mint(address to) public onlyAdmin returns (uint256) {
        _currentTokenId++;
        uint256 newTokenId = _currentTokenId;
        _mint(to, newTokenId, 1, "");
        _reputationScores[newTokenId] = 0; // Initialize reputation score to 0
        return newTokenId;
    }

    function updateReputationScore(uint256 tokenId, uint256 newScore) public onlyReputationOracle {
        require(_exists(tokenId), "Token does not exist");
        _reputationScores[tokenId] = newScore;
    }

    function getReputationScore(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return _reputationScores[tokenId];
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return tokenId > 0 && tokenId <= _currentTokenId;
    }
}
