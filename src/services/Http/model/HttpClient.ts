export interface HttpClient{
get<T=unknown>(url:string):Promise<{data:T}>;
post<T=unknown>(url:string,body:unknown):Promise<{data:T}>;
put<T=unknown>(url:string,body:unknown):Promise<{data:T}>;
delete<T=unknown>(url:string):Promise<{data:T}>;
}
