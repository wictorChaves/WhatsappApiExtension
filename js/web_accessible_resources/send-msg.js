/**
 * Created by wictor on 09/06/2018.
 */

/**
 * Example sendMsg("553192991976", "Test")
 */
function sendMsg(contact, message){
    var Chats = Store.Chat.models;
    var chat;
    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        };
        var temp = {};
        temp.contact = Chats[chat].__x__formattedTitle;
        temp.id = Chats[chat].__x_id;
        if(temp.id.user.search(contact)!=-1 && temp.id.user.search('g.us')==-1 ){
            Chats[chat].sendMessage(message);
            break;
        }
    }
}
