const router = require("express").Router()
const Phone = require('../models/Phone')
const isSeller = require('../middleware/is-seller');

//show all used phones
router.get('/', async(req,res)=>{
    try{
    const allPhones = await Phone.find();
    res.render('phones/all-phones.ejs',{allPhones: allPhones});
    }
    catch (error) {
        console.log('ERROR:', error);
    }
});

//create new used phone
router.get('/create', async(req,res)=>{
    if(req.session.user.role === 'buyer'){
        return res.send("Buyers cannot add used phones.");
    }
    res.render('phones/create-phone.ejs');
})

router.post('/', isSeller, async(req,res) => {
    try {
        if(req.body.available){
            req.body.available = true;
        }
        else{
            req.body.available = false;
        }
        if (req.session.user) {
            req.body.seller = req.session.user._id;
        }
        const createdPhone = await Phone.create(req.body);
        res.redirect('/used-phones');
    }
    catch (error) {
        console.log('ERROR:', error);
    }
});

// Update used phone
router.get('/update/:id', async(req,res)=>{
    try {
        const foundPhone = await Phone.findById(req.params.id);
        res.render('phones/update-phone.ejs',{foundPhone: foundPhone});
    }
    catch (error) {
        console.log('ERROR:', error);
    }
})

router.post('/update/:id', isSeller, async (req,res)=>{
    try {
        const foundPhone = await Phone.findById(req.params.id);
        if (!foundPhone.seller.equals(req.session.user._id)) {
            return;
        }
        if(req.body.available){
            req.body.available = true;
        }
        else{
            req.body.available = false;
        }
    const updatedPhone = await Phone.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/used-phones');
    }
    catch (error) {
        console.log('ERROR:', error);
    }
});

//read one
router.get('/:id', async (req, res) =>{
    try {
        const foundPhone = await Phone.findById(req.params.id).populate('seller');
        res.render('phones/show-phone.ejs', {foundPhone: foundPhone});
    }
    catch (error) {
        console.log('ERROR:', error);
    }
});

//delete used phone
router.post('/delete/:id', isSeller, async (req, res) => {
    try {
        const foundPhone = await Phone.findById(req.params.id);
        if (!foundPhone.seller.equals(req.session.user._id)) {
            return;
        }
        await Phone.findByIdAndDelete(req.params.id);
        res.redirect('/used-phones');
    }
    catch (error) {
        console.log('ERROR:', error);
    }
});

module.exports = router;