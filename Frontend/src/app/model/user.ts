
export interface RegisterRequest{
  userName:string;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  confirmPassword:string;
  address:string;
  dateOfBirth: Date;
  role: string;
  id: number;
}

export interface UserForLogin{
  email:string;
  password:string;
  token:string;
}

export interface UserForModify{
  userName: string;
  firstName:string;
  lastName:string;
  address: string;
  dateOfBirth: Date;
}
