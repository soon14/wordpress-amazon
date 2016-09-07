/**
 * @author Sohrab Zabetian
 * @description Data model for the application
 * @project Financial calculator
 */
ND.LFC.financialCalculator.value('appValue', {

    models: [],
    series: [],
    gmfv: {},
    selectedModel: null,
    selectedDerivative: null,
    selectedEngine:null,
    currentStep: 0,
    calStateDefault: 'standard',  //can be set as : "standard"  "rco"
    calState: null,
    steps: [
        {
            label: 'select'
        },
        {
            label: 'calculate'
        },
        {
            label: 'apply'
        }
    ],
    selectedTerm: 12,
    sliderValue: 0,
    totalMonthlyPayment: null,
    totalGMFV:null,
    downPayment: 0,
    minDownPayment: 0,
    maxDowPayment: 0,
    downPaymentPercentage: 20,
    standardTerms: {},
    rcoTerms: {}
});
