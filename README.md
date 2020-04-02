Bot Controller 


This is a simple app to manage the Telegram Bot (Leo). 


Features


- Commands
- Member added to group message
- Member deleted from the group message
- Adding Docs
- Adding Media
- Adding Polls
- Senting Messages
- Kick out members 
- Ban chat members
- Unban chat members
- Get members of group
- Switch btw groups



Commands

Commands are simple commands members can use (Theses are default commands)




Commands:{
Help:{
      commandMsg: ['/help','/h'],
      desc: 'It will show us all the command of telegram bot',
     },
report:{
        commandMsg: ['/report <msgs to the admins>'],
        desc: 'report is used to report to all admins of the group',
      },
link: {
       commandMsg:['/link'],
       desc:'this will provide all the links',
      },
	}
	
	
	
	Before working you need to add both you Telegram token and Firebase admin SDK and its token too.
