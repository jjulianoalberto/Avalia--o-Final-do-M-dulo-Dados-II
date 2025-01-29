import bcrypt from "bcrypt";

// Gera o hash da senha
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Verifica se a senha informada corresponde ao hash
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
