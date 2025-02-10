export class User {
    constructor(
      public uuid: string,
      public nodeid: number,
      public name: string,
      public email: string,
      public disabilityName: string | null,
      public gender: string,
      public delete_flag: boolean,
      public isActive: boolean,
      public created_at: Date,
      public updated_at: Date
    ) {}
  }
  