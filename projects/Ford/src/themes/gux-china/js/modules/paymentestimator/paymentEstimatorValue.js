/*
Author:                 Joel Wang
File name:              paymentEstimatorValue.js
Description:            payment estimator values
Dependencies:           angular.min.js  angular-route.min.js
Usage:                  China Payment Estimator project
*/
guxApp.paymentEstimator.value('appValue', {

    category:[],
    selectedNameplate:{},
    nameplates: {},
    modelDetail: {},
    selectedTerm:{},
    compareModels:[],
    inputNameplateID: '',
    inputModelID:'',
    currentModel:{},
    currentProgram:{},
    currentProduct:{},
    downPaymentInd:true,
    amountFinancedInd:true,
    priceInd:true,
    downPaymentMsg:'',
    amountFinancedMsg:'',
    priceMsg:'',
    downPayment:0,
    amountFinanced:0,
    price:0,
    startTime:0,
    editable:true,
    invalidData:false,
    mailbody:'',
    mailsender:'',
    pdfurl:'',
    errorPage:'',
    rootUrl:'',
    validParameters:true,
    dealerVersion:false,
    maxModelCompare:4,
    modelProducts:[
          {
            "name": "Equal",
            "type": 1,
            "currentTerm":{
                "monthlyPayment":-1,
                "term":""
            },
            "hasPackage":false,
            "currentPackage":{
                "price":0
            },
            "isModel":true
          },
          {
            "name": "50-50",
            "type": 2,
            "currentTerm":{
                "monthlyPayment":-1,
                "term":""
            },
            "hasPackage":false,
            "currentPackage":{
                "price":0
            },
            "isModel":true
          },
          {
            "name": "EW-Bundled",
            "type": 3,
            "currentTerm":{
               "monthlyPayment":-1,
                "term":""
            },
            "hasPackage":true,
            "currentPackage":{
                "price":-1
            },
            "isModel":true
          }          
        ],
    compareVisibility:false,
    carouselVisibility:false,
    fulfill:false
});
 