const mongoose = require("mongoose");
const { isEmail}= require("validator");
// const { isBadge}  = require("validator");

const bcrypt = require("bcrypt");

// schema model database mongoose\\
const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    // required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  lastname: {
    type: String,
    // required: true,
    minlenth: 3,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    validate: [isEmail],
    minlenth: 3,
    maxlength: 100,
    unique: true,
    trim: true,
  },
  badge: {
    type: String,
    // required: true,
    // validate: [isBadge],
    minlenth: 3,
    maxlength: 22,
    unique: true,
    trim: true,
  },
});

employeeSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.badge = await bcrypt.hash(this.badge, salt);
  next();
});

const EmployeesModel = mongoose.model("employee", employeeSchema);
module.exports = EmployeesModel;


// employeeSchema.statics.login = async function (email, badge, password) {
//   const user = await this.find({ email, badge});
//   if (user) {
//     const auth = await bcrypt.compare(
//       (password, user.password) && (badge, user.badge)
//     );
//     if (auth) {
//       return user;
//     }
//     throw Error("test password accée refusé  ");
//   }
//   throw Error("test email accée refusé ");
// };
