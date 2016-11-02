class Page_ta_detailed_analysis {
    static function Hide (context){
        return false;
    }

    static function Render (context){
        TALibrary.setReport(context.pageContext, context.log, context.report, context.confirmit, context.user);
		context.log.LogDebug('render');
        TALibrary.setCurrentQuestion(context.pageContext.Items["questionID"]);
        switch(context.component.SubmitSource){
            case "btnResetAttributes":				
				context.log.LogDebug('render case1');
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                break;
            case "btnResetSubcategories":
				context.log.LogDebug('render case2');
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentSubcategory(null);
                break;
            case "btnResetCategories":
				context.log.LogDebug('render case3');
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentSubcategory(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TACategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentTheme(null)
                break;
            default:                
				context.log.LogDebug('render default');
            	setHitlistFilters(context);
                break;
        }

    }
  
  	static function setHitlistFilters(context) {         
      	var drilldownParameter = TALibrary.currentQuestion.questionDetails.DrilldownParameter;
      	var categoryParameter = TALibrary.currentQuestion.questionDetails.TACategoryListParameter;    
      	var subCategoryParameter = TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter;    
      	var attributesParameter = TALibrary.currentQuestion.questionDetails.TAAttributesListParameter;
      
      	var state = context.state;
      	var log = context.log;
		
      	if (drilldownParameter != null && !state.Parameters.IsNull(drilldownParameter)) {
          	log.LogDebug('1')
          	state.Parameters[categoryParameter] = null;
            TALibrary.currentQuestion.setCurrentTheme(null);
          
      	    state.Parameters[subCategoryParameter] = null;
            TALibrary.currentQuestion.setCurrentSubcategory(null);
          
      	    state.Parameters[attributesParameter] = null;
            TALibrary.currentQuestion.setCurrentAttribute(null);
          
          	var value, indexAttribute, 
                parentSubcategory, indexSubcategory, 
                parentCategory, indexCategory;
          	
          	value = state.Parameters.GetString(drilldownParameter);
          	indexAttribute = getIndexOf(TALibrary.currentQuestion.attributes, 
                                            value, 
                                            function (first, second) { return first.id == second; }); 

              
        	if (indexAttribute >= 0) {

                TALibrary.currentQuestion.setCurrentAttribute(value);
              	state.Parameters[attributesParameter] = new ParameterValueResponse(value);
             	parentSubcategory = TALibrary.currentQuestion.attributes[indexAttribute].parent;
              	indexSubcategory = getIndexOf(TALibrary.currentQuestion.subcategories, 
                                                  parentSubcategory, 
                                                  function (first, second) { return first.id == second; });
              	if (indexSubcategory >= 0) {
                    TALibrary.currentQuestion.setCurrentSubcategory(parentSubcategory);
                    state.Parameters[subCategoryParameter] = new ParameterValueResponse(parentSubcategory);
                    parentCategory = TALibrary.currentQuestion.subcategories[indexSubcategory].parent;
                    indexCategory = getIndexOf(TALibrary.currentQuestion.themes, 
                                                   parentCategory, 
                                                   function (first, second) { return first.id == second; });
                  	if (indexCategory >= 0) {
                    	TALibrary.currentQuestion.setCurrentTheme(parentCategory);
                    	state.Parameters[categoryParameter] = new ParameterValueResponse(parentCategory);
                  	}
            	}
            } else {
              	indexSubcategory = getIndexOf(TALibrary.currentQuestion.subcategories, 
                                                  value, 
                                                  function (first, second) { return first.id == second; });
              	if (indexSubcategory >= 0) {
                    TALibrary.currentQuestion.setCurrentSubcategory(value);
                    state.Parameters[subCategoryParameter] = new ParameterValueResponse(value);
                    parentCategory = TALibrary.currentQuestion.subcategories[indexSubcategory].parent;    
                  
                    indexCategory = getIndexOf(TALibrary.currentQuestion.themes, 
                                                   parentCategory, 
                                                   function (first, second) { return first.id == second; });
                  if (indexCategory >= 0) {
                    	TALibrary.currentQuestion.setCurrentTheme(parentCategory);
                    	state.Parameters[categoryParameter] = new ParameterValueResponse(parentCategory);
                  	}
            	} else {
                	indexCategory = getIndexOf(TALibrary.currentQuestion.themes, 
                                                   value, 
                                                   function (first, second) { return first.id == second; });
                  	if (indexCategory >= 0) {
                    	TALibrary.currentQuestion.setCurrentTheme(value);
                    	state.Parameters[categoryParameter] = new ParameterValueResponse(value);
                  	}
                }
            }
          
          	state.Parameters[drilldownParameter] = null;
        } else {
            // {id: String, name: String, children: []}
            var hierarchy = TALibrary.currentQuestion.hierarchy;
            var functionToCompare = function(arrItem, val) {
                return arrItem.id == val;
            };

            if(state.Parameters.IsNull(attributesParameter)) {
                state.Parameters[attributesParameter] = null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
            } else {
                TALibrary.currentQuestion.setCurrentAttribute(state.Parameters.GetString(attributesParameter));
            }

            if(state.Parameters.IsNull(subCategoryParameter)) {
                state.Parameters[attributesParameter] = null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
            }else{
                var indexOfSubCategory =  getIndexOf(hierarchy, state.Parameters.GetString(subCategoryParameter), functionToCompare);
                if (indexOfSubCategory >= 0) {
                    if (getIndexOf(hierarchy[indexOfSubCategory].children, state.Parameters.GetString(attributesParameter), functionToCompare) >= 0) {
                        TALibrary.currentQuestion.setCurrentAttribute(state.Parameters.GetString(attributesParameter));
                    } else {
                        state.Parameters[attributesParameter] = null;
                        TALibrary.currentQuestion.setCurrentAttribute(null);
                    }
                }
            }

            if(state.Parameters.IsNull(categoryParameter)) {
                state.Parameters[attributesParameter] = null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                state.Parameters[subCategoryParameter] = null;
                TALibrary.currentQuestion.setCurrentSubcategory(null);
            }else{
                var indexOfCategory =  getIndexOf(hierarchy, state.Parameters.GetString(categoryParameter), functionToCompare);
                if (indexOfCategory >= 0) {
                    if (getIndexOf(hierarchy[indexOfCategory].children, state.Parameters.GetString(subCategoryParameter), functionToCompare) >= 0) {
                        TALibrary.currentQuestion.setCurrentSubcategory(state.Parameters.GetString(subCategoryParameter));
                    } else {
                        state.Parameters[attributesParameter] = null;
                        TALibrary.currentQuestion.setCurrentAttribute(null);
                        state.Parameters[subCategoryParameter] = null;
                        TALibrary.currentQuestion.setCurrentSubcategory(null);
                    }
                }
            }

            TALibrary.currentQuestion.setCurrentTheme(state.Parameters.GetString(categoryParameter));
        }

        function getIndexOf(arr, val, compare) {
            if (!arr || val == null) return -1;

            var compare = compare ? compare : function(first, second) { return first == second; };

            for (var i = 0; i < arr.length; i++) {
                if (compare(arr[i], val)) {
                    return i;
                }
            }

            return -1;
        }
  	}

    static function tblDetailedTable_Hide(context){
        return false;
    }

    static function tblDetailedTable_Render(context){
        TATableUtils.createDetailedTable(context.component, context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartTypeParameter), context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartShowParameter), context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartDistributionParameter))
    }


    static function htlIndividualResponse_Hide(context){
        return false;
    }

    static function htlIndividualResponse_Render(context){
        if (!TALibrary.questions) {
            TALibrary.setReport(context.pageContext, context.log, context.report, context.confirmit, context.user);
            TALibrary.setCurrentQuestion(context.pageContext.Items["questionID"]);
        }

        for(var i=0; i<TALibrary.currentQuestion.questionDetails.TAHitlistFields.length; i++){
            context.component.Columns.Add(TATableUtils.getTAHitlistColumn(TALibrary.currentQuestion.questionDetails.TAHitlistFields[i]));
        }
    }

    static function txtCategoryList_Hide(context){
        return false;
    }

    static function txtCategoryList_Render(context){
    var label = "Categories: ";
        context.component.Output.Append(label);
    }

    static function btnResetCategories_Hide(context){
        return false;
    }

    static function btnResetCategories_Render(context){
        context.component.Label = new Label(9,"x");
    }

    static function txtSubcategoryList_Hide(context){
        return (TALibrary.currentQuestion.currentTheme<0 || TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].children.length == 0);
    }

    static function txtSubcategoryList_Render(context){
        var label = "Subcategories: ";
        context.component.Output.Append(label);
    }

    static function lstSubcategoryList_Hide(context){
        return (TALibrary.currentQuestion.currentTheme<0 || TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].children.length == 0);
    }

    static function btnResetSubcategories_Hide(context){
        return (TALibrary.currentQuestion.currentTheme<0 || TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].children.length == 0);
    }

    static function btnResetSubcategories_Render(context){
        context.component.Label = new Label(9,"x");
    }

    static function txtAttributesList_Hide(context){
        return (TALibrary.currentQuestion.currentSubcategory<0 || TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].children.length == 0);
    }

    static function txtAttributesList_Render(context){
        var label = "Attributes: ";
        context.component.Output.Append(label);
    }

    static function lstAttributesList_Hide(context){
        return (TALibrary.currentQuestion.currentSubcategory<0 || TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].children.length == 0);
    }

    static function btnResetAttributes_Hide(context){
        return (TALibrary.currentQuestion.currentSubcategory<0 || TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].children.length == 0);
    }

    static function btnResetAttributes_Render(context){
        context.component.Label = new Label(9,"x");
    }

    static function txtDetailedHeader_Hide(context){
        return false;
    }

    static function txtDetailedHeader_Render(context){
        var label = "Category and Sentiment Analysis";
        if(TALibrary.currentQuestion.currentTheme >=0){
            label+=" for category "+TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].name
        }

        if(TALibrary.currentQuestion.currentSubcategory >=0 && TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].children.length>0){
            label+="/"+TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].name
        }
        context.component.Output.Append(label);
    }

    static function txtChartType_Hide(context){
        return false;
    }

    static function txtChartType_Render(context){
        var label = "Chart type: ";
        context.component.Output.Append(label);
    }

    static function txtChartShow_Hide(context){
        return false;
    }

    static function txtChartShow_Render(context){
        var label = "Show N rows: ";
        context.component.Output.Append(label);
    }

    static function txtChartDistribution_Hide(context){
        return (context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartTypeParameter) == "type6");
    }

    static function txtChartDistribution_Render(context){
        var label = "Distribution: ";
        context.component.Output.Append(label);
    }

    static function lstChartDistribution_Hide(context){
        return (context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TADetailedChartTypeParameter) == "type6");
    }

    static function txtIndividualHeader_Hide(context){
        return false;
    }

    static function txtIndividualHeader_Render(context){
        var label = "Individual Response Analysis";
        if(TALibrary.currentQuestion.currentTheme >=0){
            label+=" for category "+TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].name
        }

        if(TALibrary.currentQuestion.currentSubcategory >=0){
            label+="/"+TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].name
        }

        if(TALibrary.currentQuestion.currentAttribute >=0){
            label+="/"+TALibrary.currentQuestion.attributes[TALibrary.currentQuestion.currentAttribute].name
        }
        context.component.Output.Append(label);
    }

}