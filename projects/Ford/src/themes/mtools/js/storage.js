/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF STORAGE***************************/

BnP.Storage = function() {
	
    _cache = {};
    var storageModel = new models.Storage();
	var fetchNStore = function(modelName, modelClass, successCallback) {
		var model = modelClass;
		var cachedModel = load(modelName);
		if ((typeof cachedModel === 'undefined') || (cachedModel == null) || (cachedModel.url !== model.url)) {
			$.when(model.fetch())
			.done(function() {
				store(modelName, model); 
				successCallback(model);
			 }).fail(function() {
				 Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name);
			 });
		} else  {
			successCallback(cachedModel);
		}
	};

	/**
	 * Loads a FRESH copy of the data from the server and returns when server replies.
	 * @param modelName
	 * @param modelClass
	 * @returns none
	 */
	var fetchFreshNStore = function(modelName, modelClass) {
		//console.log('fetchFreshNStore -> ' + modelName);
		var deferred = $.Deferred();
			var model = modelClass;
			$.when(model.fetch())
			.done(function() {
					store(modelName,model);
					deferred.resolve();
			}).fail(function() {
				Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name);
			});
		return deferred.promise();
	};

	var store = function(modelName, model) {
	    _cache[modelName] = model;
	    storageModel.set(modelName, model);
	};

	var load = function(modelName) {
		return _cache[modelName];
	};
	
	var remove = function(modelName) {
		delete _cache[modelName];
	};
	
	var removeAll = function(modelList) {
		for (var i = 0; i < modelList.length; i++) {
			delete _cache[modelList[i]];
		}
	};
	
	var reset = function() {
	    _cache = {};
	    storageModel.set(Constants.storage.derivativeDetailsModel, null);
	    storageModel.set(Constants.storage.categoryGrpCollection, null);
	    storageModel.set(Constants.storage.headerCollection, null);
	    storageModel.set(Constants.storage.derivativeCollection, null);
	    storageModel.set(Constants.storage.packageCollection, null);
	    storageModel.set(Constants.storage.colorCollection, null);
	    storageModel.set(Constants.storage.footerModel, null);
	    storageModel.set(Constants.storage.galleryCollection, null);
	};
	
	return {
		fetchNStore : fetchNStore,
		fetchFreshNStore: fetchFreshNStore,
		store: store,
		load: load,
		remove: remove,
		removeAll:removeAll,
		reset: reset,
		storageModel: storageModel
	};
};

/*******************************END OF STORAGE***************************/

