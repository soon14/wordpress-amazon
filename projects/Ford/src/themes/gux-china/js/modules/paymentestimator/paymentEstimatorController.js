/*
Author:                 Joel Wang
File name:              paymentEstimatorController.js
Description:            payment estimator controllers
Dependencies:           angular.min.js  angular-route.min.js
Usage:                  China Payment Estimator project
*/
//controller for root url , call nameplate service , render namplate and showroom template
guxApp.paymentEstimator.controller('nameplateController',
        ['$scope','$location','routeConstants', 'webAPI', 'appValue', '$rootScope',
        function ($scope,$location,routeConstants, webAPI, appValue , $rootScope) {
            //show loading icon and hide nameplate template
            $scope.$emit('getnameplateStarted');
            //initial scope variable
            $scope.appValue = appValue;
            appValue.mailbody=FCC.configJSON.email?FCC.configJSON.email.body?FCC.configJSON.email.body:appValue.mailbody:appValue.mailbody;
            appValue.mailsender=FCC.configJSON.email?FCC.configJSON.email.sender?FCC.configJSON.email.sender:appValue.mailsender:appValue.mailsender;
            appValue.pdfurl=FCC.configJSON.email?FCC.configJSON.email.pdf?FCC.configJSON.email.pdf.indexOf('?')>0?FCC.configJSON.email.pdf.substring(0,FCC.configJSON.email.pdf.indexOf('?')):FCC.configJSON.email.pdf:appValue.pdfurl:appValue.pdfurl;
            appValue.startTime= new  Date().getTime();
            appValue.dealerVersion=FCC.configJSON.dealerVersion?true:false;
            appValue.maxModelCompare=FCC.configJSON.maxModelCompare?FCC.configJSON.maxModelCompare:appValue.maxModelCompare;
            //local variable
            var nid,aid,nidValid=false,aidValid=false;
            //initial price format options
            guxApp.priceFormatter.initialise({
                  data: FCC.configJSON.priceFormat,
                  formatString:  FCC.configJSON.currencySymbol,
                  centsSeparator: FCC.configJSON.monetaryDecimalSeparator,
                  thousandsSeparator: FCC.configJSON.groupingSeparator
                });

            //validate config json
            if(!FCC.commonConfig||!FCC.commonConfig.site||!FCC.restInfo||!FCC.restInfo["pet.nameplateUrl"]||!FCC.restInfo["pet.modelUrl"]) return;
            
            //call nameplate service           
            webAPI.getNameplates().then(function (nameplates) {
              //validate nameplate json
              if (!validateNameplate(appValue.nameplates)) return;
              //set the first model of the first nameplate as default to display
              appValue.selectedNameplate=appValue.nameplates.nameplates[0]; 
              appValue.currentModel=appValue.selectedNameplate.models[0];
              //validate pamaters of url
              if (!validateURL(appValue.nameplates)) {
                //redirect to error page for specified invalid nameplate nad model
                appValue.inputNameplateID=appValue.inputModelID='';
                $location.path(routeConstants.errorpage.path).replace();
              }
              else {
                //collect category of all nameplates to render mini showroom
                $.each(appValue.nameplates.nameplates,function(i, value) {
                        if($.inArray(value.category,appValue.category)<0) appValue.category.push(value.category);
                });
                //redirect to model page
                $scope.$emit('getnameplateFinished');
                nid=appValue.selectedNameplate.vehicleParentId;                        
                aid=appValue.currentModel.vehicleAssetId;
                $location.path(routeConstants.model.path).search({nameplate:nid,model:aid}).replace();
                $scope.$emit('getmodelStarted');

              }
              
            });
            //validate nameplate json and format it
            validateNameplate = function(nameplate) {
              var result = true,invalidNode = [];
              if (!nameplate.nameplates||nameplate.nameplates.length==0) {
                //validate json
                  result = false;
              }
              else {
                //format json
                  $.each(nameplate.nameplates,function(i,value){
                    if (!value.models||value.models.length==0) {
                      //record invalid nameplate node
                     invalidNode.push(i);
                    }
                    else {
                      //format price for for not cached json
                      $.each(value.models,function(j,model){
                        model.price=model.price?isNaN(model.price)?model.price:guxApp.priceFormatter.format(model.price):0;
                      }); 
                    } 
                  }); 
                   //remove invalid nameplate node
                  invalidNode.sort(function(a,b){
                    return b - a;
                  });
                  $.each(invalidNode,function(i,value){
                    nameplate.nameplates.splice(value,1);
                  });
              }             
              return result;
            };
            //validate parameters of url
            validateURL = function(nameplate) {
              result = false;
              if (!appValue.inputNameplateID&&!appValue.inputModelID) {
              //no parameters in url
                result = true;
              }
              else {
                $.each(nameplate.nameplates,function(i,value){
                  if(appValue.inputNameplateID&&value.vehicleParentId==appValue.inputNameplateID) {
                    //have valid nameplate id 
                    appValue.selectedNameplate=value;
                    appValue.currentModel=appValue.selectedNameplate.models[0];
                    if(!appValue.inputModelID) {
                    //no model id, select first model and continue
                      result = true;
                    }
                    else {
                    //both id exist
                      $.each(value.models,function(i,model){
                        if(model.vehicleAssetId==appValue.inputModelID) {
                          appValue.currentModel=model;
                          result = true;
                        }
                      });
                    }                    
                  }
                });
              }              
              return result;
            };
        }]);
//controller for error page
guxApp.paymentEstimator.controller('errorController',
        ['$scope','$location','appValue',
        function ($scope,$location,appValue) {
            $scope.appValue = appValue;
            appValue.errorPage=FCC.configJSON.errorMessage?FCC.configJSON.errorMessage.errorPage?FCC.configJSON.errorMessage.errorPage:appValue.errorPage:appValue.errorPage;
            appValue.rootUrl=$location.$$absUrl.replace($location.$$url,"");
        }]);
//controller for model url
guxApp.paymentEstimator.controller('modelController',
        ['$scope','$location','routeConstants', 'webAPI', 'formulaAPI', 'appValue', '$rootScope','$timeout',
        function ($scope,$location,routeConstants, webAPI, formulaAPI, appValue , $rootScope , $timeout) {
              $scope.appValue = appValue;
              var nid,aid;
              appValue.inputNameplateID=$location.search().nameplate;
              appValue.inputModelID=$location.search().model;

              if ($.isEmptyObject(appValue.selectedNameplate)||$.isEmptyObject(appValue.currentModel)) {
                //visit by typed url , redirect to home page
                $location.path(routeConstants.home.path).replace();
              }
              else if (appValue.selectedNameplate.vehicleParentId!==appValue.inputNameplateID || appValue.currentModel.vehicleAssetId!==appValue.inputModelID){
                //vist by modified url, redirect to home page for validtion check
                $location.path(routeConstants.home.path).replace();
              }
              else {
                //visit by selected model in drop down list or redirected from home page
                webAPI.getModel(appValue.currentModel).then( function(modelDetail) {
                      //validate model json
                      if (!validateModel()) {
                        //remove model from model drop down list and redirect to home page
                        $.each(appValue.selectedNameplate.models,function(i,value){
                          if (value.vehicleAssetId==appValue.currentModel.vehicleAssetId) {
                            appValue.selectedNameplate.models.splice(i,1);
                            return false;
                          } 
                        });
                        appValue.inputNameplateID=appValue.inputModelID='';
                        $location.path(routeConstants.home.path).replace();
                      }
                      else {
                        setPreserve();
                        $scope.changeProgram();
                      }
                      
                      
                  });
                



              }

              setPreserve = function() {
                //parameters for preserve module
                appValue.mailbody=FCC.configJSON.email?FCC.configJSON.email.body?FCC.configJSON.email.body:appValue.mailbody:appValue.mailbody;
				appValue.pdfurl=FCC.configJSON.email?FCC.configJSON.email.pdf?FCC.configJSON.email.pdf.indexOf('?')>0?FCC.configJSON.email.pdf.substring(0,FCC.configJSON.email.pdf.indexOf('?')):FCC.configJSON.email.pdf:appValue.pdfurl:appValue.pdfurl;
				appValue.mailbody=appValue.mailbody.replace('{year}', appValue.selectedNameplate.year+' ' ).replace('{model}', appValue.selectedNameplate.name+' ' ).replace('{derivative}',appValue.currentModel.name+' ' ); 
                appValue.pdfurl=location.origin + appValue.pdfurl;      

              }
              validateModel = function() {
                var result = true;
                if (!appValue.modelDetail.model||$.isEmptyObject(appValue.modelDetail.model)||!appValue.modelDetail.model.programs) 
                  {
                    result=false;
                  }
                  else {
                    //comumer version only display standard and time limited program
                    $.each(appValue.modelDetail.model.programs,function(i,value){
                      if (!appValue.dealerVersion&&value.type&&FCC.configJSON.dealerProgram&&value.type==FCC.configJSON.dealerProgram) {
                        appValue.modelDetail.model.programs.splice(i,1);
                        return false;
                      };
                    });
                  }
                
                //if there is no programs under model, validation failed
                if (appValue.modelDetail.model.programs.length==0) result = false;
                return result;
              };
              fillModelProduct = function(program) {
                  flags=[false,false,false];
                  //fulfill products
                  $.each(program.products,function(j,product){
                    $.each(appValue.modelProducts,function(k,modelProduct){
                      flags[k]=product.type==modelProduct.type?true:flags[k];
                    });
                  });
                  $.each(flags,function(j,value){
                    if( FCC.configJSON.products)
                    $.each(FCC.configJSON.products,function(k,product){
                      if (appValue.modelProducts.type==product.type) appValue.modelProducts.name=product.name;
                    });                        
                    //change product type name if exist in config

                    if (!value) program.products.push(appValue.modelProducts[j]);
                    //fill in model product
                  });
              };
              $scope.changeProgram = function(program) {
                var flags;
                initValidationValue();
                if(typeof(program) ==="undefined") {
                //first time call or changed model
                  appValue.currentProgram=appValue.modelDetail.model.programs[0];
                  appValue.price=removeFormat(appValue.currentModel.price);                  
                  appValue.invalidData=(appValue.price<=(FCC.configJSON.minFinancedAmount||40000)*100/(100-FCC.configJSON.minDownpaymentPercent||20)||appValue.price!==appValue.modelDetail.model.price)?true:false;
                  //sort product by product order in config
                  $.each(appValue.modelDetail.model.programs,function(i,program){
                    if(appValue.fulfill) fillModelProduct(program);
                    sortProducts(program);
                  });
                  //select first product by default and set editable property based on price and product type
                  setEditable();
                  $scope.changeProduct();      

                  //onload get the currentProduct model
                  appValue.downPayment = removeFormat(appValue.currentProduct.downPayment);
                  appValue.amountFinanced = removeFormat(appValue.currentProduct.amountFinanced); 
                }
                else {
                //changed program
                    //nothing to do if no change
                    if (program==appValue.currentProgram) return;
                    //hide carousel and change program
                    appValue.carouselVisibility=true;
                    // appValue.currentProgram={};
                    appValue.currentProgram=program;
                    appValue.currentProduct={};
                    if(program.products&&program.products.length>0) {
                      setEditable();
                      resetSlider();
                    }
                    //show carousel
                    $timeout(function () {
                        appValue.carouselVisibility=false;
                    },100);
                }
              };
              //calcuation based on program level
              calculate = function(program,downPayment) {
                if(appValue.invalidData) {
                    setInvalidMP(program);
                }
                else {
                    $.each(program.products,function(i,product){
                      if(!product.isModel) {
                        //if downpayment inputted means it is program level calcuation
                        if(typeof(downPayment)!=="undefined") product.downPayment=(product.type!=(FCC.configJSON.FFProductType||2))?Math.ceil(removeFormat(downPayment)):Math.ceil(removeFormat(product.downPayment));  
                        product.downpaymentPercent = ( appValue.price == 0 )? 0 : Math.floor(100 * product.downPayment / appValue.price);
                        product.amountFinanced =  appValue.price - product.downPayment;
                        $.each(product.terms,function(i,term){
                          if (product.type != (FCC.configJSON.FFProductType||2) ) {
                            //Equal EW-Bundled product
                            formulaAPI.formulaEEB(program,product,term);    
                          }
                          else {
                            //50-50 product
                            formulaAPI.formulaHH(program,product,term);  
                          }        
                        });                
                        product.downPayment=guxApp.priceFormatter.format(product.downPayment);
                        product.amountFinanced=guxApp.priceFormatter.format(product.amountFinanced);
                      }

                    });
                }
                
              };
              validateProgram = function(program) {
                var result=true;
                //invalid node if no products
                if (!program.products||program.products.length==0) {
                  result = false;
                }
                else {
                  //format term node because calcuation is in term level
                  $.each(program.products,function(i,product){
                    if (!product.isModel) {
                            //process non-model product
                              product.hasPackage=false;
                              product.currentPackage = {};
                              product.currentPackage.name = "";
                              product.termList = [];
                              if (product.terms&&product.terms.length>0) {
                                //set downpayment based on config value
                                  if (product.type!==(FCC.configJSON.FFProductType||2)) {
                                    //Equal and EW-Bundled product
                                    product.downpaymentPercent=(FCC.configJSON.minEEBDownpaymentPercent||20);
                                    product.downPayment = Math.ceil(appValue.price * product.downpaymentPercent/100);
                                  }
                                  else {
                                    //50-50 product
                                    product.downPayment = Math.ceil(appValue.price - appValue.price*(FCC.configJSON.minFFDownpaymentPercent||50)/(1+product.terms[0].customerRate/100)/100);
                                    product.downpaymentPercent= Math.floor(100*product.downPayment/appValue.price);
                                    
                                  }
                                //set default term and term list  
                                  product.currentTerm=product.terms[0];
                                  $scope.selectTerm(product.currentTerm.term,product);
                                  //fulfill term list
                                  $.each(product.terms,function(k,term) {                                    
                                    if($.inArray(term.term,product.termList)<0) product.termList.push(term.term);
                                    //reset to default term
                                    if(term.isDefault) $scope.selectTerm(term.term,product);

                                  });
                                  product.termList.sort();
                                }
                            }
                  });
                }
                return result;
              }
              $scope.changeProduct = function(product) {               
                if(typeof(product) ==="undefined") {
                //first time call or changed model or price changed, re-calculate payment for all products
                  $.each(appValue.modelDetail.model.programs,function(i,program){
                    if (validateProgram(program)) calculate(program);
                  });                  
                  resetSlider();
                  $scope.$emit('getmodelFinished');
                }
                else {
                //selected a product
                  //if product not changed or a model product selected, do nothing
                  if (product==appValue.currentProduct||!!product.isModel) return;
                  //initialize if invalid number before product change
                  if (!appValue.downPaymentInd||!appValue.amountFinancedInd) {
                    initValidationValue();
                    appValue.currentProduct.downpaymentPercent=FCC.configJSON.minDownpaymentPercent||20;
                    $scope.changeDownpaymentPercent();                
                  };
                //switch product
                  appValue.currentProduct=product;
                  setEditable(product);
                  resetSlider();
                }               
              };
              $scope.selectTerm = function(term,product) {
                product.packageList=[];
                product.hasPackage = false;
                product.currentPackage = {"id":0,"name":"","price":-1};
                product.currentTerm={};
                //fulfill package
                $.each(product.terms,function(i,value) {
                  if (value.term==term && value.ewPackage) {
                    product.packageList.push(value.ewPackage);
                  } 
                });
                if (product.packageList&&product.packageList.length>0) {
                  product.hasPackage = true;
                  product.currentPackage = product.packageList[0];
                }
                //change term
                $.each(product.terms,function(i,value){
                  if(product.hasPackage) {
                    if(value.term==term && value.ewPackage && value.ewPackage.id==product.currentPackage.id) {
                      product.currentTerm=value;
                    }
                  }
                  else {
                    if(value.term==term) product.currentTerm=value;
                  }
                });
              };
              $scope.selectPackage = function(ewpackage,product) {
                product.currentPackage=ewpackage;
                $.each(product.terms,function(i,value){
                  if(value.term==product.currentTerm.term && value.ewPackage && value.ewPackage.id==ewpackage.id) {
                    product.currentTerm=value;
                  }
                })
              }
              $scope.changeDownpaymentPercent = function(){
                //no error message on slider move event
                initValidationValue();                
                appValue.currentProduct.downPayment=Math.ceil(appValue.price * appValue.currentProduct.downpaymentPercent / 100);
                appValue.currentProduct.amountFinanced = appValue.price - appValue.currentProduct.downPayment;
                validatePercent();
                calculate(appValue.currentProgram,appValue.currentProduct.downPayment);
                appValue.downPayment = removeFormat(appValue.currentProduct.downPayment);
                  appValue.amountFinanced = removeFormat(appValue.currentProduct.amountFinanced); 

               resetSlider(); 
              };
              $scope.changePrice = function() {
                initValidationValue(); 
                validatePrice();
                if(appValue.priceInd)  {
                  appValue.price = removeFormat(appValue.currentModel.price);
                  setEditable();
                  $scope.changeProduct();
                }
                else {
                  setInvalidMP(appValue.currentProgram);
                };
                resetSlider(); 
              }
              
              $scope.changeDownPayment = function(){
                initValidationValue(); 
                validateDP();
                if(appValue.downPaymentInd)  {
                  calculate(appValue.currentProgram,appValue.currentProduct.downPayment);
                  appValue.currentProduct.downPayment=removeFormat(appValue.currentProduct.downPayment);
                  appValue.downPayment = appValue.currentProduct.downPayment;
                }
                else {
                  setInvalidMP(appValue.currentProgram);
                };
                resetSlider(); 
              };
              $scope.onFocusDownPayment=function(){
                //remove format 
                if (appValue.downPaymentInd) {
                  appValue.downPayment = removeFormat(appValue.currentProduct.downPayment);
                  appValue.amountFinanced = removeFormat(appValue.currentProduct.amountFinanced);
                }
                // appValue.currentProduct.downPayment = '';
                appValue.currentProduct.downPayment = removeFormat(appValue.currentProduct.downPayment);
              };
              $scope.onFocusPrice=function(){
                //remove format 
                if (appValue.priceInd) {
                  appValue.price = removeFormat(appValue.currentModel.price);
                }
                // appValue.currentModel.price = '';
                appValue.currentModel.price = removeFormat(appValue.currentModel.price);
              };
              $scope.onBlurDownPayment=function(){
                if (appValue.currentProduct.downPayment == '' || !appValue.downPaymentInd ) {
                  appValue.currentProduct.downPayment = guxApp.priceFormatter.format(appValue.downPayment);
                  appValue.currentProduct.amountFinanced = guxApp.priceFormatter.format(appValue.amountFinanced);
                  calculate(appValue.currentProgram,appValue.currentProduct.downPayment);
                  initValidationValue();
                  resetSlider(); 
                }
                else {
                  //add format
                  appValue.currentProduct.downPayment=guxApp.priceFormatter.format(appValue.currentProduct.downPayment);
                }
              };
               $scope.onBlurPrice=function(){
                if (appValue.currentModel.price == '' || !appValue.priceInd ) {
                    appValue.currentModel.price = guxApp.priceFormatter.format(appValue.price);
                    calculate(appValue.currentProgram,appValue.downPayment);
                    initValidationValue();
                    resetSlider(); 
                }
                else {
                  //add format
                  appValue.currentModel.price=guxApp.priceFormatter.format(appValue.currentModel.price);
                }
              };              
              $scope.changeAmountFinanced = function(){
                initValidationValue();  
                validateAF();
                if(appValue.amountFinancedInd)  {
                  calculate(appValue.currentProgram,appValue.currentProduct.downPayment);
                  appValue.currentProduct.amountFinanced=removeFormat(appValue.currentProduct.amountFinanced);
                  appValue.amountFinanced = appValue.currentProduct.amountFinanced;
                }
                else {
                  setInvalidMP(appValue.currentProgram);
                };
                resetSlider(); 
              };
              $scope.onFocusAmountFinanced=function(){
                //remove format
                if (appValue.amountFinancedInd) 
                  {
                    appValue.downPayment = removeFormat(appValue.currentProduct.downPayment);
                    appValue.amountFinanced = removeFormat(appValue.currentProduct.amountFinanced);
                  }
                // appValue.currentProduct.amountFinanced = '';
                appValue.currentProduct.amountFinanced = removeFormat(appValue.currentProduct.amountFinanced);
              };
              $scope.onBlurAmountFinanced=function(){
                if (appValue.currentProduct.amountFinanced == '' || !appValue.amountFinancedInd ) {
                  appValue.currentProduct.downPayment = guxApp.priceFormatter.format(appValue.downPayment);
                  appValue.currentProduct.amountFinanced = guxApp.priceFormatter.format(appValue.amountFinanced);
                  calculate(appValue.currentProgram,appValue.currentProduct.downPayment);
                  initValidationValue();
                  resetSlider(); 
                }
                else {
                  //add format
                  appValue.currentProduct.amountFinanced=guxApp.priceFormatter.format(appValue.currentProduct.amountFinanced);
                }
              };
              sortProducts = function(program) {
                //sort products
                    program.products.sort(function(a,b){
                      return b.type - a.type;
                    });
                    if(FCC.configJSON.products&&FCC.configJSON.products.length>0) {
                      prd={},sp=0;
                      $.each(FCC.configJSON.products,function(j,value){
                        $.each(program.products,function(k,product){
                          if(value.type==product.type) {
                            if(sp==k) {
                              sp++;
                              return;
                            }
                            else {
                              prd=program.products[sp];
                              program.products[sp]=program.products[k];
                              program.products[k]=prd;
                              sp++;
                            }
                          }
                        })
                      })
                    }
                  };
              setEditable = function(product) {
                if(typeof(product)=="undefined") {
                  //select first product by default
                  $.each(appValue.currentProgram.products,function(i,value){
                    //select first non-model product
                    if (!value.isModel) {
                      appValue.currentProduct=value;
                      return false;
                    }
                  });
                }
                else {
                  appValue.currentProduct=product;
                }
                  appValue.invalidData = appValue.invalidData||appValue.price<(FCC.configJSON.minFinancedAmount||40000)*100/(100-FCC.configJSON.minDownpaymentPercent||20);
                  appValue.downPayment = !!appValue.currentProduct.downPayment ? removeFormat(appValue.currentProduct.downPayment) : 0;
                  appValue.amountFinanced = !!appValue.currentProduct.amountFinanced ? removeFormat(appValue.currentProduct.amountFinanced) : 0;
                  //disable edit price button if price is not valid
                  if(!appValue.invalidData&&appValue.currentProduct.type&&appValue.currentProduct.type!=FCC.configJSON.FFProductType&&!appValue.currentProduct.isModel) {
                          //editable for valid product or none 50-50 product
                          appValue.editable=true;
                        }
                        else {
                          appValue.editable=false;
                        }
              };
              validatePercent = function() {                
                if(appValue.currentProduct.downpaymentPercent < FCC.configJSON.minDownpaymentPercent) {
                appValue.currentProduct.downpaymentPercent = FCC.configJSON.minDownpaymentPercent;
                appValue.currentProduct.downPayment = Math.ceil(appValue.price * appValue.currentProduct.downpaymentPercent / 100);
                appValue.currentProduct.amountFinanced =appValue.price - appValue.currentProduct.downPayment;
                };
                if(appValue.currentProduct.amountFinanced < FCC.configJSON.minFinancedAmount) {
                appValue.currentProduct.amountFinanced = FCC.configJSON.minFinancedAmount;
                appValue.currentProduct.downPayment = appValue.price - appValue.currentProduct.amountFinanced;
                appValue.currentProduct.downpaymentPercent = Math.ceil(100 * (appValue.price - appValue.currentProduct.amountFinanced) / appValue.price);
                };
              };
              validatePrice = function() {
                if(appValue.currentModel.price.search(/[^0-9,]/)>-1)  {
                  //only number allowed 
                  appValue.priceInd=false;
                  appValue.priceMsg=FCC.configJSON.errorMessage.illegalCharacter;  
                }
                else {
                  if (appValue.currentModel.price<appValue.modelDetail.model.price*0.5 || appValue.currentModel.price>appValue.modelDetail.model.price*1.5) {
                    appValue.priceInd=false;
                    appValue.priceMsg=FCC.configJSON.errorMessage.outofPriceScope;
                  }
                }
              };
              validateDP = function() {

                if(appValue.currentProduct.downPayment.search(/[^0-9,]/)>-1)  {
                  //only number allowed 
                  appValue.downPaymentInd=false;
                  appValue.downPaymentMsg=FCC.configJSON.errorMessage.illegalCharacter;  
                }
                else {
                  //calculate financed amount and percent
                  appValue.currentProduct.amountFinanced = appValue.price - removeFormat(appValue.currentProduct.downPayment);
                  appValue.currentProduct.downpaymentPercent = Math.floor(100  * removeFormat(appValue.currentProduct.downPayment) / appValue.price);
                  if(appValue.currentProduct.downpaymentPercent < FCC.configJSON.minDownpaymentPercent) {
                  //lower than min percent
                  appValue.downPaymentInd = false;
                  appValue.downPaymentMsg = FCC.configJSON.errorMessage.minDownpaymentPercent.replace(":value",FCC.configJSON.minDownpaymentPercent);
                  appValue.currentProduct.downpaymentPercent=FCC.configJSON.minDownpaymentPercent;
                  appValue.currentProduct.amountFinanced = Math.floor(appValue.price*(100-FCC.configJSON.minDownpaymentPercent)/100);
                  };
                  if (appValue.currentProduct.amountFinanced < FCC.configJSON.minFinancedAmount) {
				  appValue.downPaymentInd = false;
                  appValue.downPaymentMsg = FCC.configJSON.errorMessage.minFinancedAmount.replace(":value", guxApp.priceFormatter.format(FCC.configJSON.minFinancedAmount));
                  appValue.currentProduct.amountFinanced = FCC.configJSON.minFinancedAmount;
                  appValue.currentProduct.downpaymentPercent = Math.floor(100*(appValue.price-appValue.currentProduct.amountFinanced)/appValue.price);
                  }
                }  
              };
              validateAF = function() {
                if(appValue.currentProduct.amountFinanced.search(/[^0-9,]/)>-1)  {
                  appValue.amountFinancedInd=false;
                  appValue.amountFinancedMsg=FCC.configJSON.errorMessage.illegalCharacter;
                }
                else {
                  appValue.currentProduct.downPayment = appValue.price - removeFormat(appValue.currentProduct.amountFinanced);
                  appValue.currentProduct.downpaymentPercent = Math.floor( 100 * appValue.currentProduct.downPayment/appValue.price);
                  if(appValue.currentProduct.downpaymentPercent < FCC.configJSON.minDownpaymentPercent) {
                  appValue.amountFinancedInd = false;
                  appValue.amountFinancedMsg = FCC.configJSON.errorMessage.maxFinancedAmountPercent.replace(":value",( 100 - FCC.configJSON.minDownpaymentPercent));
                  appValue.currentProduct.downpaymentPercent=FCC.configJSON.minDownpaymentPercent;
                  appValue.currentProduct.downPayment = Math.ceil(appValue.price * appValue.currentProduct.downpaymentPercent / 100);
                  };
                  if (Math.floor(removeFormat(appValue.currentProduct.amountFinanced)) < FCC.configJSON.minFinancedAmount) {
                  appValue.amountFinancedInd = false;
                  appValue.amountFinancedMsg = FCC.configJSON.errorMessage.minFinancedAmount.replace(":value",guxApp.priceFormatter.format(FCC.configJSON.minFinancedAmount));
                  appValue.currentProduct.downPayment = appValue.price - FCC.configJSON.minFinancedAmount;
                  appValue.currentProduct.downpaymentPercent = Math.floor(100 * appValue.currentProduct.downPayment / appValue.price);
                  }; 
                };
              }
              setInvalidMP = function(program) {
                $.each(program.products,function(i,product){
                    if(!product.isModel) 
                    $.each(product.terms,function(i,term){
                      term.monthlyPayment=-1;
                    });
                  });
              };             
              initValidationValue = function() {
                //reset validation value
                appValue.downPaymentInd=appValue.amountFinancedInd=appValue.downpaymentPercentInd=appValue.priceInd=true;
                appValue.downPaymentMsg=appValue.amountFinancedMsg=appValue.priceMsg='';
              }
              
              $scope.selectNameplate = function (nameplate) {
                $('#mini-showroom').foundation('reveal', 'close');
                if(nameplate=="close") return;
                if (!nameplate||appValue.selectedNameplate!=nameplate) {//first time call or selected another nameplate
                  appValue.selectedNameplate = (!nameplate)?appValue.selectedNameplate:nameplate;
                  appValue.currentModel=appValue.selectedNameplate.models[0];
                  appValue.modelDetail={};
                  appValue.currentProgram={};
                  appValue.currentProduct={};
                  appValue.price=0;
                  appValue.editable=true;
                  nid=appValue.selectedNameplate.vehicleParentId;
                  aid=appValue.currentModel.vehicleAssetId;
                  $location.path(routeConstants.model.path).search({nameplate:nid,model:aid}).replace();
                }
              };
              $scope.changeModel = function(model) {
                initValidationValue();
                if (typeof(model) ==="undefined"||appValue.currentModel.vehicleAssetId!=model.vehicleAssetId) {//changed model
                    appValue.currentModel= (typeof(model) ==="undefined")?appValue.currentModel:model;                    
                    appValue.modelDetail={};
                    appValue.currentProgram={};
                    appValue.currentProduct={};
                    appValue.price=0;
                    appValue.editable=true;
                    appValue.invalidData=false;
                    nid=appValue.selectedNameplate.vehicleParentId;
                    aid=appValue.currentModel.vehicleAssetId;
                    $location.path(routeConstants.model.path).search({nameplate:nid,model:aid}).replace();
                }
              };
              resetSlider = function() {
                $('#slider').slider("value",appValue.currentProduct.downpaymentPercent); 
                if(!appValue.editable) {
                  $('#slider').slider("disable");
                }      
                else {
                  $('#slider').slider("enable");
                }      
              };
              $scope.changeNameplate = function(e) {
                e.preventDefault();
                $('#mini-showroom').foundation('reveal','open');
              };
              $scope.toggleModelClass = function(e) {
                e.preventDefault();
                $('.change-model .sort-area .sort-dropdown').toggleClass("active");
              };
              $scope.togglePriceClass = function(e) {
                if (appValue.invalidData) return;
                e.preventDefault();
                $('.model-options .model-price .inner-popup').toggleClass("active");
                if(guxApp.viewport.view === "mobile")
                  $('.model-options .model-price .inner-popup').toggleClass("clone");
              };
              $scope.toggleTermClass = function(e) {
                e.preventDefault();
                if(appValue.editable) $('.change-term .sort-area .sort-dropdown').toggleClass("active");
              };    
              $scope.togglePackageClass = function(e) {
                e.preventDefault();
                 if(appValue.editable && appValue.currentProduct.hasPackage) $('.change-package .sort-area .sort-dropdown').toggleClass("active");
              };
              // $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
              //     guxApp.billboardCarousel.init();
              // });
              $scope.addCompare = function() {
                if (appValue.invalidData) return;
              //add program to model compare module
                appValue.compareVisibility=true;
                var model={};
                model.image=appValue.currentModel.smobImage;
                model.programName=appValue.currentProgram.name;
                model.productName=appValue.currentProduct.name;
                model.nameplateName=appValue.modelDetail.model.nameplateName;
                model.modelName=appValue.modelDetail.model.modelName;
                model.price=appValue.currentModel.price;
                model.currentPackagename=appValue.currentProduct.currentPackage.name;
                model.downPayment=appValue.currentProduct.downPayment;
                model.amountFinanced=appValue.currentProduct.amountFinanced;
                model.term=appValue.currentProduct.currentTerm.term;
                model.monthlyPayment=appValue.currentProduct.currentTerm.monthlyPayment;
                model.hasPackage=appValue.currentProduct.hasPackage;
                model.currentPackageprice=appValue.currentProduct.currentPackage.price;
                $scope.appValue.compareModels.push(model);
                // appValue.compareVisibility=!appValue.compareVisibility;
                $timeout(function () {
                        appValue.compareVisibility=false;
                    },200);
              };
              $scope.removeCompare = function(i) {
                appValue.compareVisibility=true;
                $scope.appValue.compareModels.splice(i,1);
                 $timeout(function () {
                        appValue.compareVisibility=false;
                    },200);
              };
              removeFormat = function(value) {
                //all numbers were rounded up , can remove non digit value 
				value=value||0;
                return isNaN(value)?parseInt(value.replace(/\D/g,'')):parseInt(value);
              };
    }]);
 
 