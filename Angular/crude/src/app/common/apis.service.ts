import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  
  constructor(private http: HttpClient) { }

  url = environment.url;

  getAll() {
    return this.http.get(this.url + '/get_users', {responseType: 'text'})
  }

  getOne(id) {
    return this.http.get(this.url + '/get_user/' + id)
  }

  post(data) {
    return this.http.post(this.url + '/insert_user', data)
  }

  put(id, data) {
    return this.http.put(this.url + '/edit_user/' + id, data)
  }

  delete(id) {
    return this.http.delete(this.url + '/delete_user/' + id)
  }

}
