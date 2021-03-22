class Rover {
   // Write code here!
   constructor(position){
     this.position=position;
     this.mode='NORMAL';
     this.generatorWatts=110;
   }
     receiveMessage(message){
       var messageObject={};
       var result=[];
      for(let i=0;i<message.commands.length;i++){
        //console.log(message.commands[i].commandType);

        if(message.commands[i].commandType==="MOVE")
        {
         // result.push({completed: true});
          console.log(this.mode);
          if(this.mode==="LOW_POWER")
          {
            result.push({completed: false});
          }
          else{
          result.push({completed: true});

          this.position=message.commands[i].value;
          }
        }
         if(message.commands[i].commandType==="STATUS_CHECK")
        {
          result.push({completed: true, roverStatus: {mode:this.mode, generatorWatts: this.generatorWatts, position: this.position}});
        }  
         if(message.commands[i].commandType==="MODE_CHANGE")
        {
          this.mode=message.commands[i].value;
           result.push({completed: true, roverStatus: {mode:message.commands[i].value, generatorWatts: this.generatorWatts, position: this.position}});
          
      }
      

        
       }
      // console.log(result);
       messageObject={message:message.name,results:result};
       return messageObject;  
   }

}

module.exports = Rover;