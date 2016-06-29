# TA-Small-Template

Codelibrary scripts for the temporary Reportal TA template

## Config

```js
class TAConfig {
  static var Design={

    Logo: "/isa/DYOIIYHQMFFRFADFGXOAPVARPMKAPMEA/Best%20Buy%20UK/SAP_bb_logo.gif",
    ReportName: "Text Analytics Dashboard",
    DefaultColor: "#003B64",
    NegNeuPosPalette: {
    	Negative: "#F44336",
    	Neutral: "#FFEB3B",
    	Positive: "#4CAF50"
  	}
  };

    static var TAQuestions=[

        // ***** Change these variables to include the correct information

        //Question 1
        {
          	TADatasourceId: "ds0",  // the Reportal Data Source ID of the dataset
          	DatabaseSchemaId: 6449, //Schema containig TA model
            DatabaseTableName: "Retail Model", //Table containing TA model
          	TARelationshipColumnName: "Relationship",
            TAQuestionId: "comment2779", //unique id for question+model
            TAQuestionName: "comment2", // the question ID of the Text Analytics verbatim quesiton
            TAModelNo : "779",	// the Genius Model ID

            OverallAnalysisPageId: "ta_overall_analisys",
            DetailedAnalysisPageId: "ta_detailed_analysis",
            TATimeVariable: "interview_start",
          	TACategoryListParameter: "pCategoryList",
          	TASubcategoryListParameter: "pSubcategoryList",
          	TAAttributesListParameter: "pAttributesList",
          	TADetailedChartShowParameter: "pDetailedChartShow",
          	TADetailedChartTypeParameter: "pDetailedChartType",
          	TADetailedChartDistributionParameter: "pDetailedChartDistribution",
          	TAHitlistFields: ["respid","interview_start","verbatim","overallsentiment","categories"]
        },


      //Question2
      {
          	TADatasourceId: "ds0",  // the Reportal Data Source ID of the dataset
          	DatabaseSchemaId: 6449, //Schema containig TA model
            DatabaseTableName: "Retail Model", //Table containing TA model
        	TARelationshipColumnName: "Relationship",
            TAQuestionId: "comment2779", //unique id for question+model
            TAQuestionName: "comment2", // the question ID of the Text Analytics verbatim quesiton
            TAModelNo : "779",	// the Genius Model ID

            OverallAnalysisPageId: "ta_overall_analisys",
            DetailedAnalysisPageId: "ta_detailed_analysis",
            TATimeVariable: "interview_start",
          	TACategoryListParameter: "pCategoryList",
        	TASubcategoryListParameter: "pSubcategoryList",
        	TAAttributesListParameter: "pAttributesList",
          	TADetailedChartShowParameter: "pDetailedChartShow",
          	TADetailedChartTypeParameter: "pDetailedChartType",
          	TADetailedChartDistributionParameter: "pDetailedChartDistribution",
          	TAHitlistFields: ["respid","interview_start","verbatim","overallsentiment","categories"]
        }
    ];
}
```


