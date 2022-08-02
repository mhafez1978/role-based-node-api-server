const db = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new db.Schema({
	fname:{
		type:String,
		required:true,
	},
	lname:{
		type:String,
		required:true,
	},
	username:{
		type:String,
		required:true,
		unique:true
	},
	email:{
		type:String,
		required:true,
		lowercase:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
	}
})

// dont change the function to arrow ecma style.
UserSchema.pre('save', async function(next){
	try{
		if(this.isNew){
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(this.password,salt)
			this.password = hashedPassword;
		}
		next();
	}catch(error){
		next(error)
	}

})

const User = db.model('user', UserSchema);

module.exports = User;