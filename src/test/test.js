const genArch = require("../modules/netArchitecture.js");

let nameInput = "Poop House"
let floorInput = 3
let rankInput = "basic"

const makeid = (length) => {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    const netID = makeid(10);




const netArray = genArch(floorInput, rankInput);



let netObject = {
  netID: netID,
  netName: nameInput,
  floors: [],
  netRunners: [
    {
      id: " ",
      name: " ",
      floor: 0,
    },
  ],
  daemons: [
    {
      id: " ",
      name: " ",
      floor: 0,
    },
  ],
};


for (let i = 0; i < netArray.length; i++) {
  netObject.floors.push({
    floor: i + 1,
    programs: [
      {
        id: makeid(9),
        name: netArray[i]
        }
    ],
  });
}

let lobby = [];
let floors = [];
for (let i = 0; i < 2; i++) {
  lobby.push(`[${i + 1}]⌬[${netArray[i]}\n`);
}
for (let i = 2; i < netArray.length; i++) { 
  floors.push(`[${i + 1}]⌬[${netArray[i]}\n`);
}
for (let i = netArray.length; i < 10; i++) {
  floors.push(" ");
}

console.log(netArray)

console.log(netObject.floors[0])

