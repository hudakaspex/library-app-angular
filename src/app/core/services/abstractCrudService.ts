import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

export abstract class AbstractCrudService<T> {

  constructor(protected http: HttpClient, protected baseUrl: string) { }

  protected abstract createModel(data: T): T;

  // Create a new resource
  create(item: T): Observable<T> {
    return this.http.post<T>(`${environment.serverUrl}${this.baseUrl}`, item);
  }

  // Read a single resource by ID
  getById(id: number): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}${this.baseUrl}/${id}`)
    .pipe(
      map(response => this.createModel(response))
    );
  }

  // Read all resources
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.serverUrl}${this.baseUrl}`)
    .pipe(
      map(results => {
        return results.map(result => this.createModel(result));
      })
    );
  }

  // Update a resource
  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${environment.serverUrl}${this.baseUrl}/${id}`, item);
  }

  // Delete a resource
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}${this.baseUrl}/${id}`);
  }
}
