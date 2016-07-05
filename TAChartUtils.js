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
    static function

    setGlobals(p:ScriptPageContext, l:Logger, r:Report, c:ConfirmitFacade, u:User) {
        pageContext = p;
        log = l;
        report = r;
        confirmit = c;
        user = u;
    }

    static function setupChart(chart: Chart){
        chart.SeriesInRows = false;
        chart.ChartArea.PrimaryAxisX.Invert = false;
        chart.ChartArea.PrimaryAxisX.LabelStyle.Enabled = true;
    }

    static function switchFormulasOff(chart: Chart){
            chart.ColumnContent.Categories.Formula = false;
    }
}
