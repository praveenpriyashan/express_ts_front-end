import {UserModel} from "../model/user";

const User = () => {

    interface SignUpCredentials {
        username: string,
        email: string,
        password: string
    }

    interface LoginCredentials {
        username: string,
        password: string
    }

    async function getLoggedInUser(): Promise<UserModel[]> {
        const res = await fetch("/api/users", {method: "GET"})
        if (!res.ok) {
            throw new Error("Failed to fetch notes");
        }
        return await res.json()
    }


    async function signUp(credentials: SignUpCredentials): Promise<UserModel> {
        const res = await fetch("/users/sighup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
        });
        if (!res.ok) {
            throw new Error("Failed to sign up");
        }
        ;
        return await res.json()
    }


    async function login(credentials: LoginCredentials): Promise<UserModel> {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
        })
        if (!res.ok) {
            throw new Error("Failed to sign up");
        }
        ;
        return await res.json()
    }

    async function logOut() {
        await fetch("/api/users/logout", {
            method: "GET"
        })
    }
    return(
        <div>

        </div>
    )

}
export default User;
