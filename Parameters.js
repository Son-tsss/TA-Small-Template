class Parameters{
    static function pCategoryList_Domain(context){
        TAParameterUtils.createThemesListParameter(context.component, context.pageContext.Items["questionID"]);
    }

    static function pCategoryList_Mask(context){}

    static function pCategoryList_FilterSummary(context){}

    static function pDetailedChartShow_Domain(context){
        TAParameterUtils.createDetailedChartShowParameter(context.component);
    }

    static function pDetailedChartShow_Mask(context){}

    static function pDetailedChartShow_FilterSummary(context){}

    static function pDetailedChartType_Domain(context){
        TAParameterUtils.createDetailedChartTypeParameter(context.component);
    }

    static function pDetailedChartType_Mask(context){}

    static function pDetailedChartType_FilterSummary(context) {}

    static function pSubcategoryList_Mask(context){
        TAParameterUtils.getSubcategoriesMask(context.component);
    }

    static function pSubcategoryList_Domain(context){
        TAParameterUtils.createSubcategoriesListParameter(context.component, context.pageContext.Items["questionID"]);
    }

    static function pSubcategoryList_FilterSummary(context){
}
}