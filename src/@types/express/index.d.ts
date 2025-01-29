// declare namespace Express {
//   export interface Request {
//     user?: {
//       id: number;
      
//     };
//   }
// }

// src/@types/express/index.d.ts

import { User } from "../../models/user"; // Importe o modelo User ou o tipo de usuário que você está usando

declare global {
  namespace Express {
    interface Request {
      user?: User; // Adicionando o `user` ao tipo de Request
    }
  }
}

