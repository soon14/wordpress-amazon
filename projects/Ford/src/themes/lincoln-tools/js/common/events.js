/**
 * @author Sohrab Zabetian
 * @description Events for Lincoln Build and price
 * @project Lincoln Build and Price
 */
ND.LBP = {};
ND.LBP.Events = {
	RegisterModule : 'RegisterModuleEvent',
    GetPage : 'GetPageEvent',
   // NavToNameplate : 'NavToNameplatePageEvent',
   ChangePage: 'ChangePageEvent',  //fired when a module is ready to render a page and requests a page change.

   // InitModules: 'InitModules', //fired by Lincoln app to let modules know they should start..by this point the app has
                               //been initialised.

    NameplateSelected : 'NameplateSelectedEvent',

    SeriesEngineSelected : 'SeriesEngineSelectedEvent',

    //SaveInCookie : 'SaveInCookieEvent',

    LoadFromCookie : 'LoadFromCookieEvent',

    ObjectUpdated:  'ObjectUpdatedEvent',

    ReloadingConfig: 'ReloadingConfigEvent',

    LocationChanged : 'LocationChangedEvent',

    LocationCanceled: 'LocationCanceledEvent',

    ToggleGalleryView: 'ToggleGalleryViewEvent',

    TriggerConflictResolution: 'TriggerConflictResolutionEvent',

    ConfirmSeriesChange: 'ConfirmSeriesChangeEvent',

    AcceptConflictResolution: 'AcceptConflictResolutionEvent',

    RejectConflictResolution : 'RejectConflictResolutionEvent',

    ShareConfigReady: 'ShareConfigReadyEvent',

    ChangeSeries: 'ChangeSeries',

    StartOver: 'StartOverEvent',

    AppStateIsNull: 'AppStateIsNullEvent',

    TryAgain: 'TryAgainEvent',

    ShowLocationOverlay: 'ShowLocationOverlayEvent',

    HideLocationOverlay: 'HideLocationOverlayEvent',

    HeaderLinkClicked: ':HeaderLinkClickedEvent',

    GeneratePDF: 'GeneratePDFEvent',

    ShareConfiguration: 'ShareConfigurationEvent',

    SaveConfiguration: 'SaveConfigurationEvent',

    SaveConfigReady: 'SaveConfigReadyEvent',

    ShareConfiguration: 'ShareConfigurationEvent',

    SaveProgress: 'SaveProgressEvent',

    UnsubscribeFromEvents: 'UnsubscribeFromEventsEvent', //triggered when route changes to ensure no module is handling other pages events

    ErrorOccurred: 'ErrorOccurredEvent',

    SuccessfullySaved: 'SuccessfullySavedEvent',

    CloseOverlay: 'CloseOverlayEvent',

    AccessoryToggled : 'AccessoryToggledEvent',

    ImageGroupUpdated: 'ImageGroupUpdatedEvent',

    ButtonClicked: 'ButtonClickedEvent',

    SummaryButtonsLoaded: 'SummaryButtonsLoadedEvent',

    BlockUI : 'BlockUIEvent',

    UnblockUI : 'UnblockUIEvent',

    LocationUpdated: 'Omni:LocationUpdatedEvent',

    TrackOmniture: 'Omni:TrackOmnitureEvent',

    NameplateChanged: 'Omni:NameplateChangedEvent',

    //OrientationChanged : ':Omni:OrientationChangedEvent',
    ViewPDF: 'Omni:ViewPDFEvent',

    ColorSelected : 'Omni:ColorSelectedEvent',

    RimSelected : 'Omni:RimSelectedEvent',

    TrimSelected : 'Omni:TrimSelectedEvent',

    FabricSelected : 'Omni:FabricSelectedEvent',

    AccessorySelected: 'Omni:AccessorySelectedEvent',

    SocialLinkClicked: 'Omni:SocialLinkClickedEvent'


};