class Page_ta_overall_analysis {
    static function Hide (context) {
        return false;
    }
    static function Render (context) {
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
    var period1 = context.pageContext.Items["period1"]?context.pageContext.Items["period1"]:null;
    var period2 = context.pageContext.Items["period2"]?context.pageContext.Items["period2"]:null;
        TATableUtils.createTopTrendingTable(context.component, period1, period2);
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

    /*--------charts-----------*/

    static function chtTopThemes_Hide(context){
        return false;
    }
    static function chtTopThemes_Render(context){
        TAChartUtils.setupChart(context.component);
        TAChartUtils.switchLabelsOn(context.component);
    }

    static function chtTopTrending_Hide(context){
        return false;
    }
    static function chtTopTrending_Render(context){
        TAChartUtils.setupChart(context.component);
        TAChartUtils.switchFormulasOff(context.component);
        TAChartUtils.switchLabelsOn(context.component);
    }

    static function chtTopPositive_Hide(context){
        return false;
    }
    static function chtTopPositive_Render(context){
        TAChartUtils.setupChart(context.component);
        TAChartUtils.switchLabelsOn(context.component);
    }

    static function chtTopNegative_Hide(context){
        return false;
    }
    static function chtTopNegative_Render(context){
        TAChartUtils.setupChart(context.component);
        TAChartUtils.switchLabelsOn(context.component);
    }

    static function chtSentimentTrend_Hide(context){
        return false;
    }
    static function chtSentimentTrend_Render(context){
        TAChartUtils.switchLabelsOn(context.component);
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

    /*---------texts----------*/

    static function txtOverallHeader_Hide(context){
        return false;
    }
    static function txtOverallHeader_Render(context){
        var label = "Summary";
        if(TALibrary.currentQuestion.currentTheme >=0){
            label+=" for category "+TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].name
        }

        context.component.Output.Append(label);
    }

    static function txtVerbSentimentHeader_Hide(context){
        return false;
    }

    static function txtVerbSentimentHeader_Render(context){
        var label = "Verbatim Sentiment";
        if(TALibrary.currentQuestion.currentTheme >=0){
            label+=" for category "+TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].name
        }
        context.component.Output.Append(label);
    }

    static function txtCategoriesList_Hide(context){
    return false;
}
    static function txtCategoriesList_Render(context){
    var label = "Categories: ";
    context.component.Output.Append(label);
}

    static function btnResetCategories_Hide(context){
    return false;
}
    static function btnResetCategories_Render(context){
        context.component.Label = new Label(9,"x");
}

    static function txtTopThemes_Hide(context){
    return false;
}
    static function txtTopThemes_Render(context){
    var label = "Top Themes: ";
    context.component.Output.Append(label);
}

    static function txtTopTrending_Hide(context){
    return false;
}
    static function txtTopTrending_Render(context){
    var label = "Top Trending";
    context.component.Output.Append(label);
}

    static function txtTopPositive_Hide(context){
    return false;
}
    static function txtTopPositive_Render(context){
    var label = "Top Positive Mentions";
    context.component.Output.Append(label);
}

    static function txtTopNegative_Hide(context){
    return false;
}
    static function txtTopNegative_Render(context){
    var label = "Top Negative Mentions";
    context.component.Output.Append(label);
}

    static function txtSentimentTrend_Hide(context){
    return false;
}
    static function txtSentimentTrend_Render(context){
    var label = "Sentiment trending";
    context.component.Output.Append(label);
}

    static function txtPositiveVerb_Hide(context){
    return false;
}
    static function txtPositiveVerb_Render(context){
    var label = "Comments with Positive sentiment";
    context.component.Output.Append(label);
}

    static function txtNegativeVerb_Hide(context){
    return false;
}
    static function txtNegativeVerb_Render(context){
    var label = "Comments with Negative sentiment";
    context.component.Output.Append(label);
}

}