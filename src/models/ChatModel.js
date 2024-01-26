
class ChatModel {
    constructor(id, text, sender, receiver, hourMessage){
        this.id = id;
        this.text = text;
        this.sender = sender;
        this.receiver = receiver;
        this.hourMessage = hourMessage;
    }
}

module.exports = ChatModel;