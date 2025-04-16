import { defineStore } from "pinia";
import type { User } from "@/services/Authentication/domain/models/User";

export const useAuthenticationStore = defineStore('authentication',{
state:()=>({
  user:null as null | User
}),
actions:{
  setUser(user:User){
    this.user=user;
    localStorage.setItem('user',JSON.stringify(this.user));
  },
  cleanUser(){
    this.user=null;
    localStorage.removeItem('user');
  }
}
});
