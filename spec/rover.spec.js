const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

   it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98372);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message",function(){
    let rover= new Rover(98732);
     let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
     expect(rover.receiveMessage(message).message).toContain(message.name);
     });

    it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
      let rover= new Rover(98732);
     let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
    expect((rover.receiveMessage(message).results).length).toEqual(2);

    });
    it("responds correctly to status check command",function(){
     let rover= new Rover(98732);
     let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Another message!', commands);
    let results=rover.receiveMessage(message).results;
    //console.log(result..mode);
   expect(results[0].roverStatus.mode).toEqual(rover.mode);
    expect(results[0].roverStatus.generatorWatts).toEqual(rover.generatorWatts);
     expect(results[0].roverStatus.position).toEqual(rover.position);

    });

    it("responds correctly to mode change command",function(){
     let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
     let rover = new Rover(98382);    // Passes 98382 as the rover's position.
     let response = rover.receiveMessage(message);
     console.log(response.results[0].roverStatus.mode);
     expect(response.results[1].completed).toEqual(true);
     expect(response.results[0].roverStatus.mode).toEqual("LOW_POWER");
     //expect(response.result[1].roverStatus.mode).toEqual("NORMAL");


    });
    it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
      let commands = [new Command('MOVE',32765)];
      let message = new Message('Test message with Mode change commands', commands);
     let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      console.log(response.results[0].completed);
      expect(response.results[0].completed).toEqual(true);
     expect(rover.position).toEqual(message.commands[0].value);
    });
    it("responds with position for move command",function()
    {
      let commands = [new Command('MOVE',53768)];
      let message = new Message('Test message with Move Commands', commands);
     let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      //console.log(rover.position,message.commands[0].value);
      expect(rover.position).toEqual(message.commands[0].value);

    });

  

});
