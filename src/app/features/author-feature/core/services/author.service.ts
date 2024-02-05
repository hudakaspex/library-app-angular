import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthorService {
    
    
  constructor(private httpService: HttpClient) {}

  public findAll() {
  }

  public authors$() {
  }

}
