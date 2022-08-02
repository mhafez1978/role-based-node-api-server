const User = require('../models/index');
const register = async(req,res,next)=>{
	// here we will build a user using our mongoose db model
	try{
		const {email,username, password, passwordConfirmation} = req.body;

		usernameDoesExist = await User.findOne({username});
		emailDoesExist = await User.findOne({email});

		if(password !== passwordConfirmation){
			console.log('passwords do not match');
			res.redirect('/auth/register')
			return
		}
		
		if(usernameDoesExist === 'true' ||emailDoesExist === 'true'){
			res.redirect('/auth/login')
			return
		}else{
			const user = new User(req.body)
			await user.save();
			res.send(user)
		}
	}catch(error){
		next(error)
	}
	
}
module.exports = register;