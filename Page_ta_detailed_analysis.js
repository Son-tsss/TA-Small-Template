class Page_ta_detailed_analysis {
    static function Hide (context){
        return false;
    }

    static function Render (context){
        TALibrary.setReport(context.pageContext, context.log, context.report, context.confirmit, context.user);
        TALibrary.setCurrentQuestion(context.pageContext.Items["questionID"]);
        switch(context.component.SubmitSource){
            case "btnResetAttributes":
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                break;
            case "btnResetSubcategories":
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentSubcategory(null);
                break;
            case "btnResetCategories":
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                TALibrary.currentQuestion.setCurrentAttribute(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentSubcategory(null);
                context.state.Parameters[TALibrary.currentQuestion.questionDetails.TACategoryListParameter]=null;
                TALibrary.currentQuestion.setCurrentTheme(null)
                break;
            default:                
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
      
      	if (!state.Parameters.IsNull(drilldownParameter)) {
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
          
          
          	log.LogDebug('2')
              
        	if (indexAttribute >= 0) {
              
          	log.LogDebug('3')
                TALibrary.currentQuestion.setCurrentAttribute(value);
              	state.Parameters[attributesParameter] = new ParameterValueResponse(value);
             	parentSubcategory = TALibrary.currentQuestion.attributes[indexAttribute].parent;
              	indexSubcategory = getIndexOf(TALibrary.currentQuestion.subcategories, 
                                                  parentSubcategory, 
                                                  function (first, second) { return first.id == second; });
              	if (indexSubcategory >= 0) {
          	log.LogDebug('4')
                    TALibrary.currentQuestion.setCurrentSubcategory(parentSubcategory);
                    state.Parameters[subCategoryParameter] = new ParameterValueResponse(parentSubcategory);
                    parentCategory = TALibrary.currentQuestion.subcategories[indexSubcategory].parent;
                    indexCategory = getIndexOf(TALibrary.currentQuestion.themes, 
                                                   parentCategory, 
                                                   function (first, second) { return first.id == second; });
                  	if (indexCategory >= 0) {
          	log.LogDebug('5')
                    	TALibrary.currentQuestion.setCurrentTheme(parentCategory);
                    	state.Parameters[categoryParameter] = new ParameterValueResponse(parentCategory);
                  	}
            	}
            } else {
          	log.LogDebug('6')
              	indexSubcategory = getIndexOf(TALibrary.currentQuestion.subcategories, 
                                                  value, 
                                                  function (first, second) { return first.id == second; });
              	if (indexSubcategory >= 0) {
          	log.LogDebug('7')
                    TALibrary.currentQuestion.setCurrentSubcategory(value);
                    state.Parameters[subCategoryParameter] = new ParameterValueResponse(value);
                    parentCategory = TALibrary.currentQuestion.subcategories[indexSubcategory].parent;    
                  
                    indexCategory = getIndexOf(TALibrary.currentQuestion.themes, 
                                                   parentCategory, 
                                                   function (first, second) { return first.id == second; });
                  if (indexCategory >= 0) {
          	log.LogDebug('9')
                    	TALibrary.currentQuestion.setCurrentTheme(parentCategory);
                    	state.Parameters[categoryParameter] = new ParameterValueResponse(parentCategory);
                  	}
            	} else {
          	log.LogDebug('10')
                	indexCategory = getIndexOf(TALibrary.currentQuestion.themes, 
                                                   value, 
                                                   function (first, second) { return first.id == second; });
                  	if (indexCategory >= 0) {
          	log.LogDebug('11')
                    	TALibrary.currentQuestion.setCurrentTheme(value);
                    	state.Parameters[categoryParameter] = new ParameterValueResponse(value);
                  	}
                }
            }
          
          	state.Parameters[drilldownParameter] = null;
        }      
      	else
     	{        
        		if(context.state.Parameters.IsNull(TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter) || TALibrary.currentQuestion.currentSubcategory<0 || context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter)!=TALibrary.currentQuestion.subcategories[TALibrary.currentQuestion.currentSubcategory].id){
                    context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                    TALibrary.currentQuestion.setCurrentAttribute(null);
                    context.log.LogDebug("if1");
                }else{
                    TALibrary.currentQuestion.setCurrentAttribute(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TAAttributesListParameter));
                    context.log.LogDebug("else1");
                }

                if(context.state.Parameters.IsNull(TALibrary.currentQuestion.questionDetails.TACategoryListParameter) || TALibrary.currentQuestion.currentTheme<0 || context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TACategoryListParameter)!=TALibrary.currentQuestion.themes[TALibrary.currentQuestion.currentTheme].id){
                    context.state.Parameters[TALibrary.currentQuestion.questionDetails.TAAttributesListParameter]=null;
                    TALibrary.currentQuestion.setCurrentAttribute(null);
                    context.state.Parameters[TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter]=null;
                    TALibrary.currentQuestion.setCurrentSubcategory(null);
                    context.log.LogDebug("if2");
                }else{
                    TALibrary.currentQuestion.setCurrentSubcategory(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TASubcategoryListParameter));
                    context.log.LogDebug("else2");
                }

                TALibrary.currentQuestion.setCurrentTheme(context.state.Parameters.GetString(TALibrary.currentQuestion.questionDetails.TACategoryListParameter));
                
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