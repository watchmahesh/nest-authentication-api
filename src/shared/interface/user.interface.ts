import { Observable } from 'rxjs';

export interface UserService {
    create(data?: CreateRequest): Observable<UserDatas>;
    update(data?: UpdateRequest): Observable<UserDatas>;
    delete(data: QueryById): Observable<UserSuccessMessage>;
    findById(data: QueryById): Observable<UserDatas>;
    findAll(data?: ListRequest): Observable<ListAll>;

}
export interface ListAll {
  data: Array<UserDatas>;
}
export interface CreateRequest {
  data: CreateData;
}

export interface UserSuccessMessage {
  message: string;
}

export interface UserDatas {
    id? : number;
  name ?: string;
  email ?: string;

}

export interface ListRequest {
  data ?:string;
}

export interface UpdateRequest {
  id:number
  data: CreateData;
}

export interface CreateData {
    name ?: string;
    email ?: string;
    password ?: string;
}

export interface QueryById {
  id: number;
}