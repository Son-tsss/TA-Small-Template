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

    /**
     * positive mentions filter
     * @param filter
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

    /**
     * negative mentions filter
     * @param filter
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

    /**
     * current theme filter
     * @param filter
     */
    static function currentThemeFilter(filter){
        var fExpr : String;
        var pCatList = TALibrary.currentQuestion.currentTheme;

        fExpr = pCatList>=0?('ANY(' + TALibrary.currentQuestion.categories.questionName + ',"'+TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].id+'")'):'NOT ISNULL('+TALibrary.currentQuestion.overallSentiment.questionName+')';

        filter.Expression = fExpr;
        log.LogDebug("THEME: " + fExpr);
    }

    /**
     * current subcategory filter
     * @param filter
     */
    static function currentSubcategoryFilter(filter){
        var fExpr : String;
        var pCatList = TALibrary.currentQuestion.currentSubcategory;

        fExpr = pCatList>=0?('ANY(' + TALibrary.currentQuestion.categories.questionName + ',"'+TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].id+'")'):'';

        filter.Expression = fExpr;
        log.LogDebug("SUBCAT: " + fExpr);
    }

    /**
     * current attribute filter
     * @param filter
     */
    static function currentAttributeFilter(filter, state){
        var fExpr : String;
        var pCatList = TALibrary.currentQuestion.currentAttribute;

        fExpr = pCatList>=0?('ANY(' + TALibrary.currentQuestion.categories.questionName + ',"'+TALibrary.currentQuestion.attributes[TALibrary.currentQuestion.currentAttribute].id+'")'):'';

        filter.Expression = fExpr;

        log.LogDebug(state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]);
        log.LogDebug("ATTRIB: " + fExpr);
    }
}