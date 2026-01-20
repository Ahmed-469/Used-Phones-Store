const router = require("express").Router()
const Phone = require('../models/Phone')

//read all
router.get('/', async(req,res)=>{
    try{
    const allPhones = await Phone.find();
    res.render('phones/all-phones.ejs',{allPhones: allPhones});
    }
    catch (error) {
        console.log('ERROR:', error);
    }
})

//create new phone
router.get('/create', async(req,res)=>{
    try{
        res.render('phones/create-phone.ejs')
    }
    catch (error) {
        console.log('ERROR:', error);
    }
})

router.post('/', async(req,res) => {
    try {
        const createdPhone = await Phone.create(req.body);
        res.redirect('/used-phones');
    }
    catch (error) {
        console.log('ERROR:', error);
    }
});


module.exports = router;