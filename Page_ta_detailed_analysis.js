class Page_ta_detailed_analysis {
    static function Hide (context){
        return false;
    }

    static function Render (context){
        TALibrary.setReport(context.pageContext, context.log, context.report, context.confirmit, context.user);
        TALibrary.setCurrentQuestion(context.pageContext.Items["questionID"]);
        if(context.component.SubmitSource=="btnResetCategories")
        {
            context.state.Parameters[TALibrary.currentQuestion.questionDetails.TACategoryListParameter]=null;
            context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
            TALibrary.currentQuestion.setCurrentTheme(null);
            TALibrary.currentQuestion.setCurrentSubcategory(null);
        }else{
            TALibrary.currentQuestion.setCurrentTheme(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TACategoryListParameter));
            TALibrary.currentQuestion.setCurrentSubcategory(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter));
        }
    }

    static function tblDetailedTable_Hide(context){
        return false;
    }

    static function tblDetailedTable_Render(context){
        TATableUtils.createDetailedTable(context.component, context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartTypeParameter), context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartShowParameter), false, true)
    }

    static function tblDetailedChart_Hide(context){
        return false;
    }

    static function tblDetailedChart_Render(context){
        TATableUtils.createDetailedTable(context.component, context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartTypeParameter), context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartShowParameter), true, true)
    }

    static function htlIndividualResponse_Hide(context){
        return false;
    }

    static function htlIndividualResponse_Render(context){
        for(var i=0; i<TALibrary.currentQuestion.questionDetails.TAHitlistFields.length; i++){
            context.component.Columns.Add(TATableUtils.getTAHitlistColumn(TALibrary.currentQuestion.questionDetails.TAHitlistFields[i]));
        }
    }
}