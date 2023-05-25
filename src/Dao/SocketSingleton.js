class SocketSingleton{

    constructor() {
        if (!!SocketSingleton.instance) {
            return SocketSingleton.instance;
        }
        SocketSingleton.instance = this;
        this.socket = new WebSocket("ws://140.238.54.136:8080/chat/chat")
        return this;
    }
    getSocket(){
        return this.socket;
    }
    setSocket(){
        this.socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
    }


    sendLogin(userName, password){
        var login = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: userName,
                    pass:  password,
                },
            },
        }
        this.socket.send(JSON.stringify(login))
    }




}

export  default SocketSingleton;