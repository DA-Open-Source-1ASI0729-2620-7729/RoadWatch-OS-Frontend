export type PlanType='BASE'|'PROFESSIONAL'|'ENTERPRISE'; export interface Plan{type:PlanType;name:string;price:string;projects:number;users:number;features:string[];}
