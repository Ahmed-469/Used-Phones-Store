const router = require("express").Router()
const Phone = require('../models/Phone')

//read all
router.get('/', async(req,res)=>{
    try{
    const allPhones = await Phone.find();
    res.render('phones/all-phones.ejs',{allPhones: allPhones});
    console.log('app is working (READ ALL PHONES)');
    }
    catch (error) {
        console.log('ERROR:', error);
    }
})

//create new phone
router.get('/create', async(req,res)=>{
    res.render('phones/create-phone.ejs');
})

router.post('/', async(req,res) => {
    try {
        if(req.body.available){
            req.body.available = true;
        }
        else{
            req.body.available = false;
        }
        const createdPhone = await Phone.create(req.body);
        res.redirect('/used-phones');
        console.log('app is working (CREATE)');
    }
    catch (error) {
        console.log('ERROR:', error);
    }
});

//delete
router.post('/delete/:id', async (req, res) => {
    try {
        await Phone.findByIdAndDelete(req.params.id);
        res.redirect('/used-phones');
        console.log('app is working (DELETE)');
    }
    catch (error) {
        console.log('ERROR:', error);
    }
});

module.exports = router;