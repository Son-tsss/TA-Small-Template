class TATableUtils{
    //Globals
    static var pageContext: ScriptPageContext;
    static var log: Logger;
    static var report: Report;
    static var confirmit: ConfirmitFacade;
    static var user: User;

    /**
     * @param {Logger} l - log
     * @param {Report} r - report
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

    /*------------Header functions----------------*/

    /**
     * function to get HeaderQuestion for TA fields
     * @param {String} type - one of 6 types of TA question: "verbatim", "overallSentiment", "categories", "positiveMentions", "negativeMentions", "categorySentiment"
     * @return {HeaderQuestion}
     */
    static function getTAQuestionHeader(type: String){
        var headerQuestion: HeaderQuestion;

        switch(type){
            case "overallSentiment":
                headerQuestion = new HeaderQuestion(TALibrary.currentQuestion.overallSentiment.questionnaireElement);
                headerQuestion.DefaultStatistic = StatisticsType.Average;
                headerQuestion.Preaggregation = PreaggregationType.Average;
                headerQuestion.HeaderId = "overall_sentiment";
                break;

            case "categories":
                headerQuestion = new HeaderQuestion(TALibrary.currentQuestion.categories.questionnaireElement);
                break;

            case "positiveMentions":
                headerQuestion = new HeaderQuestion(TALibrary.currentQuestion.positiveMentions.questionnaireElement);
                break;

            case "negativeMentions":
                headerQuestion = new HeaderQuestion(TALibrary.currentQuestion.negativeMentions.questionnaireElement);
                break;

            case "categorySentiment":
                headerQuestion = new HeaderQuestion(TALibrary.currentQuestion.categorySentiment.questionnaireElement);
                headerQuestion.DefaultStatistic = StatisticsType.Average;
                headerQuestion.Preaggregation = PreaggregationType.Average;
                break;

            case "verbatim":
            default:
                headerQuestion = new HeaderQuestion(TALibrary.currentQuestion.verbatim.questionnaireElement);
                break;
        }
        headerQuestion.IsCollapsed = true;
        headerQuestion.Distributions.Enabled = true;
        headerQuestion.Distributions.Count = true;

        return headerQuestion;
    }

    /**
     * function to have categories header for Negative, Neutral, Positive and Total values
     * @param {String} groupName - "total", "neg", "neu", "pos"
     * @param {Boolean} addMinus - flag to add minus to the formula(only for negative category)
     */
    static function getCategoriesHeader(groupName: String, addMinus){
        var header: HeaderCollection = new HeaderCollection();
        var headerFormula : HeaderFormula;
        var headerCategories: HeaderCategories;
        var categoryTitle: Label;

        if(groupName=="total"){
            headerCategories= new HeaderCategories();
            headerCategories.Mask.Type = MaskType.HideAll;
            headerCategories.Totals = true;

            header.Add(headerCategories);
        }else{
            headerCategories= new HeaderCategories();
            headerCategories.Mask.Type = MaskType.ShowCodes;
            headerCategories.Totals = false;
            headerCategories.HideData = true;

            headerFormula = new HeaderFormula();
            headerFormula.Type = FormulaType.Expression;
            headerFormula.Decimals = 0;
            headerFormula.Priority = 0;

            switch(groupName){
                case "neg":
                    headerCategories.Mask.Codes = '1,2,3,4,5';
                    headerFormula.Expression = "(cellv(col-5,row)+cellv(col-4,row)+cellv(col-3,row)+cellv(col-2,row)+cellv(col-1,row))"+(addMinus?"*(-1)":"");
                    categoryTitle = new Label(9, "Negative");
                    break;
                case "neu":
                    headerCategories.Mask.Codes = '6';
                    headerFormula.Expression = "cellv(col-1,row)";
                    categoryTitle = new Label(9, "Neutral");
                    break;
                case "pos":
                    headerCategories.Mask.Codes = '7,8,9,10,11';
                    headerFormula.Expression = "cellv(col-5,row)+cellv(col-4,row)+cellv(col-3,row)+cellv(col-2,row)+cellv(col-1,row)";
                    categoryTitle = new Label(9, "Positive");
                    break;
            }

            headerFormula.Title = categoryTitle;

            header.Add(headerCategories);
            header.Add(headerFormula);
        }

        return header;
    }

    /**
     * function to get categories header with Total and NegNeuPos recoding
     * @return {HeaderCollection}
     */
    static function getTotalNegNeuPosCategoriesHeader(){
        var header: HeaderCollection = new HeaderCollection();

        header.AddRange(getCategoriesHeader("total",false));
        header.AddRange(getCategoriesHeader("neg",false));
        header.AddRange(getCategoriesHeader("neu",false));
        header.AddRange(getCategoriesHeader("pos",false));

        return header;
    }

    /**
     * function to get categories header with Total and NegPos recoding
     * @return {HeaderCollection}
     */
    static function getTotalNegPosCategoriesHeader(){
        var header: HeaderCollection = new HeaderCollection();

        header.AddRange(getCategoriesHeader("total",false));
        header.AddRange(getCategoriesHeader("neg", true));
        header.AddRange(getCategoriesHeader("pos", false));

        return header;
    }

    /**
     * function to get categories header with Total and Pos recoding
     * @return {HeaderCollection}
     */
    static function getTotalPosCategoriesHeader(){
        var header: HeaderCollection = new HeaderCollection();

        header.AddRange(getCategoriesHeader("total",false));
        header.AddRange(getCategoriesHeader("pos", false));

        return header;
    }

    /**
     * function to get categories header with Total and Neg recoding
     * @return {HeaderCollection}
     */
    static function getTotalNegCategoriesHeader(){
        var header: HeaderCollection = new HeaderCollection();

        header.AddRange(getCategoriesHeader("total",false));
        header.AddRange(getCategoriesHeader("neg", false));

        return header;
    }



    /**
     * function to get Total, Average and Problem Index headers in detailed analysis chart
     * @param {Boolean} hide - hide data for Total and Sentiment(use in table for problem index chart)
     * @return {HeaderCollection}
     */
    static function getProblemIndexHeader(hide){
        var header: HeaderCollection = new HeaderCollection();
        var colq: HeaderCategories = new HeaderCategories();

        colq.HideData = hide;
        colq.Mask.Type = MaskType.HideAll;
        colq.Distributions.HorizontalPercents = false;
        colq.Distributions.VerticalPercents = false;
        colq.Totals = true;
        header.Add(colq);

        colq=new HeaderCategories();
        colq.HideData = true;
        colq.Distributions.HorizontalPercents = false;
        colq.Distributions.VerticalPercents = false;
        colq.Totals = true;
        header.Add(colq);

        var cf: HeaderFormula = new HeaderFormula();

        cf.Type = FormulaType.Expression;
        cf.HideData = hide
        cf.Decimals = 2;
        cf.Expression = "IF(((cellv(col-1,row))>0),(((cellv(col-12,row)*(-5)+cellv(col-11,row)*(-4)+cellv(col-10,row)*(-3)+cellv(col-9,row)*(-2)+cellv(col-8,row)*(-1)+cellv(col-6,row)+cellv(col-5,row)*(2)+cellv(col-4,row)*(3)+cellv(col-3,row)*(4)+cellv(col-2,row)*(5))*10/(cellv(col-1,row)))/10),0)";
        cf.Title = new Label(9, "Avg");
        header.Add(cf);

        cf = new HeaderFormula();
        cf.Decimals = 0;
        cf.Type = FormulaType.Expression;
        cf.Expression = "IF((CELLV(COL-1,ROW) - 1)< 0 ,(1 - ROUND(CELLV(COL-1,ROW),2)) * CELLV(COL-2,ROW),EMPTYV())";
        cf.Title = new Label(9, "Problem Index");
        header.Add(cf);

        return header;
    }

    /**
     * function to have TimeSeries column header with rolling
     * @param {int} from
     * @param {int} to
     * @return {HeaderQuestion}
     */
    static function addTimeSeries(from, to){
        var questionnaireElement: QuestionnaireElement = TALibrary.currentQuestion.project.CreateQuestionnaireElement(TALibrary.currentQuestion.questionDetails.TATimeVariable);
        var headerTimeSeries: HeaderQuestion;

        headerTimeSeries = new HeaderQuestion(questionnaireElement);
        headerTimeSeries.TimeSeries.FlatLayout = true;
        headerTimeSeries.TimeSeries.Time1 = TimeseriesTimeUnitType.Year;
        headerTimeSeries.TimeSeries.Time2 = TimeseriesTimeUnitType.Month;
        headerTimeSeries.ShowTotals = false;
        headerTimeSeries.TimeSeries.RollingTimeseries.Enabled = true;
        headerTimeSeries.TimeSeries.RollingTimeseries.Unit = TimeseriesTimeUnitType.Month;
        headerTimeSeries.TimeSeries.RollingTimeseries.From = from;
        headerTimeSeries.TimeSeries.RollingTimeseries.To = to;

        return headerTimeSeries
    }

    /**
     * function to get barchart in the table
     * @param {ChartComboType} type - bar or 100% bar
     * @param {Object[]} formulas - array of formulas and colors for series
     * @param {String} title - Header title for chart (Chart by default)
     */
    static function getChartHeader(type: ChartComboType, formulas, title){
    var chartHeader: HeaderChartCombo = new HeaderChartCombo();
    var chartValues = []
    chartHeader.TypeOfChart = type;
    chartHeader.Thickness = "60%";
    chartHeader.CssClass = "chart-header";
    chartHeader.ShowTitle = true;
    chartHeader.Title = new Label(9, title?title:"Chart");
    //chartHeader.HideHeader = true;

    var chartValue: ChartComboValue;
    for(var i = 0; i< formulas.length; i++) {
        chartValue = new ChartComboValue();
        chartValue.CssClass = "chart-value";
        chartValue.Expression = formulas[i].Formula;
        chartValue.BaseColor = new ChartComboColorSet([formulas[i].Color]);
        chartValues.push(chartValue);
    }

    chartHeader.Values = chartValues;
    return chartHeader;
}


    /*-----------masking functions----------------*/

    /**
     * masking only top categories
     * @return {MaskFlat}
     */
    static function getThemesMask(){
        var mask: MaskFlat = new MaskFlat();

        mask.IsInclusive = true;

        for(var i=0; i<TALibrary.currentQuestion.themes.length; i++){
            mask.Codes.Add(TALibrary.currentQuestion.themes[i].id);
        }

        return mask
    }

    /**
     * masking only sub categories for selected top category
     * @return {MaskFlat}
     */
    static function getCategoriesMask(){
        var mask: MaskFlat = new MaskFlat();

        mask.IsInclusive = true;

        for(var i=0; i<TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].children.length; i++){
            mask.Codes.Add(TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].children[i].id);
        }

        return mask
    }

    static function getAllCategoriesMask(){
        var mask: MaskFlat = new MaskFlat();

        mask.IsInclusive = true;

        for(var i=0; i<TALibrary.currentQuestion.subcategories.length; i++){
            mask.Codes.Add(TALibrary.currentQuestion.subcategories[i].id);
        }

        return mask

    }


    /*-----------setup Table functions-------------*/

    /**
     * function to setub categories drilldown
     * @param {Table} table
     * @param {String} pageIDs - string with pageIDs for drilldown separated by commas
     */
    static function setupTableDrilldown(table: Table, pageIDs: String){
        table.Drilling.Rows.Enabled = true;
        table.Drilling.Rows.Type = DrilldownType.SetParameter;
        table.Drilling.Rows.ParameterID = TALibrary.currentQuestion.questionDetails.TACategoryListParameter;
        table.Drilling.Rows.TargetPages = pageIDs;
    }


    /*---------creating tables--------*/

    /**
     * Table for top themes chart
     * @param {Table} table
     */
    static function createTopThemesTable(table: Table){
        var headerQuestion: HeaderQuestion = getTAQuestionHeader("categorySentiment");

        headerQuestion.AnswerMask = TALibrary.currentQuestion.currentTheme>=0? getCategoriesMask():getThemesMask();
        table.RowHeaders.Add(headerQuestion);
        table.ColumnHeaders.AddRange(getTotalNegNeuPosCategoriesHeader());
        table.Sorting.Rows.Enabled = true;
        table.Sorting.Rows.SortByType = TableSortByType.Position;
        table.Sorting.Rows.Direction = TableSortDirection.Descending;
        table.Sorting.Rows.Position = 1;
        table.Sorting.Rows.PositionDirection =  TableSortByPositionType.FromStart;
        table.Sorting.Rows.TopN = 5;
        table.CssClass = "hidden";

        if(TALibrary.currentQuestion.currentTheme<0){
            setupTableDrilldown(table, "ta_overall_analysis");
        }
    }

    /**
     * Table for top trending chart
     * @param {Table} table
     */
    static function createTopTrendingTable(table: Table){
        var headerQuestion: HeaderQuestion = getTAQuestionHeader("categories");

        headerQuestion.ShowTotals = false;
        headerQuestion.AnswerMask = TALibrary.currentQuestion.currentTheme>=0?getCategoriesMask():getThemesMask();
        table.RowHeaders.Add(headerQuestion);

        table.ColumnHeaders.Add(addTimeSeries((-2), (-2))); //change to -2
        table.ColumnHeaders.Add(addTimeSeries((-1), (-1))); //change to -1

        var trendingFormula = new HeaderFormula();

        trendingFormula.Type = FormulaType.Expression;
        trendingFormula.Decimals = 0;
        trendingFormula.Expression = "CELLV(col-1,row)-CELLV(col-2,row)";
        trendingFormula.Title = new Label(9, "Trending");
        table.ColumnHeaders.Add(trendingFormula);

        table.Sorting.Rows.Enabled = true;
        table.Sorting.Rows.SortByType = TableSortByType.Position;
        table.Sorting.Rows.Direction = TableSortDirection.Descending;
        table.Sorting.Rows.PositionDirection =  TableSortByPositionType.FromStart;
        table.Sorting.Rows.Position = 3;

        table.Sorting.Rows.TopN = 5;
        table.CssClass = "hidden";

        if(TALibrary.currentQuestion.currentTheme<0){
            setupTableDrilldown(table, "ta_overall_analysis");
        }
    }

    /**
     * Table for top positive theme chart
     * @param {Table} table
     */
    static function createTopPositiveTable(table: Table){
        var headerQuestion: HeaderQuestion = getTAQuestionHeader("positiveMentions");

        headerQuestion.ShowTotals = false;
        headerQuestion.AnswerMask = TALibrary.currentQuestion.currentTheme>=0?getCategoriesMask():getThemesMask();
        table.RowHeaders.Add(headerQuestion);
        table.Sorting.Rows.Enabled = true;
        table.Sorting.Rows.SortByType = TableSortByType.Position;
        table.Sorting.Rows.Direction = TableSortDirection.Descending;
        table.Sorting.Rows.Position = 1;
        table.Sorting.Rows.PositionDirection =  TableSortByPositionType.FromStart;
        table.Sorting.Rows.TopN = 5;
        table.CssClass = "hidden";

        if(TALibrary.currentQuestion.currentTheme<0){
            setupTableDrilldown(table, "ta_overall_analysis");
        }
    }

    /**
     * Table for top negative chart
     * @param {Table} table
     */
    static function createTopNegativeTable(table: Table){
        var headerQuestion: HeaderQuestion = getTAQuestionHeader("negativeMentions");

        headerQuestion.ShowTotals = false;
        headerQuestion.AnswerMask = TALibrary.currentQuestion.currentTheme>=0?getCategoriesMask():getThemesMask();
        table.RowHeaders.Add(headerQuestion);
        table.Sorting.Rows.Enabled = true;
        table.Sorting.Rows.SortByType = TableSortByType.Position;
        table.Sorting.Rows.Direction = TableSortDirection.Descending;
        table.Sorting.Rows.Position = 1;
        table.Sorting.Rows.PositionDirection =  TableSortByPositionType.FromStart;
        table.Sorting.Rows.TopN = 5;
        table.CssClass = "hidden";

        if(TALibrary.currentQuestion.currentTheme<0){
            setupTableDrilldown(table, "ta_overall_analysis");

        }
    }

    /**
     * Table for sentiment trending chart
     * @param {Table} table
     */
    static function createSentimentTrendingTable(table: Table){
        var headerTimeSeries: HeaderQuestion = addTimeSeries((-13), (-1));

        var headerQuestion: HeaderQuestion;

        if(TALibrary.currentQuestion.currentTheme>=0){
            headerQuestion = getTAQuestionHeader("categorySentiment");
            var mask: MaskFlat = new MaskFlat();
            mask.IsInclusive = true;
            mask.Codes.Add(TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].id);
            headerQuestion.AnswerMask = mask;
            headerQuestion.IsCollapsed = true;

            var headerCategories: HeaderCategories = new HeaderCategories();
            headerCategories.Totals = false;
            headerCategories.Distributions.Enabled = true;
            headerCategories.Distributions.Count = true;
            headerCategories.HideData = true;

            var headerFormula: HeaderFormula = new HeaderFormula();
            headerFormula.Type = FormulaType.Expression;
            headerFormula.HideData = false;
            headerFormula.Decimals = 2;
            headerFormula.Expression = "IF(((cellv(col-11,row)+cellv(col-10,row)+cellv(col-9,row)+cellv(col-8,row)+cellv(col-7,row)+cellv(col-5,row)+cellv(col-4,row)+cellv(col-3,row)+cellv(col-2,row)+cellv(col-1,row))>0),(((cellv(col-11,row)*(-5)+cellv(col-10,row)*(-4)+cellv(col-9,row)*(-3)+cellv(col-8,row)*(-2)+cellv(col-7,row)*(-1)+cellv(col-5,row)+cellv(col-4,row)*(2)+cellv(col-3,row)*(3)+cellv(col-2,row)*(4)+cellv(col-1,row)*(5))*10/(cellv(col-11,row)+cellv(col-10,row)+cellv(col-9,row)+cellv(col-8,row)+cellv(col-7,row)+cellv(col-5,row)+cellv(col-4,row)+cellv(col-3,row)+cellv(col-2,row)+cellv(col-1,row)))/10),0)";
            headerFormula.Title = new Label(9, "Avg");

            headerTimeSeries.SubHeaders.Add(headerCategories);
            headerTimeSeries.SubHeaders.Add(headerFormula);
        }else{
            headerQuestion = getTAQuestionHeader("overallSentiment");
        }

        headerQuestion.ShowTotals = false;

        table.RowHeaders.Add(headerQuestion);
        table.ColumnHeaders.Add(headerTimeSeries);

        table.CssClass = "hidden";
    }

    /**
     * function to create Detailed table and table for detailed chart
     * @param {Table} table
     * @param {String} type - type of statistics from parameter
     * @param {String} n - showN from parameter
     * @param {Boolean} hide - hide statistics for chart
     */
    static function createDetailedTable(table: Table, type, n, hide){
        var headerQuestion: HeaderQuestion = getTAQuestionHeader("categorySentiment");

        headerQuestion.IsCollapsed = true;
        headerQuestion.AnswerMask = TALibrary.currentQuestion.currentTheme>=0?getCategoriesMask():getThemesMask();

        table.RowHeaders.Add(headerQuestion);

        table.Sorting.Rows.Enabled = true;
        table.Sorting.Rows.SortByType = TableSortByType.Position;
        table.Sorting.Rows.Direction = TableSortDirection.Descending;
        table.Sorting.Rows.PositionDirection =  TableSortByPositionType.FromStart;

        switch(type){
            case "type0":
                table.ColumnHeaders.AddRange(getTotalNegPosCategoriesHeader());
                table.ColumnHeaders.Add(getChartHeader(ChartComboType.Bar,[
                    {Formula: "cellv(col-7,row)", Color: TAConfig.Design.NegNeuPosPalette.Negative},
                    {Formula: "cellv(col-1,row)", Color: TAConfig.Design.NegNeuPosPalette.Positive}
                ]));
                table.Sorting.Rows.Position = 13;
                break;

            case "type1":
                table.ColumnHeaders.AddRange(getTotalNegPosCategoriesHeader());
                table.ColumnHeaders.Add(getChartHeader(ChartComboType.Bar,[
                    {Formula: "cellv(col-7,row)", Color: TAConfig.Design.NegNeuPosPalette.Negative},
                    {Formula: "cellv(col-1,row)", Color: TAConfig.Design.NegNeuPosPalette.Positive}
                ]));
                table.Sorting.Rows.Position = 7;
                table.Sorting.Rows.Direction = TableSortDirection.Ascending;
                break;

            case "type2":
                table.ColumnHeaders.AddRange(getTotalNegNeuPosCategoriesHeader());
                table.ColumnHeaders.Add(getChartHeader(ChartComboType.Bar,[
                {Formula: "cellv(col-9,row)", Color: TAConfig.Design.NegNeuPosPalette.Negative},
                {Formula: "cellv(col-7,row)", Color: TAConfig.Design.NegNeuPosPalette.Neutral},
                {Formula: "cellv(col-1,row)", Color: TAConfig.Design.NegNeuPosPalette.Positive}
            ]));
                table.Sorting.Rows.Position = 15;
                break;

            case "type3":
                table.ColumnHeaders.AddRange(getTotalNegNeuPosCategoriesHeader());
                table.ColumnHeaders.Add(getChartHeader(ChartComboType.Bar,[
                    {Formula: "cellv(col-9,row)", Color: TAConfig.Design.NegNeuPosPalette.Negative},
                    {Formula: "cellv(col-7,row)", Color: TAConfig.Design.NegNeuPosPalette.Neutral},
                    {Formula: "cellv(col-1,row)", Color: TAConfig.Design.NegNeuPosPalette.Positive}
                ]));
                table.Sorting.Rows.Position = 7;
                break;

            case "type4":
                table.ColumnHeaders.AddRange(getTotalPosCategoriesHeader());
                table.ColumnHeaders.Add(getChartHeader(ChartComboType.Bar,[
                    {Formula: "cellv(col-1,row)", Color: TAConfig.Design.NegNeuPosPalette.Positive}
                ]));
                table.Sorting.Rows.Enabled = true;
                table.Sorting.Rows.Position = 7;
                break;

            case "type5":
                table.ColumnHeaders.AddRange(getTotalNegCategoriesHeader());
                table.ColumnHeaders.Add(getChartHeader(ChartComboType.Bar,[
                    {Formula: "cellv(col-1,row)", Color: TAConfig.Design.NegNeuPosPalette.Negative}
                ]));
                table.Sorting.Rows.Position = 7;
                break;

            case "type6":
                table.ColumnHeaders.AddRange(getProblemIndexHeader(hide));
                table.ColumnHeaders.Add(getChartHeader(ChartComboType.Bar,[
                    {Formula: "cellv(col-1,row)", Color: TAConfig.Design.NegNeuPosPalette.Negative}
                ]));
                table.Sorting.Rows.Position = 15;
                break;

            default:
                table.ColumnHeaders.AddRange(getTotalNegPosCategoriesHeader());
                table.ColumnHeaders.Add(getChartHeader(ChartComboType.Bar,[
                    {Formula: "cellv(col-7,row)", Color: TAConfig.Design.NegNeuPosPalette.Negative},
                    {Formula: "cellv(col-1,row)", Color: TAConfig.Design.NegNeuPosPalette.Positive}
                ]));
                table.Sorting.Rows.Position = 13;
                break;
        }

        switch(n){
            case "show0":
                table.Sorting.Rows.TopN = 10;
                break;

            case "show1":
                table.Sorting.Rows.TopN = 20;
                break;

            case "show2":
                break;

            default:
                table.Sorting.Rows.TopN = 10;
                break;
        }

        if(TALibrary.currentQuestion.currentTheme<0){
            setupTableDrilldown(table, "ta_detailed_analysis");
        }

        if(hide)table.CssClass = "hidden";
    }

    /**
     * verbatims with TA open question
     * @param {VerbatimTable} verbatimTable
     */
    static function createTAVerbatim(verbatimTable: VerbatimTable){
        verbatimTable.Source = VerbatimSourceType.Questionnaire;
        verbatimTable.QuestionnaireElement = TALibrary.currentQuestion.verbatim.questionnaireElement;
    }

    /**
     * function to add column to hitlist
     * @param {String} name - question id or TA postfix
     * @return {HitListColumn}
     */
    static function getTAHitlistColumn(name){
        var hitlistColumn : HitListColumn = new HitListColumn();

        switch (name.toLowerCase()){
            case "overallsentiment":
                hitlistColumn.QuestionnaireElement = TALibrary.currentQuestion.overallSentiment.questionnaireElement;
                break;
            case "categories":
                hitlistColumn.QuestionnaireElement = TALibrary.currentQuestion.categories.questionnaireElement;
                break;
            case "positivementions":
                hitlistColumn.QuestionnaireElement = TALibrary.currentQuestion.positiveMentions.questionnaireElement;
                break;
            case "negativementions":
                hitlistColumn.QuestionnaireElement = TALibrary.currentQuestion.negativeMentions.questionnaireElement;
                break;
            case "categorysentiment":
                hitlistColumn.QuestionnaireElement = TALibrary.currentQuestion.categorySentiment.questionnaireElement;
                break;
            case "verbatim":
                hitlistColumn.QuestionnaireElement = TALibrary.currentQuestion.verbatim.questionnaireElement;
                break;
            default:
                hitlistColumn.QuestionnaireElement = TALibrary.currentQuestion.project.CreateQuestionnaireElement(name);
                break;
        }

        return hitlistColumn
    }
}