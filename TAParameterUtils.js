class TAParameterUtils{
    //Globals
    static var pageContext: ScriptPageContext;
    static var log: Logger;
    static var report: Report;
    static var confirmit: ConfirmitFacade;
    static var user: User;

    /**
     * @param {Logger} l - log
     * @param {Report} r - report
     * @param {ReportState} s - state
     * @param {ConfirmitFacade} c - confirmit
     * @param {User} u - user
     */
    static function setGlobals(p: ScriptPageContext, l: Logger, r: Report, c: ConfirmitFacade, u: User){
        pageContext = p;
        log = l;
        report = r;
        confirmit = c;
        user = u;
    }

    /**
     * domain script to get list of top TA categories
     * @param {Parameter} paramrter - parameter object
     * @param {Byte} questionID - question number in TAConfig
     */
    static function createThemesListParameter(parameter: Parameter,questionID){
        var parameterVal: ParameterValueResponse;
        var question: TAQuestion;

        question=(questionID?TALibrary.questions[questionID]:TALibrary.currentQuestion);

        for(var i=0; i<question.themes.length; i++)
        {
            parameterVal=new ParameterValueResponse();
            parameterVal.StringValue=question.themes[i].name;
            parameterVal.StringKeyValue=question.themes[i].id;
            parameter.Items.Add(parameterVal);
        }
    }

    /**
     * domain script to get list of TA subcategories
     * @param {Parameter} parameter - parameter object
     * @param {Byte} questionID - question number in TAConfig
     */
    static function createSubcategoriesListParameter(parameter: Parameter,questionID){
        var parameterVal: ParameterValueResponse;
        var question: TAQuestion;

        question=(questionID?TALibrary.questions[questionID]:TALibrary.currentQuestion);

        for(var i=0; i<question.subcategories.length; i++)
        {
            parameterVal=new ParameterValueResponse();
            parameterVal.StringValue=question.subcategories[i].name;
            parameterVal.StringKeyValue=question.subcategories[i].id;
            parameter.Items.Add(parameterVal);
        }
    }

    /**
     * mask script to get list of TA subcategories of selected category
     * @param {Parameter} parameter - parameter object
     * @param {Byte} questionID - question number in TAConfig
     */
    static function getSubcategoriesMask(mask: ParameterMaskString) {
        if (TALibrary.currentQuestion.currentTheme >= 0) {
            mask.Access = ParameterAccessType.Inclusive;
            for (var i = 0; i < TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].children.length; i++)
                mask.Keys.Add(TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].children[i].id);
        }
    }


    /**
     * domain script to get list of show N options for detailed analysis chart
     * @param {Parameter} parameter - parameter object
     */
    static function createDetailedChartShowParameter(parameter: Parameter){
        var chtShow = ["Top 10", "Top 20", "All categories"];
        var parameterVal: ParameterValueResponse;
        for(var i=0; i<chtShow.length; i++){
            parameterVal=new ParameterValueResponse();
            parameterVal.StringValue=chtShow[i];
            parameterVal.StringKeyValue="show"+i;
            parameter.Items.Add(parameterVal);
        }
    }

    /**
     * domain script to get list of statistic types for detailed analysis chart
     * @param {Parameter} parameter - parameter object
     */
    static function createDetailedChartTypeParameter(parameter: Parameter){
        var chtTypes = ["Combo – Sorted by Positive", "Combo – Sorted by Negative","Stacked – Sorted by Positive","Stacked – Sorted by Negative","Positive Mentions","Negative Mentions","Problem Index"];
        var parameterVal: ParameterValueResponse;
        for(var i=0; i<chtTypes.length; i++){
            parameterVal=new ParameterValueResponse();
            parameterVal.StringValue=chtTypes[i];
            parameterVal.StringKeyValue="type"+i;
            parameter.Items.Add(parameterVal);
        }
    }
}