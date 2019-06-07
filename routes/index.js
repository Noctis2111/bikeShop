var express = require('express');
var router = express.Router();

/* GET home page. */

var velos = 
        [{model:"QSTG",prix:750,image:"../images/bike-1.jpg",quantite:1},
        {model:"ZPTR",prix:800,image:"../images/bike-2.jpg",quantite:1},{model:"TMPK",prix:700,image:"../images/bike-3.jpg",quantite:1},{model:"LHSY",prix:650,image:"../images/bike-4.jpg",quantite:1},{model:"POPY",prix:900,image:"../images/bike-5.jpg",quantite:1},{model:"FRSO",prix:600,image:"../images/bike-6.jpg",quantite:1}]


// page d'acceuil du site bikeshop


router.get('/', function(req, res, next) {
    
    if (req.session.dataCardBike == undefined){
        req.session.dataCardBike = [];
    }
  res.render('testbike',{velos});
    
});


// ajout d'un produit dans le panier avec verification de si l'objet ajouter est deja dans le panier


router.post('/', function(req, res, next) {
    
    var mustbeUpdate = false;
    for (var i = 0; i < req.session.dataCardBike.length; i++){
        if (req.body.model == req.session.dataCardBike[i].model){
            mustbeUpdate = true;
            req.session.dataCardBike[i].quantite++;
        }
    }
    if (mustbeUpdate == false){
         req.session.dataCardBike.push(req.body)
    }   
  res.render('testbike',{velos});
    
});
/*router.get('/home-page', function(req, res, next) {
  res.render('testbike',{velos});
    
});*/

// page panier du site bikeshop


router.get('/shop', function(req, res, next) {
  res.render('shop', { dataCardBike:req.session.dataCardBike });
});


// mis a jour de la quantiter des produits dans la page panier 

router.post('/update-shop', function(req, res, next) {
   console.log(req.body);
    // le if permet de supprimer l'element si la quantite tombe a 0 
    if (req.body.quantite == 0) {
     req.session.dataCardBike.splice(req.body.position, 1);
   } else {
     req.session.dataCardBike[req.body.position].quantite = req.body.quantite;
   }
  res.render('shop', { dataCardBike:req.session.dataCardBike});
});


// supression d'un produit de la page panier 


router.get('/delete-shop', function(req, res, next) {
    req.session.dataCardBike.splice(req.query.position,1);
  res.render('shop', { dataCardBike: req.session.dataCardBike  });
});


module.exports = router;

