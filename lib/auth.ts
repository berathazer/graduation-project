import { currentUser } from "@clerk/nextjs";

export const currentProfile = async () => {
    const user = await currentUser();
    return user
}