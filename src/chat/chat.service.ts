import { chatDto } from './chat.dto';
import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager'

@Injectable()
export class ChatService {
constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async create(message: chatDto): Promise<any>{
    let x = []
    x = await this.cacheManager.get('message')
    if (x == null) this.cacheManager.set('message', [{ login: message.login, message: message.text}], {ttl: 1000})
    else this.cacheManager.set('message', [...x,{ login: message.login, message: message.text}], {ttl: 1000})
    return await this.cacheManager.get('message')
  }

  async online(login: string):  Promise<any>{
    console.log("online: ", login)
    await this.cacheManager.set(`${login} status`, true, {ttl: 1000})
    return await this.cacheManager.get(`${login} status`)
   }

  async offline(login: string): Promise<any>{
    console.log("offline: ",login)
    await this.cacheManager.set(`${login} status`, false, {ttl: 1000})
    await this.cacheManager.set(`${login} refreshToken`, "0", {ttl: 10000}) 
    return await this.cacheManager.get(`${login} status`)
   }

  async getAll(): Promise<any> {
    return await this.cacheManager.get('message')
  }

  async checkOnline(login: string): Promise<any> {
    return await this.cacheManager.get(`${login} status`)
  }

}
