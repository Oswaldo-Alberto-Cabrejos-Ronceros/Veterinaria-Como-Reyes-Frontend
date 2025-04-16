export interface HttpClient{
get<T=any>(url:string):Promise<{data:T}>;
post<T=any>(url:string,body:any):Promise<{data:T}>;
put<T=any>(url:string,body:any):Promise<{data:T}>;
delete<T=any>(url:string):Promise<{data:T}>;
}