/**
 * Created by wictor on 10/06/2018.
 */

var contact;
var last_msg = [];
var msg_output = [];

function getMessagesFormatted(chat)
{
    messages = chat.msgs.models;
    contact = getInformationByContact(chat);
    for (let i = messages.length - 1; i >= 0; i--)
    {
        if (!messages[i].id.fromMe)
        {
            if (isLastMsg(messages[i]))
            {
                continue;
            }
            msg_output.push(joinObjs(contact, getInformationByMessage(messages[i])));
        }
    }
}

function isLastMsg(messages)
{
    return ((messages.id.id == last_msg['id']) || (parseInt(messages.t) < parseInt(last_msg['timestamp'])));
}

function getLastMsgByResults(results)
{
    last_msg['id'] = ((results.rows.length > 0) ? results.rows[0].id_msg : 0);
    last_msg['timestamp'] = ((results.rows.length > 0) ? results.rows[0].timestamp : 0);
}

function getLastMsgAndSave()
{
    if (msg_output.length > 0)
    {
        saveLastMsg(msg_output[0].id, msg_output[0].timestamp, loop);
    } else
    {
        setTimeout(loop, 1000);
    }
}

function getInformationByContact(chat)
{
    return {
        formattedTitle: chat.formattedTitle,
        name: chat.name,
        id_contact: chat.id
    }
}

function getInformationByMessage(message)
{
    return {
        id: message.id.id,
        message: message.body,
        timestamp: message.t,
        clientUrl: message.clientUrl,
        mediaKey: message.mediaKey,
        type: message.type,
        filename: message.filename,
        lat: message.lat,
        lng: message.lng
    };
}

/**
 * Work only with jquery
 * @param obj1
 * @param obj2
 */
function joinObjs(obj1, obj2)
{
    return $.extend({}, obj1, obj2);
}

function receiveMessages(transaction, results)
{
    msg_output = [];
    Store.Chat.models.forEach(function (chat)
    {
        getLastMsgByResults(results);
        getMessagesFormatted(chat);
    });

    msg_output.forEach(function (msg)
    {
        insertMessage(JSON.stringify(msg));
        console.log(msg);
    });
}

var sendMessages = function (transaction, results)
{
    $.each(results.rows, function (i, val)
    {
        var row = results.rows.item[i];
        console.log('Enviando mensagem para o contato:' + val.contact + '    message:' + val.message);
        sendMsg(val.contact, val.message);
        getDeleteSendMessage(val.id);
    });
};

var messageManager = function (transaction, results)
{
    getSendMessages(sendMessages);
    receiveMessages(transaction, results);
    getLastMsgAndSave();
};

function getMessages()
{
    getLastMsg(messageManager);
}