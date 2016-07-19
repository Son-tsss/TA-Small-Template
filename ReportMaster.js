class ReportMaster {
	static function txtCustomerLogo_Hide(context) {
		return false;
	}

	static function txtCustomerLogo_Render(context) {
		if (TAConfig.Design.Logo !== null) {
			context.component.Output.Append('<img border="0" hspace="0" src="' + TAConfig.Design.Logo + '" height="65">');
		}
	}

	static function txtStyles_Hide(context) {
		return false;
	}

	static function txtStyles_Render(context) {
		var str = "<style>" +
			"body {" +
			"    font-family: Arial;" +
			"}" +
			".hidden {" +
			"    display: none;" +
			"}" +
			".ta-header {" +
			"    position: fixed;" +
			"    top: 0;" +
			"    right: 0;" +
			"    left: 0;" +
			"    height: 90px;" +
			"    z-index: 1000;" +
			"}" +
			".ta-container {" +
			"    height: 100%;" +
			"    margin-right: auto;" +
			"    margin-left: auto;" +
			"    width: 940px;" +
			"}" +
			".ta-default-bg-color {" +
			"    background-color: "+TAConfig.Design.DefaultColor+" /*add color*/" +
			"}" +
			"header {" +
			"    position: relative;" +
			"    display: block;" +
			"}" +
			"header #ta-logo {" +
			"    display: block;" +
			"    height: 70px;" +
			"    width: auto;" +
			"    position: absolute;" +
			"    top: 22px;" +
			"    left: 0;" +
			"}" +
			"header #ta-logo img {" +
			"    display: inline-block;" +
			"    height: 50px;" +
			"    position: relative;" +
			"}" +
			"header #ta-report-name {" +
			"    position: relative;" +
			"    color: #ffffff;" +
			"    font-size: 24px;" +
			"    margin-left: 20px;" +
			"    vertical-align: top;" +
			"    display: inline-block;" +
			"    height: 70px;" +
			"    width: 530px;" +
			"}" +
			"header #ta-logo>div,header #ta-logo>div>img {" +
			"    display: inline-block;" +
			"    height: 70px;" +
			"    position: relative;" +
			"}" +
			"header #ta-report-name>span, header #ta-report-name>span>div {" +
			"    height: 48px;" +
			"    display: table-cell;" +
			"    vertical-align: middle;" +
			"}" +
			"header #ta-menu {" +
			"    line-height: 1;" +
			"    font-size: 1px;" +
			"    margin: 0;" +
			"    padding: 0;" +
			"    position: absolute;" +
			"    top: 60px;" +
			"    right: 0;" +
			"    z-index: 1001;" +
			"}" +
			"li.ta-menu-top-item {" +
			"    line-height: 1;" +
			"    display: inline-block;" +
			"    vertical-align: top;" +
			"    padding: 0;" +
			"    margin: 0 5px 0 0;" +
			"    position: relative;" +
			"}" +
			".ta-menu-top-item a {" +
			"    display: block;" +
			"    line-height: 30px;" +
			"    padding: 0 15px;" +
			"    cursor: pointer;" +
			"    text-shadow: none;" +
			"    color: #ffffff;" +
			"    font-size: 14px;" +
			"    text-transform: uppercase;" +
			"    white-space: nowrap;" +
			"    -webkit-border-top-left-radius: 5px;" +
			"    -webkit-border-top-right-radius: 5px;" +
			"    -moz-border-top-left-radius: 5px;" +
			"    -moz-border-top-right-radius: 5px;" +
			"    border-top-left-radius: 5px;" +
			"    border-top-right-radius: 5px;" +
			"}" +
			".ta-menu-top-item-hover a, .ta-menu-top-item-selected a {" +
			"    background: " + TAConfig.Design.LightGrey + ";" +
			"    color: " + TAConfig.Design.DefaultColor + ";" +
			"}" +
			"#ta-page {" +
			"    display: block;" +
			"    padding-top: 90px;" +
			"    background-color: " + TAConfig.Design.LightGrey + ";" +
			"}" +
			".ta-title {" +
			"    width: 100%;" +
			"    text-align: center;" +
			"    color: #ffffff;" +
			"    font-size: 17px;" +
			"    font-weight: bold;" +
			"    padding-top: 15px;" +
			"    padding-bottom: 15px;" +
			"    margin-bottom: 20px;" +
			"    border-radius: 10px;" +
			"    -webkit-border-radius: 10px;" +
			"    -moz-border-radius: 10px;" +
			"}" +
			".ta-parameter {" +
			"    display: inline-block;" +
			"	 border-radius: 5px;"+
			"	 -webkit-border-radius: 5px;"+
			"	 -moz-border-radius: 5px;"+
			"    padding: 3px;" +
			"    background: #ffffff;" +
			"    margin-bottom: 15px;" +
			"    margin-top: 15px;" +
			"}" +
			".ta-parameter>div {" +
			"    display: inline-block;" +
			"    padding: 5px;" +
			"}" +
			".ta-parameter-title {" +
			"    font-size: 15px;" +
			"    margin-bottom: 10px;" +
			"    color: " + TAConfig.Design.DarkGrey + ";" +
			"}" +
			".ta-parameter-dropdown, .ta-reset-parameter-button {" +
			"    display: inline-block;" +
			"}" +
			".ta-parameter-dropdown select {" +
			"    min-width: 100px;" +
			"    color: #424242;" +
			"}" +
			".ta-reset-parameter-button input {" +
			"    background: #fff;" +
			"    border: none;" +
			"    font-size: 16px;" +
			"    font-weight: bold;" +
			"    color: " + TAConfig.Design.NegNeuPosPalette.Negative + ";" +
			"    cursor: pointer;" +
			"    padding: 3px;" +
			"}" +
			".ta-reset-parameter-button .ta-reset-parameter-tooltip {" +
			"    visibility: hidden;" +
			"    background-color: #000000;" +
			"    color: #ffffff;" +
			"    font-size: 9px;" +
			"    text-align: center;" +
			"    border-radius: 6px;" +
			"    padding: 5px;" +
			"    position: absolute;" +
			"    top: 128px;" +
			"    margin-left: -33px;" +
			"}" +
			".ta-reset-parameter-button .ta-reset-parameter-tooltip::after {" +
			"    content: \" \";" +
			"    position: absolute;" +
			"    top: 100%;" +
			"    left: 50%;" +
			"    margin-left: -5px;" +
			"    border-width: 5px;" +
			"    border-style: solid;" +
			"    border-color: black transparent transparent transparent;" +
			"}" +
			".ta-reset-parameter-button:hover .ta-reset-parameter-tooltip {" +
			"    visibility: visible;" +
			"}" +
			".ta-small-charts-area {" +
			"    display: flex;" +
			"    flex-wrap: wrap;" +
			"    justify-content: center;" +
			"}" +
			".ta-chart-area {" +
			"    border-radius: 10px;" +
			"    box-shadow: 1px 1px 6px rgba(0,0,0,.8);" +
			"    background: white;" +
			"    padding: 15px;" +
			"    margin-bottom: 20px;" +
			"}" +
			".ta-small {" +
			"    width: 530px;" +
			"}" +
			".ta-big {" +
			"    width: 100%;" +
			"}" +
			".ta-chart-title {" +
			"    text-align: center;" +
			"    margin-bottom: 20px;" +
			"    font-size: 16px;" +
			"    color: " + TAConfig.Design.DarkGrey + ";" +
			"    font-weight: bold;" +
			"}" +
			".ta-verbatim tr:first-of-type {" +
			"    display: none;" +
			"}" +
			"ta-verbatim{"+
			"    word-break: break-word;"+
			"}"+
			".ta-verbatim td {" +
			"    padding: 7px;" +
			"    border-bottom: 2px dashed;" +
			"    font-size: 16px;" +
			"    color: " + TAConfig.Design.DarkGrey + ";" +
			"}" +
			".ta-verbatim.ta-positive td {" +
			"    border-color: " + TAConfig.Design.NegNeuPosPalette.Positive + ";" +
			"}" +
			".ta-verbatim.ta-negative td {" +
			"    border-color: " + TAConfig.Design.NegNeuPosPalette.Negative + ";" +
			"}" +
			".ta-detailed-table>table {" +
			"    width: 100%;" +
			"}" +
			".ta-detailed-table>table>tbody>tr>td:last-child {" +
			"    width: 50%;" +
			"}" +
			".ta-detailed-table>table>thead>tr>td, .reportal-table>thead>tr>th {" +
			"    background-color: " + TAConfig.Design.LightGrey + ";" +
			"    border-left: 1px solid #fff;" +
			"    font-size: 12px;" +
			"    line-height: 12px;" +
			"    padding: 8px;" +
			"    vertical-align: bottom;" +
			"    text-align: left;" +
			"    font-weight: normal;" +
			"    color: " + TAConfig.Design.DarkGrey + ";" +
			"}" +
			".ta-detailed-table>table>tbody>tr>td>a {" +
			"    color: " + TAConfig.Design.DarkGrey + ";" +
			"}" +
			".ta-detailed-table>table>tbody>tr>td {" +
			"    color: " + TAConfig.Design.DarkGrey + ";" +
			"}" +
			".ta-detailed-table>table>thead>tr>td:first-child, .reportal-table>thead>tr>th:first-child {" +
			"    border-left: 0;" +
			"}" +
			".ta-detailed-table>table>thead>tr>td[class*=\"_cc\"]:before {" +
			"    content: \"Categories\";" +
			"}" +
			".ta-detailed-table>table>tbody>tr>td:first-child {" +
			"    white-space: nowrap;" +
			"}" +
			".ta-detailed-table>table>tbody>tr:first-child>td {" +
			"    padding-top: 8px !important;" +
			"    height: 40px;" +
			"}" +
			".ta-detailed-table>table>tbody>tr>td {" +
			"    padding: 2px 8px;" +
			"    min-height: 24px;" +
			"    line-height: 16px;" +
			"    vertical-align: middle;" +
			"    height: 32px;" +
			"    border-bottom: 1px solid " + TAConfig.Design.LightGrey + ";" +
			"}" +
			".ta-detailed-table>table>tbody>tr>td:last-child>.barchart {" +
			"    height: 24px !important;" +
			"}" +
			".ta-detailed-table>table>tbody>tr>td:last-child>.barchart td {" +
			"    border-right: 0 !important;" +
			"    border-left: 0 !important;" +
			"    height: 24px !important;" +
			"}" +
			"@media all and (min-width: 1200px) {" +
			"    .ta-container {" +
			"        width: 1170px;" +
			"    }" +
			"    .ta-small-charts-area {" +
			"        justify-content: space-between;" +
			"    }" +
			"    .ta-chart-area.ta-small {" +
			"        width: 49%;" +
			"    }" +
			"}" +
			"@media all and (max-width: 979px) and (min-width: 768px) {" +
			"    .ta-container {" +
			"        width: 724px;" +
			"    }" +
			"    header #ta-report-name {" +
			"        font-size: 20px;" +
			"        width: 300px;" +
			"    }" +
			"    .ta-small {" +
			"        width: 100%;" +
			"    }" +
			"}" +
			"@media all and (max-width: 767px) {" +
			"    .ta-container {" +
			"        width: auto;" +
			"    }" +
			"    header #ta-report-name {" +
			"        font-size: 20px;" +
			"        width: 300px;" +
			"    }" +
			"    .ta-small {" +
			"        width: 100%;" +
			"    }" +
			"}" +
			"@media all and (max-width: 660px) {" +
			"    .ta-header {" +
			"        position: static;" +
			"        height: auto;" +
			"    }" +
			"    header {" +
			"        padding-top: 50px;" +
			"    }" +
			"    header #ta-logo {" +
			"        height: 35px;" +
			"        width: auto;" +
			"    }" +
			"    header #ta-logo img {" +
			"        height: 35px;" +
			"    }" +
			"    header #ta-report-name {" +
			"        height: 30px;" +
			"        font-size: 18px;" +
			"        width: 300px;" +
			"    }" +
			"    header #ta-report-name span {" +
			"        height: 30px;" +
			"    }" +
			"    header #ta-menu {" +
			"        position: static;" +
			"    }" +
			"    li.ta-menu-top-item {" +
			"        display: block;" +
			"        width: 100%;" +
			"    }" +
			"    .ta-menu-top-item a {" +
			"        text-align: center;" +
			"    }" +
			"    #ta-page {" +
			"        padding-top: 0px;" +
			"    }" +
			"    .ta-parameter {" +
			"        display: block;" +
			"        padding: 15px;" +
			"        background: #ffffff;" +
			"        margin-top: 15px;" +
			"        margin-bottom: 15px;" +
			"    }" +
			"    .ta-parameter-title, .ta-parameter-dropdown {" +
			"        margin-bottom: 0px;" +
			"        display: inline-block;" +
			"    }" +
			"    .ta-reset-parameter-button:hover .ta-reset-parameter-tooltip {" +
			"        visibility: hidden;" +
			"    }" +
			"    .ta-small {" +
			"        width: 100%;" +
			"    }" +
			"}"+
			".ta-filterpanel {" +
			"    position: fixed;" +
			"    top: 211px;" +
			"    left: 0;" +
			"    background: #fff;" +
			"    padding-bottom: 15px;" +
			"    border-bottom-right-radius: 10px;"+
			"    -webkit-border-bottom-right-radius: 10px;"+
			"    -moz-border-bottom-right-radius: 10px;"+
			"	border-top-right-radius: 10px;"+
			"	-webkit-border-top-right-radius: 10px;"+
			"	-moz-border-top-right-radius: 10px;"+
			"	box-shadow: 1px 1px 6px rgba(0,0,0,.8);"+
			"}" +
			".ta-filterpanel-title {" +
			"    background-color: " + TAConfig.Design.DefaultColor + ";" +
			"    padding: 15px;" +
			"    color: #fff;" +
			"    font-weight: bold;" +
			"    font-size: 17px;" +
			"    border-top-right-radius: 10px;"+
			"    -webkit-border-top-right-radius: 10px;"+
			"    -moz-border-top-right-radius: 10px;"+
			"}" +
			".ta-filter {" +
			"    padding: 15px 15px 0px 15px;" +
			"    color: #757575;" +
			"}" +
			".ta-filter-title {" +
			"    font-size: 15px;" +
			"    margin-bottom: 10px;" +
			"    color: #757575;" +
			"}" +
			".ta-filter-select select {" +
			"    min-width: 100px;" +
			"    color: #757575;" +
			"}" +
			".yui-calcontainer {" +
			"    width: auto!important;" +
			"}" +
			"@media all and (max-width: 1500px) {" +
			"    .ta-filterpanel {" +
			"        margin-top: 20px;" +
			"        position: static;" +
			"        background: #fff;" +
			"        padding-bottom: 15px;" +
			"    }" +
			"}"+
			"</style>"+

			"<link href=\"https://fonts.googleapis.com/css?family=Lato:400,700,900\" rel=\"stylesheet\" type=\"text/css\">";

		context.component.Output.Append(str);
	}

	static function txtScripts_Hide(context) {
	return false;
}

	static function txtScripts_Render(context) {
	var str = "<script>"+
		"var paletteNPS = ['" + TAConfig.Design.NegNeuPosPalette.Negative + "','" + TAConfig.Design.NegNeuPosPalette.Neutral + "','" + TAConfig.Design.NegNeuPosPalette.Positive + "'];" +
		"var paletteTrending = ['" + TAConfig.Design.ComplimentaryColor + "','" + TAConfig.Design.DefaultColor + "'];" +
		"var palettePositive = ['" + TAConfig.Design.NegNeuPosPalette.Positive + "'];" +
		"var paletteNegative = ['" + TAConfig.Design.NegNeuPosPalette.Negative + "'];" +
		"var paletteOverallSatisfaction = ['" + TAConfig.Design.DefaultColor + "'];" +
		" Y.use(\"cssbutton\");" +
		"    YUI().use('event-custom', function(Y)" +
		"    {" +
		"        Y.Global.on('cf:chartBeforeCreate', function(eventData)" +
		"        {" +
		"            console.log(eventData);" +
		"            delete eventData.chartOptions.chart.width;" +
		"            var chartOptions = eventData.chartOptions;" +
		"            switch(eventData.chartInfo.chartName){" +
		"                case \"chtTopThemes\":" +
		"                    chartOptions.chart.type = \"column\";" +
		"					 chartOptions.plotOptions.column.stacking= \"normal\";"+
		"                    chartOptions.colors = paletteNPS;" +
		"                    chartOptions.legend.enabled = true;" +
		"                    break;" +
		"                case \"chtTopTrending\":" +
		"                    chartOptions.chart.type = \"column\";" +
		"                    chartOptions.colors = paletteTrending;" +
		"                    chartOptions.legend.enabled = true;" +
		"                    break;" +
		"                case \"chtTopPositive\":" +
		"                    chartOptions.chart.type = \"column\";" +
		"                    chartOptions.colors = palettePositive;" +
		"                    chartOptions.legend.enabled = false;" +
		"                    break;" +
		"                case \"chtTopNegative\":" +
		"                    chartOptions.chart.type = \"column\";" +
		"                    chartOptions.colors = paletteNegative;" +
		"                    chartOptions.legend.enabled = false;" +
		"                    break;" +
		"                case \"chtSentimentTrend\":" +
		"                    chartOptions.chart.type = \"line\";" +
		"                    chartOptions.colors = paletteOverallSatisfaction;" +
		"                    break" +
		"            }" +
		"            chartOptions.legend.shadow = false;" +
		"            chartOptions.legend.borderWidth = 0;" +
		"            chartOptions.legend.itemStyle.color = \"" + TAConfig.Design.DarkGrey + "\";" +
		"            chartOptions.legend.itemStyle.fontSize = \"12px\";" +
		"            chartOptions.xAxis.gridLineColor = \"" + TAConfig.Design.DarkGrey + "\";" +
		"            chartOptions.xAxis.labels.style.color = \"" + TAConfig.Design.DarkGrey + "\";" +
		"            chartOptions.xAxis.labels.style.fontSize = \"12px\";" +
		"            chartOptions.yAxis.gridLineColor = \"" + TAConfig.Design.DarkGrey + "\";" +
		"            chartOptions.yAxis.labels.enabled =false;" +
		"            chartOptions.plotOptions.series.dataLabels.style.fontSize = \"12px\";" +
		"            chartOptions.plotOptions.series.dataLabels.style.color = \"" + TAConfig.Design.DarkGrey + "\"; /*add color*/" +
		"        });" +
		"    });"+
		"</script>";

	context.component.Output.Append(str);
}

	static function txtReportName_Hide(context) {
		return false;
	}

	static function txtReportName_Render(context) {
	var str = TAConfig.Design.ReportName?TAConfig.Design.ReportName:context.report.Name;
	context.component.Output.Append(str);
	}
}