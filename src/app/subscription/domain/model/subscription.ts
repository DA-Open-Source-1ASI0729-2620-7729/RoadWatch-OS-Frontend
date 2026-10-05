import{PlanType}from'./plan'; export interface Subscription{plan:PlanType;status:'ACTIVE'|'PAST_DUE';renewalDate:string;projectsUsed:number;usersUsed:number;}
