class Filters {
    static function fTACategory(context) {
        TAFilterUtils.currentThemeFilter(context.component);
    }

    static function fTASubcategory(context) {
        TAFilterUtils.currentSubcategoryFilter(context.component);
    }

    static function fTAAttribute(context) {
        TAFilterUtils.currentAttributeFilter(context.component, context.state);
    }


    static function fTANegativeComments(context) {
        TAFilterUtils.negativeMentionsFilter(context.component);
    }

    static function fTAPositiveComments(context) {
        TAFilterUtils.positiveMentionsFilter(context.component);
    }
}