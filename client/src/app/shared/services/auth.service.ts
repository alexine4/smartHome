import { Injectable } from "@angular/core";
import { User } from "../interfaces";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { confirmCod } from "src/app/register-page/confirm-access/confirm-access.component";


@Injectable({ providedIn: 'root' })
export class AuthService {

  private token = ''
  constructor(private httpClient: HttpClient) {

  }

  // login 
  login(user: User): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }
  setToken(token: string) {
    this.token = token
  }
  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logOut() {
    this.setToken('')
    localStorage.clear()
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/register', user)
  }
  // check and confirm connection to device
  confirmConnectionReq(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/confirmConnection', user)
  }
  confirmConnectionRes(confirmCode: confirmCod): Observable<confirmCod> {
    return this.httpClient.post<confirmCod>('/api/auth/connectionCode', confirmCode)
  }
  // check user if fogot password

  checkUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/checkUser', user)
  }
  // change password
  changePassword(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/changePassword', user)
  }
}