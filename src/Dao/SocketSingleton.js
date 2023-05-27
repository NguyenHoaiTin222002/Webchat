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
    sendCreateRoom(nameRoom){
        const createRoom = {
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name: nameRoom,
                },
            },
        }
        this.socket.send(JSON.stringify(createRoom));
    }
    getMessByNameRoom(name,type){
        if(type === 0) {
            var getchatmesspeople = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: name,
                        page: 1,
                    },
                },
            };
            this.socket.send(JSON.stringify(getchatmesspeople))
        }else {
            var getchatmessroom = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name:  name,
                        page: 1,
                    },
                },
            };
            this.socket.send(JSON.stringify(getchatmessroom))
        }

    }
    sendGetUserList(){
        const value = {
            action: "onchat",
            data: {
                event: "GET_USER_LIST"
            }
        }
        this.socket.send(JSON.stringify(value))
    }

}

export  default SocketSingleton;