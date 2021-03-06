import {RoleModel} from '../role/role-model';

export interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  nip: string;
  regon: string;
  active: boolean;
  roles: RoleModel[];
}

export interface UserSimpleModel {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  nip: string;
  regon: string;
  active: boolean;
  roles: RoleModel[];
}

export interface UserLoginModel {
  id: number;
  usernameOrEmail: string;
  password: string;
  token: string;
}

export interface UserSignUpModel {
  name: string;
  username: string;
  email: string;
  password: string;
}
