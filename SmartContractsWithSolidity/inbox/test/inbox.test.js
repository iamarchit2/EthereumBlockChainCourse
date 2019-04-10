const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// Constructor Function, creats an Instance.
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');
// Testing.
/*class Car {
  park() {
    return 'stopped';
  }
  drive() {
    return 'vroom';
  }
}
let car; //'Scope constraints'
beforeEach(() => {
   car = new Car();
});
describe('Car', () => {
  it('can park', () => {
    assert.equal(car.park(), 'stopped');
  });
  it('can drive', () => {
    assert.equal(car.drive(), 'vroom');
  });
});*/
let accounts;
let inbox;
beforeEach(async () => {
  //Get a list of all Accounts.
  accounts = await web3.eth.getAccounts();
   //Module F
   //Concept of Promises, Async Await and Callbacks

  //Use them to deploy Contracts using ganache.
   inbox = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({ data: bytecode, arguments: ['Archit'] })
   .send({ from: accounts[0], gas: '1000000' });
   inbox.setProvider(provider)
});
describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address); //Makes sure that the arguement is a defined value.
  });
  it('has a default message', async () =>{
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Archit');
  });
  it('can change a message', async () => {
    await inbox.methods.setMessage('bye').send({ from : accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
