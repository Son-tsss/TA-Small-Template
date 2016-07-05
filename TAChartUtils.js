class TAChartUtils {
    //Globals
    static var pageContext:ScriptPageContext;
    static var log:Logger;
    static var report:Report;
    static var confirmit:ConfirmitFacade;
    static var user:User;

    /**
     * @param {Logger} l - log
     * @param {Report} r - report
     * @param {ConfirmitFacade} c - confirmit
     * @param {User} u - user
     */
    static function setGlobals(p:ScriptPageContext, l:Logger, r:Report, c:ConfirmitFacade, u:User) {
        pageContext = p;
        log = l;
        report = r;
        confirmit = c;
        user = u;
    }

    /**
     * Reverse categories and series in rows setup
     * @param {Chart} chart
     */
    static function setupChart(chart: Chart){
        chart.SeriesInRows = false;
        chart.ChartArea.PrimaryAxisX.Invert = false;
    }

    /**
     * Show x-axis labels
     * @param {Chart} chart
     */
    static function switchLabelsOn(chart: Chart){
        chart.ChartArea.PrimaryAxisX.LabelStyle.Enabled = true;
    }

    /**
     * Switching of formulas in chart
     * @param {Chart} chart
     */
    static function switchFormulasOff(chart: Chart){
            chart.ColumnContent.Categories.Formula = false;
    }
}
