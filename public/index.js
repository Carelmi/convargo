'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false,
    'deductibleamount': 0
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0

  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true,
    'deductibleamount': 0
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true,
    'deductibleamount': 0
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',

  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

//first step
function GetInfo(truckerId){
  for(var i=0; i<truckers.length; i++){
    if(truckerId==truckers[i].id){
      return [truckers[i].pricePerKm, truckers[i].pricePerVolume];
    }
  }
}



function SetPrice(delivery){
      var infos= GetInfo(delivery.truckerId)
      delivery.price= infos[0]*delivery.distance +infos[1]*delivery.volume;
      if(delivery.volume>=5 && delivery.volume<10){
        delivery.price=infos[0]*delivery.distance +infos[1]*0.9*delivery.volume;
      }
      else if(delivery.volume>=10 && delivery.volume<25) {
        delivery.price=infos[0]*delivery.distance +infos[1]*0.7*delivery.volume;
      }
      else if(delivery.volume>=25 ){
        delivery.price=infos[0]*delivery.distance +infos[1]*0.5*delivery.volume;
      }
      else {
         delivery.price= infos[0]*delivery.distance +infos[1]*delivery.volume;
      }
    }



//third step
function SetComission(delivery){
    var commission=delivery.price*30/100;
        delivery.commission.insurance=commission/2;
        var distKm= delivery.distance;
        while(distKm>0){
           delivery.commission.treasury= delivery.commission.treasury+1;
           distKm=distKm-500;
        }

        delivery.commission.convargo= commission - delivery.commission.insurance - delivery.commission.treasury;
    }



//fourth step
function UpdateOption(delivery){
   if(delivery.options.deductibleReduction==true){
       delivery.options.deductibleamount=200
       delivery.price= delivery.price+delivery.volume;
       delivery.commission.convargo= delivery.commission.convargo+delivery.volume;
      }
     else{
        delivery.options.deductibleamount=1000


       }

   }



//fifith step
function UpdateBill(delivery){
    for(var i=0; i<actors.length; i++){
      if(delivery.id==actors[i].deliveryId){
        for(var j=0; j<actors[i].payment.length; j++){
          if(actors[i].payment[j].who=="shipper"){
              actors[i].payment[j].amount=delivery.price;
          }
          else if(actors[i].payment[j].who=="trucker"){
               actors[i].payment[j].amount=delivery.price-0.3*delivery.price;
          }
          else if(actors[i].payment[j].who=="insurance"){
            actors[i].payment[j].amount=delivery.commission.insurance;

          }
          else if(actors[i].payment[j].who=="treasury"){
            actors[i].payment[j].amount=delivery.commission.treasury;

          }
          else if(actors[i].payment[j].who=="convargo"){
            actors[i].payment[j].amount=delivery.commission.convargo;

          }
        }
      }
    }
}





for( var i=0; i<deliveries.length; i++){
  SetPrice(deliveries[i]);
  SetComission(deliveries[i]);
  UpdateOption(deliveries[i]);
  UpdateBill(deliveries[i]);
}

console.log(truckers);
console.log(deliveries);
console.log(actors);
