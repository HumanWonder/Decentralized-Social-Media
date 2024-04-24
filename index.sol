// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Forum {

    struct Block {
        uint UUID;
        address author;
        string title;
        string content;
        string link;
        uint parent;
        uint[] child;
        address[] likes;
    }

    Block[] public forum;

    function newBlock(address author, string calldata title, string calldata content, string calldata link, bool isParents, uint parentUUID) public {
        Block storage post = forum.push();
        post.author = author;
        post.title = title;
        post.content = content;
        post.link = link;
        if (isParents) {
            post.parent = parentUUID;
            forum[parentUUID].child.push(forum.length - 1);
        }
        post.UUID = forum.length - 1;
    }

    function getAllBlocks() public view returns (Block[] memory) {
        return forum;
    }

    function getBlockById(uint UUID) public view returns (Block memory) {
        require(UUID < forum.length, "Invalid UUID");
        return forum[UUID];
    }

    function addLike(uint UUID) public {
        require(UUID < forum.length, "Invalid UUID");
        forum[UUID].likes.push(msg.sender);
    }

    function removeLike(uint UUID) public {
        require(UUID < forum.length, "Invalid UUID");
        
        for (uint i = 0; i < forum[UUID].likes.length; i++) {
            if (forum[UUID].likes[i] == msg.sender) {
                forum[UUID].likes[i] = forum[UUID].likes[forum[UUID].likes.length - 1];
                forum[UUID].likes.pop();
                break;
            }
        }
    }

    function hasLiked(uint UUID, address user) public view returns (bool) {
        require(UUID < forum.length, "Invalid UUID");
        
        for (uint i = 0; i < forum[UUID].likes.length; i++) {
            if (forum[UUID].likes[i] == user) {
                return true;
            }
        }
        
        return false;
    }
}
