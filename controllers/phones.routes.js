const router = require("express").Router()
const Phone = require('../models/Phone')

router.get('/', async(req,res)=>{
    try{
    const allPhones = await Phone.find();
    res.render('phones/all-phones.ejs');
}
    catch (error) {
        console.log('ERROR:', error);
    }
})

module.exports = router;