import User,{IUser} from "@/models/User.js";

// Defining Data we need to register the user as Ts hates magic
interface RegisterUser {
    name:string;
    email:string;
    password:string;
    role?:'user'|'admin';
}

// Defining Data , we need to login the user
interface LoginUser { 
    email:string;
    password:string;
}

class AuthService {
    // Fn1 -> register
    async register(userData:RegisterUser):Promise<IUser>{

        // 1. Check If User Already Exist
        const existingUser = await User.findOne({email:userData.email});
        if (existingUser){
            throw new Error("User already exists");
        }

        // 2. Create new user
        const user = await User.create(userData);
        return user
    }

    // Fn2 -> Login 
    async login(userData:LoginUser):Promise<IUser> {
        // 1. Find User with given email else user not exist 
        const user = await User.findOne({email:userData.email}).select('+password')
        if (!user){
            throw new Error("Invalid Credentials");
        }

        // 2. if exist , check pass 
        const isMatch = await user.matchpassword(userData.password);

        if(!isMatch){
            throw new Error("Invalid Credentials")
        }

        return user;
    }

}


export default new AuthService();

// export default AuthService: "Here is the blueprint. Build it yourself."

// export default new AuthService(): "Here is the finished tool. Use it."