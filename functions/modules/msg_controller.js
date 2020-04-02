const msgsent = require('./sent message');
var admin = require("firebase-admin");
var serviceAccount = require("");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
});
const reportFromMembers = require('./report_from_memebers_bot');
const pollManagers = require('./poll_manager');

// firebase firetore inistilized
const db = admin.firestore();

//handle add and remove of user
async function addOrRemoveUser(msg, api) {

    // welcome message when new members join in
    if (msg.new_chat_member !== undefined) {

        var newReplay = 'Welcome ' + msg.new_chat_member.username + ' to ' + msg.chat.title;

        //msg sent when person is added to group
        // api.sendMessage(msg.chat.id, newReplay);
        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Rules', url: 'zeroark.com' }],
                ]
            })
        };

        api.sendMessage(msg.chat.id, newReplay, options);
    }
}


async function msgController(msg, api) {

    // check if msg was added member
    if (msg.new_chat_member === undefined) {

        if (msg.poll === undefined) {

            // check if msg was report or not
            if (!msg.text.includes('/report')) {

                // acess all data from commands collection database
                var data = await db.collection('commands').get();

                // spliting of fetch data
                data.docs.forEach((doc) => {

                    // again splitting of fetch data to documnets
                    var fetchData = doc._fieldsProto;
                    // for loop run as the length of the commad array

                    for (var index = 0; index < fetchData.command.arrayValue.values.length; index++) {
                        // fetching signle data
                        var commands = fetchData.command.arrayValue.values[index];

                        // comparing with Recived msg

                        if (msg.text === commands.stringValue) {

                            // acessing replay msg of the commad

                            var replayMsg = fetchData.replay.stringValue;

                            // checking it is bot or not
                            if (!msg.from.is_bot) {

                                // acessiing recive msg username
                                var username = msg.from.username;

                                //connect with define commads
                                var newReplay = replayMsg.replace("+ msg.from.username +", username);

                                //   console.log(newReplay);

                                // senting replay msg
                                msgsent(msg, newReplay, api);

                            }

                        }
                    }

                });
            } else {

                // report memebers sections

                reportFromMembers(msg, api, db);
            }
        } else {
            console.log('a poll is created');

            pollManagers(msg, api, db);

        }

    }
    else {
        // passed to add and emove msg sys
        addOrRemoveUser(msg, api);
    }
}

module.exports = msgController;