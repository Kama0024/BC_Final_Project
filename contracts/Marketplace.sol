pragma solidity ^0.8.0;

contract Marketplace {
    struct Item {
        uint256 id;
        address seller;
        string title;
        string description;
        uint256 price;
        bool available;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    event ItemListed(uint256 indexed id, address indexed seller, string title, uint256 price);
    event ItemPurchased(uint256 indexed id, address indexed buyer, address indexed seller, uint256 price);

    function listNewItem(string memory _title, string memory _description, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        items[itemCount] = Item(itemCount, msg.sender, _title, _description, _price, true);
        emit ItemListed(itemCount, msg.sender, _title, _price);
    }

    function purchaseItem(uint256 _itemId) external payable {
        require(_itemId > 0 && _itemId <= itemCount, "Invalid item ID");
        Item storage item = items[_itemId];
        require(item.available, "Item is not available");
        require(msg.value >= item.price, "Insufficient funds");

        item.available = false;
        payable(item.seller).transfer(item.price);
        emit ItemPurchased(_itemId, msg.sender, item.seller, item.price);
    }

    function getItem(uint256 _itemId) external view returns (uint256, address, string memory, string memory, uint256, bool) {
        require(_itemId > 0 && _itemId <= itemCount, "Invalid item ID");
        Item memory item = items[_itemId];
        return (item.id, item.seller, item.title, item.description, item.price, item.available);
    }
}
