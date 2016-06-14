class Page_ta_overall_analysis {
    static function Hide (context) {
        return false;
    }
    static function Render (context) {
        TALibrary.setReport(context.pageContext, context.log, context.report, context.confirmit, context.user);
        TALibrary.setCurrentQuestion(context.pageContext.Items["questionID"]);
    if(context.component.SubmitSource=="btnResetCategories")
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

    static function txtTopThemes_Hide(context){
    return false;
}
    static function txtTopThemes_Render(context){
    var label = "Top Themes";
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