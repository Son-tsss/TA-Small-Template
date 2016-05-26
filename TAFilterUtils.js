class TAFilterUtils{
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

    /** positive mentions filter
     *@param filter
     */
    static function positiveMentionsFilter(filter){
    var vName : String = TALibrary.currentQuestion.overallSentiment.questionName;
    var fExpr : String;

    fExpr = '( ' + vName + ' = "7"';
    fExpr += ' OR ' + vName + ' = "8"';
    fExpr += ' OR ' + vName + ' = "9"';
    fExpr += ' OR ' + vName + ' = "10"';
    fExpr += ' OR ' + vName + ' = "11" )';

    filter.Expression = fExpr;
}

    /** negative mentions filter
     *@param filter
     */
    static function negativeMentionsFilter(filter){
    var vName : String = TALibrary.currentQuestion.overallSentiment.questionName;
    var fExpr : String;

    fExpr = '( ' + vName + ' = "1"';
    fExpr += ' OR ' + vName + ' = "2"';
    fExpr += ' OR ' + vName + ' = "3"';
    fExpr += ' OR ' + vName + ' = "4"';
    fExpr += ' OR ' + vName + ' = "5" )';

    filter.Expression = fExpr;
}

    static function currentThemeFilter(filter){

    var fExpr : String;
    var pCatList = TALibrary.currentQuestion.currentTheme;

    fExpr = pCatList>=0?('ANY(' + TALibrary.currentQuestion.categories.questionName + ',"'+TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].id+'")'):'NOT ISNULL('+TALibrary.currentQuestion.overallSentiment.questionName+')';
    log.LogDebug(fExpr);
    filter.Expression = fExpr;
}
}