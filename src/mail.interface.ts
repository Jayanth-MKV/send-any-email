export interface Mail {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  [key: string]: any;
}


export interface jobInterface{
  to: string,
  subject:string
  name: string,
 link:string 
}