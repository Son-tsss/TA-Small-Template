class Filters {
    static function fTACategory(context) {
    TAFilterUtils.currentThemeFilter(context.component);
}


    static function fTANegativeComments(context) {
    TAFilterUtils.negativeMentionsFilter(context.component);
}

    static function fTAPositiveComments(context) {
    TAFilterUtils.positiveMentionsFilter(context.component);
}
}