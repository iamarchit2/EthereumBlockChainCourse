contract Lottery {
    address public manager; //public so that javascript program can access it.
    address[] public players;
    function Lottery() public {
        manager = msg.sender;
    }
    function getPlayers() public view returns(address[]){
        return players;
    }
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    function random() private view returns (uint){
       return uint(keccak256(block.difficulty, now, players));
    }
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
