// business.route.js

const express = require('express');
const businessRoutes = express.Router();

// Require Business model in our routes module
let Business = require('../models/business.model');
let Cart=require('../models/cart.model')
let Bill=require('../models/bill.model')
let Invoice=require('../models/invoice.model')
let Drafts=require('../models/drafts.model')
let Draftstemp=require('../models/drafttemp.model')



let Orderingitems = require('../models/addorder.model');


// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

//cart add
businessRoutes.route('/cart').post(function (req, res) {
    let cart = new Cart(req.body);
    cart.save()
        .then(cart => {
            res.status(200).json({'cart': 'cart in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
// add drafts
businessRoutes.route('/drafts').post(function (req, res) {
    let drafts = new Drafts(req.body);
    drafts.save()
        .then(drafts => {
            res.status(200).json({'drafts': 'cart in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//invoice add
businessRoutes.route('/invoice').post(function (req, res) {
    let invoice = new Invoice(req.body);
   invoice.save()
        .then(cart => {
            res.status(200).json({'cart': 'cart in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});


//add ordering items
businessRoutes.route('/orderingitems').post(function (req, res) {
    let orderingitems = new Orderingitems(req.body);
    orderingitems.save()
        .then(orderingitems => {
            res.status(200).json({'items': 'items in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//add final payment
businessRoutes.route('/payment').post(function (req, res) {
    let bill = new Bill(req.body);
   bill.save()
        .then(bill => {
            res.status(200).json({'items': 'items in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//add drafts temp
businessRoutes.route('/draftstemp').post(function (req, res) {
    let draftstemp = new Draftstemp(req.body);
   draftstemp.save()
        .then(draftstemp => {
            res.status(200).json({'items': 'items in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});




// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
    Business.find(function(err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

//cart details
businessRoutes.route('/cart').get(function (req, res) {
    Cart.find(function(err, businesses){
        if(err){
            console.log(err);
        }
        else {
            res.json(businesses);
        }
    });
});


//invoice details

businessRoutes.route('/invoice').get(function (req, res) {
    Invoice.find(function(err, invoice){
        if(err){
            console.log(err);
        }
        else {
            res.json(invoice);
        }
    });
});

//invoice details by supplier

businessRoutes.route('/invoice/:sup').get(function (req, res) {
    Invoice.find({supplier:req.params.sup}, function(err, invoice){
        if(err){
            console.log(err);
        }
        else {
            res.json(invoice);
        }
    });
});

//invoice details by _id

businessRoutes.route('/invoiceid/:id').get(function (req, res) {
    Invoice.findOne({_id:req.params.id}, function(err, invoice){
        if(err){
            console.log(err);
        }
        else {
            res.json(invoice);
        }
    });
});



//draft details

businessRoutes.route('/drafts').get(function (req, res) {
    Drafts.find(function(err, drafts){
        if(err){
            console.log(err);
        }
        else {
            res.json(drafts);
            console.log(drafts)
        }
    });
});

//draft temp details

businessRoutes.route('/draftstemp').get(function (req, res) {
    Draftstemp.find(function(err, draftstemp){
        if(err){
            console.log(err);
        }
        else {
            res.json(draftstemp);
            console.log(draftstemp)
        }
    });
});


businessRoutes.route('/drafts/:gino').get(function (req, res) {
    Drafts.find({ino:req.params.gino},function(err, drafts){
        if(err){
            console.log(err);
        }
        else {
            res.json(drafts);
        }
    });
});


businessRoutes.route('/products/:pid').get(function (req, res) {
    Business.findOne({pid:req.params.pid},function(err, business){
        if(err){
            console.log(err);
        }
        else {
            res.json(business);
        }
    });
});


//cart search
businessRoutes.route('/cartsearch/:id').get(function (req, res) {
    let id = req.params.id;
    Cart.find({pname:id}, function (err, business){
        res.json(business);
    });
});

//cart search by _id
businessRoutes.route('/cartsearch_id/:id').get(function (req, res) {
    let id = req.params.id;
    Cart.findOne({_id:id}, function (err, business){
        res.json(business);
    });
});




//oredering search all

businessRoutes.route('/items').get(function (req, res) {
    Orderingitems.find(function(err, ordering){
        if(err){
            console.log(err);
        }
        else {
            res.json(ordering);
        }
    });
});



//final bill search all

businessRoutes.route('/bills').get(function (req, res) {
   Bill.find(function(err, bill){
        if(err){
            console.log(err);
        }
        else {
            res.json(bill);
        }
    });
});

//final bill by id

businessRoutes.route('/bill/:id').get(function (req, res) {
    Bill.findOne({_id:req.params.id},function(err, bill){
        if(err){
            console.log(err);
        }
        else {
            res.json(bill);
        }
    });
});

//drafts greater than 100000
businessRoutes.route('/drafts1/').get(function (req, res) {
    Drafts.find({total:{$lt:100000}},function(err, drafts){
        if(err){
            console.log(err);
        }
        else {
            res.json(drafts);
        }
    });
});




//cart update
businessRoutes.route('/cartupdate/:id').post(function (req, res) {
    Cart.findById(req.params.id, function(err, cart) {
        if (!cart)
            res.status(404).send("data is not found");
        else {
            cart.pid=req.body.pid;
            cart.pname = req.body.pname;
            cart.psprice=req.body.psprice;
            cart.pqty=req.body.pqty;
            cart.pcategory=req.body.pcategory;
           cart.description=req.body.description
           cart.supplier=req.body.supplier

           cart.save().then(cart => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

//qty update

businessRoutes.route('/qtyupdate/:id/:qty').post(function (req, res) {
 
    Business.updateMany({pid:req.params.id},{$set:{pqty:req.params.qty}},{multi:true}, function (err, Business){
        res.json(Business);
     });
});

businessRoutes.route('/statusupdate/:gid/:gstatus').post(function (req, res) {
 
    Invoice.updateMany({_id:req.params.gid},{$set:{status:req.params.gstatus}},{multi:true}, function (err, Business){
        res.json(Business);
     });
});


//payment completing with personal details



//cart delete

businessRoutes.route('/cartdelete/:id').get(function (req, res) {
    Cart.findByIdAndRemove({_id: req.params.id}, function(err, car){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

//drafts delete 

businessRoutes.route('/draftdelete/:id11').get(function (req, res) {
    Drafts.deleteMany({ino: req.params.id11}, function(err, draft){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

//




// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findOne({_id:id}, function (err, business){
      res.json(business);
  });
});


businessRoutes.route('/validate/:id').get(function (req, res) {
    let id = req.params.id;
    Business.findOne({pid:id}, function (err, business){
        res.json(business);
    });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      res.status(404).send("data is not found");
    else {
        business.pid=req.body.pid;
        business.pname = req.body.pname;
        business.pbprice=req.body.pbprice;
        business.psprice=req.body.psprice;
        business.pqty=req.body.pqty;
        business.pcategory=req.body.pcategory;
        business.description=req.body.description,
        business.supplier=req.body.supplier

        business.save().then(business => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

//delete purchased orders
businessRoutes.route('/pdelete/:id').get(function (req, res) {
    Invoice.findByIdAndRemove({_id: req.params.id}, function(err, invoice){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});



//delete previous items
businessRoutes.route('/deleteitems/').get(function (req, res) {
    Orderingitems.deleteMany({}, function(err, items){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


//delete selected items in approvals

businessRoutes.route('/deleteitemso/:id').get(function (req, res) {
    Bill.findByIdAndRemove({_id:req.params.id}, function(err, orderingitems){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

//product search
businessRoutes.route('/search/:id').get(function (req, res) {
    let id = req.params.id;
    Business.find({pname:id}, function (err, business){
        res.json(business);
    });
});

businessRoutes.route('/filter/:id').get(function (req, res) {
    let id = req.params.id;
    Business.findById(id, function (err, business){
        res.json(business);
    });
});

module.exports = businessRoutes;
