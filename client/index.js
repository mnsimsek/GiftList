const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt = require("prompt-sync")();

const serverUrl = 'http://localhost:1225';

async function main() {
  
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot(); 
  console.log(`root: ${root}`);

  const name = prompt("Name: ");
  if(name == null){
    alert("You have to type a name");
  }

  // Find the index of the name and get proof from merkle tree.
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  console.log(proof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof
  });

  console.log({ gift });
}

main();