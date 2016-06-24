class Page_ta_detailed_analysis {
    static function Hide (context){
        return false;
    }

    static function Render (context){
        TALibrary.setReport(context.pageContext, context.log, context.report, context.confirmit, context.user);
        TALibrary.setCurrentQuestion(context.pageContext.Items["questionID"]);
        switch(context.component.SubmitSource){
            case "btnResetAttributes":
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                break;
            case "btnResetSubcategories":
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentSubcategory(null);
                break;
            case "btnResetCategories":
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentSubcategory(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TACategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentTheme(null)
                break;
            default:
                if(context.state.Parameters.IsNull(TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter) || TALibrary.currentQuestion.currentSubcategory<0 || context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter)!=TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].id){
                    context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                    TALibrary.currentQuestion.setCurrentAttribute(null);
                }else{
                    TALibrary.currentQuestion.setCurrentAttribute(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter));
                }

                if(context.state.Parameters.IsNull(TALibrary.currentQuestion.questionDetails.TACategoryListParameter) || TALibrary.currentQuestion.currentTheme<0 || context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TACategoryListParameter)!=TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].id){
                    context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                    TALibrary.currentQuestion.setCurrentAttribute(null);
                    context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
                    TALibrary.currentQuestion.setCurrentSubcategory(null);
                }else{
                    TALibrary.currentQuestion.setCurrentSubcategory(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter));
                }

                TALibrary.currentQuestion.setCurrentTheme(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TACategoryListParameter));
                break;
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