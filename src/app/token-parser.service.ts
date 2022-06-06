import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenParserService {

  constructor() { }


  decode(token: string|null): JWT|false {
    if (!token) {
      return false
    }

    var parts = token.split('.')
    if (parts.length >= 2) {
      var body = JSON.parse(atob(parts[1]))

      if (Math.floor(Date.now() / 1000) > body.exp) {
        return false
      }

      return body
    } else {
      return false
    }
  }
}

interface JWT {
  iat: number
}
