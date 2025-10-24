import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new Schema(

{
   fullName: {
  type: String,
  required: true
    },

  username: {
  type: String,
  required: true,
  lowercase: true,
  trim: true,
  index: true,
  unique: true
  },

  email: {

   type: String,
   required: true,
   unique: true,
   trim: true,
   lowercase: true
   },

  password: {
   type: String,
   required: true
  },
   ConfirmPassword: {
   type: String,
   required: true
  },
  
  

   role: { type: String,
     enum: ["user", "driver"],
      default: "user" 
    },
    busId: { type: mongoose.Schema.Types.ObjectId,
       ref: "Bus",
        default: null 
      }
 },
 {
  timestamps: true
 }
);


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
  next();
})


userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}


const User = mongoose.model('User', userSchema)

export { User }



