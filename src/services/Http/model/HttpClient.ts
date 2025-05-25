export interface HttpClient{
get<T>(url:string):Promise<{data:T}>;
post<T>(url:string,body:unknown):Promise<{data:T}>;
put<T>(url:string,body:unknown):Promise<{data:T}>;
patch<T>(url:string,body:unknown):Promise<{data:T}>
delete<T>(url:string):Promise<{data:T}>;
}
