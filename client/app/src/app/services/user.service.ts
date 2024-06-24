import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../types/IUser";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiUsersUrl;

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    console.log(this.apiServerUrl);
    return this.http.get<User[]>(`${this.apiServerUrl}`);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/${id}`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/register`,user);
  }
}
