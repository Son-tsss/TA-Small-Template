class PageMasterWithFilters {
    static function

    txtFilterpanelStyles_Hide(context) {
        return false;
    }

    static function

    txtFilterpanelStyles_Render(context) {
        var str = "<style>" +
            ".ta-filterpanel {" +
            "    position: fixed;" +
            "    top: 211px;" +
            "    left: 0;" +
            "    background: #fff;" +
            "    padding-bottom: 15px;" +
            "    /* padding: 0px 15px 15px; */" +
            "}" +
            ".ta-filterpanel-title {" +
            "    background: #fb8c00;" +
            "    padding: 15px;" +
            "    color: #fff;" +
            "    font-weight: bold;" +
            "    font-size: 17px;" +
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
            "</style>";
        context.component.Output.Append(str);
    }
}