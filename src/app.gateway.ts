import { Body, UseGuards , Req, Request} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer, OnGatewayInit, OnGatewayDisconnect
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JwtGuard } from './auth/auth.jwtGuard';
import { JwtStrategy } from './auth/jwt.strategy';
import { ChatService } from './chat/chat.service';
import jwt_decode from 'jwt-decode';

@WebSocketGateway( {cors: true,  namespace: 'chat' })

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
  constructor(private chatSevice: ChatService){ 
 }
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log("Welcome");
    //  console.log(server)
  }

  handleDisconnect(client: Socket) {
    let data:{name: string} = jwt_decode(client.handshake.auth.token)
    this.chatSevice.online(data.name)
    console.log('disconnected', client.id);
  }

  
   handleConnection(client)
    {
      let data:{name: string} = jwt_decode(client.handshake.auth.token)
   this.chatSevice.online(data.name)
    console.log("On")
    console.log("Connect: ",client.id);
    client.emit('hui', 'RRR')
  }

  @SubscribeMessage('mese')
  handleSendMessage(client: Socket, payload: any): any {
    // await this.appService.createMessage(payload);
    console.log("XXXX", payload);
    this.server.emit('message', payload);
  }

  

 

  
}

