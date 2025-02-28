import {Role} from "@prisma/client";

export default class UserModel{
    email:string;
    password:string;
    role:Role;
    constructor(username:string,password:string,role:Role){
        this.email = username;
        this.password = password;
        this.role = role;
    }
}