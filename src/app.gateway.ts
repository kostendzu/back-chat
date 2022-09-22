import { SubscribeMessage,
   WebSocketGateway, 
   OnGatewayConnection, 
   WebSocketServer, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';

@WebSocketGateway({
cors: {origin: '*', methods: ["GET", "POST"], allowedHeaders: '*',credentials: true}, 
transports: ['websocket'],
upgrade: false
})
export class AppGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  constructor(private chatSevice: ChatService){}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log("Welcome");
  //  console.log(server)
  }

  handleDisconnect(client: Socket) {
    console.log(client.id);
    console.log('disconnected')
  }

handleConnection(client: Socket) {
  //console.log(client.id);
  // this.chatSevice.online(client.login);
  // console.log('connected')
  client.emit("message", "WWorld")
  this.server.on("connection", (socket) => {
   console.log("docket", socket.id)
   client.emit(JSON.stringify({"message": "world"}));
  })
}
  

@SubscribeMessage('message')
async handleSendMessage(client: Socket, payload: any): Promise<any> {
 // await this.appService.createMessage(payload);
   console.log(payload)
  this.server.emit('message', payload);
}
}