class Page_ta_overall_analysis {
    static function Hide (context) {
        return false;
    }
    static function Render (context) {
        TALibrary.setReport(context.pageContext, context.log, context.report, context.confirmit, context.user);
        TALibrary.setCurrentQuestion(context.pageContext.Items["questionID"]);
    if(context.page.SubmitSource=="btnResetCategories")
    {
        context.state.Parameters[TALibrary.currentQuestion.questionDetails.TACategoryListParameter]=null;
        TALibrary.currentQuestion.setCurrentTheme(null);
    }else{
        TALibrary.currentQuestion.setCurrentTheme(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TACategoryListParameter));
    }
    }

    /*-------Tables-------*/

    static function tblTopThemes_Hide(context){
        return false;
    }

    static function tblTopThemes_Render(context){
        TATableUtils.createTopThemesTable(context.component);
    }

    static function tblTopTrending_Hide(context){
        return false;
    }

    static function tblTopTrending_Render(context){
        TATableUtils.createTopTrendingTable(context.component);
    }

    static function tblTopPositive_Hide(context){
        return false;
    }

    static function tblTopPositive_Render(context){
        TATableUtils.createTopPositiveTable(context.component);
    }

    static function tblTopNegative_Hide(context){
        return false;
    }

    static function tblTopNegative_Render(context){
        TATableUtils.createTopNegativeTable(context.component);
    }

    static function tblSentimentTrend_Hide(context){
        return false;
    }

    static function tblSentimentTrend_Render(context){
        TATableUtils.createSentimentTrendingTable(context.component);
    }

    /*-------verbatims---------*/
    static function verbPositive_Hide(context){
        return false;
    }

    static function verbPositive_Render(context){
        TATableUtils.createTAVerbatim(context.component);
    }

    static function verbNegative_Hide(context){
        return false;
    }

    static function verbNegative_Render(context){
        TATableUtils.createTAVerbatim(context.component);
    }

    static function txtOverallHeader_Hide(context){
        return false;
    }

    static function txtOverallHeader_Render(context){
        var dt : DateTime = DateTime.Now;
        dt = dt.AddMonths(-1);
        var mn : String = dt.ToString("MMMM");
        context.component.Output.Append("Summary (Current Period: " + mn + " " + dt.Year + ")");
    }

    static function txtVerbSentimentHeader_Hide(context){
        return false;
    }

    static function txtVerbSentimentHeader_Render(context){
        var dt : DateTime = DateTime.Now;
        dt = dt.AddMonths(-1);
        var mn : String = dt.ToString("MMMM");
        var str = TALibrary.currentQuestion.currentTheme<0?("Overall Verbatim Sentiment (Current Period: " + mn + " " + dt.Year + ")"):("Verbatim Sentiment for category "+TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].name+" (Current Period: " + mn + " " + dt.Year + ")");
        context.component.Output.Append(str);
    }
}