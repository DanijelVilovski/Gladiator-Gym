const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name can\'t be shorter than 2 characters'],
      maxlength: [64, 'Name can\'t be longer than 64 characters']
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
      minlength: [2, 'Surname can\'t be shorter than 2 characters'],
      maxlength: [64, 'Surname can\'t be longer than 64 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [128, 'Email can\'t be longer than 128 characters'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      unique: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
}, {timestamps: true});

//VALIDACIJA EMAIL ADRESA
userSchema.path('email').validate(async(email) => {
const emailCount = await mongoose.models.User.countDocuments({ email })
return !emailCount
}, "Email already exists!");

//HASH PASSWORDA
userSchema.pre('save', async function  (next) {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
      next(error)
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;  