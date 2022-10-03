import { User } from "@prisma/client";

type TUser = Omit<User, "id">;

export { User, TUser };
