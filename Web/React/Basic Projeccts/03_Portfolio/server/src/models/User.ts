import mongoose,{Document,Schema} from "mongoose";
import { minLength } from "zod/v4";

// Interface for ts for complile time only
// it tells coder / code editor fields and datatype (auto complete) 
export interface IUser extends Document {
    name: string;
    email: string;
    password? : string
    role: 'user' | 'admin';
    createdAt : Date;
}

// 2. the Schema , actual validation before writing into DB
const UserSchema:Schema = new Schema(
    {
        name:{
            type: String,
            required: [true,'Please add a name']
        },
        email: {
            type: String,
            required:[true,'Please add a email'],
            unique:true,
            match:[
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
        ],
        },
        password: {
            type:String,
            required:[true,'Please add a Password'],
            minLength: 6,
            select:false , // Dont return or send PW by default
        },
        role: {
            type:String,
            enum:['user','admin'],
            default:'user',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<IUser>('User',UserSchema);