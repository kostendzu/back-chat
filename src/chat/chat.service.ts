import { chatDto } from './chat.dto';
import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager'

@Injectable()
export class ChatService {
constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async create(message: chatDto): Promise<any>{
    let x = await this.cacheManager.get('message')
    if (x == null) this.cacheManager.set('message', [{ login: message.login, message: message.text}], {ttl: 1000})
    else this.cacheManager.set('message', [...x,{ login: message.login, message: message.text}], {ttl: 1000})
    return await this.cacheManager.get('message')
  }

  async online(message: chatDto):  Promise<any>{
    let test = (message && message.login)  ? message.login : "test"
    console.log("on;ine: ", test)
    await this.cacheManager.set(`${test} status`, true, {ttl: 1000})
    return await this.cacheManager.get(`${test} status`)
   }

  async offline(message: chatDto): Promise<any>{
    let test = (message && message.login)  ? message.login : "test" ;
    console.log("offline: ",test)
    await this.cacheManager.set(`${test} status`, false, {ttl: 1000})
    await this.cacheManager.set(`${test} refreshToken`, "0", {ttl: 1000}) 
    return await this.cacheManager.get(`${test} status`)
   }

  async getAll(): Promise<any> {
    return await this.cacheManager.get('message')
  }

  async checkOnline(login: string): Promise<any> {
    return await this.cacheManager.get(`${login} status`)
  }

}
