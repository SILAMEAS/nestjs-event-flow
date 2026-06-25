export interface IUser{
    id:string;
    email:string;
    name:string;
    createAt:Date;
    updatedAt:Date

}
export interface IAuthUser extends Pick<IUser,'id'|"email">{
    role:string[]
}