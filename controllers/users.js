const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = catchAsync(async (req, res) => {
    try
    {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.logIn(registeredUser, error => {
            if (error) {
                return next(error)
            }
            else
            {
                req.flash('success','Bienvenido a la app');
                res.redirect('/products'); 
            }
        })
          
    }
    catch (e)
    {
        req.flash('error',e.message);
        res.redirect('/register');   
    }
})

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.logout = (req, res) => {
    
    req.logOut();
    req.flash('success','Adiooooos :)')
    res.redirect('/products');
}

module.exports.login = (req, res) => {

    req.flash('success', 'Bienvenido')
    const redirectUrl = req.session.returnTo || '/products';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}