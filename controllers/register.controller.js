const User = require('../models/index');
const register = async(req,res,errors,next)=>{
	// here we will build a user using our mongoose db model
	try{
		if(!errors.isEmpty()){
			errors.array().forEach(error=>{
				req.flash('alert-danger', error.msg)
			})
			res.render('register',{fname: req.body.fname, lname: req.body.lname, username:req.body.username, password:req.body.password, passwordConfirmation: req.body.passwordConfirmation, email: req.body.email, messages: req.flash() });
			return;
		}
		const {email,username, password, passwordConfirmation} = req.body;
		usernameDoesExist = await User.findOne({username});
		emailDoesExist = await User.findOne({email});
		
		if(usernameDoesExist === 'true' || emailDoesExist === 'true'){
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