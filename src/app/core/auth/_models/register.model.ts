export class RegisterModel {
  username: string;
  password: string;
  email: string;
  clear(): void {
    this.username = '';
    this.password = '';
    this.email = '';

  }
}