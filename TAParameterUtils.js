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

    static function createThemesListParameter(parameter){
    var parameterVal: ParameterValueResponse;
    for(var i=0; i<TALibrary.currentQuestion.themes.length; i++)
    {
        parameterVal=new ParameterValueResponse();
        parameterVal.StringValue=TALibrary.currentQuestion.themes[i].name;
        parameterVal.StringKeyValue=TALibrary.currentQuestion.themes[i].id;
        parameter.Items.Add(parameterVal);
    }
}

    static function createDetailedChartShowParameter(parameter){
    var chtShow = ["Top 10", "Top 20", "All categories"];
    var parameterVal: ParameterValueResponse;
    for(var i=0; i<chtShow.length; i++){
        parameterVal=new ParameterValueResponse();
        parameterVal.StringValue=chtShow[i];
        parameterVal.StringKeyValue="show"+i;
        parameter.Items.Add(parameterVal);
    }
}


    static function createDetailedChartTypeParameter(parameter){
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