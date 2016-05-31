# TA-Small-Template

Codelibrary scripts for the temporary Reportal TA template

## Config

```js
class TAConfig {
    static var TAQuestions=[

        // ***** Change these variables to include the correct information

        //Question 1
        {
          	TADatasourceId: "ds0",  // the Reportal Data Source ID of the dataset
          	DatabaseSchemaId: 6449, //Schema containig TA model
            DatabaseTableName: "Retail Model", //Table containing TA model
            TAQuestionId: "comment2779", //unique id for question+model
            TAQuestionName: "comment2", // the question ID of the Text Analytics verbatim question
            TAModelNo : "779",	// the Genius Model ID

            TATimeVariable: "interview_start",
          	TACategoryListParameter: "pCategoryList",
          	TADetailedChartShowParameter: "pDetailedChartShow",
          	TADetailedChartTypeParameter: "pDetailedChartType",
          	TAHitlistFields: ["respid","interview_start","verbatim","overallsentiment","categories","mode"]
        },


      //Question2
      {
          	TADatasourceId: "ds0",  // the Reportal Data Source ID of the dataset
          	DatabaseSchemaId: 6449, //Schema containig TA model
            DatabaseTableName: "Retail Model", //Table containing TA model
            TAQuestionId: "comment2779", //unique id for question+model
            TAQuestionName: "comment2", // the question ID of the Text Analytics verbatim question
            TAModelNo : "779",	// the Genius Model ID

            TATimeVariable: "interview_start",
          	TACategoryListParameter: "pCategoryList",
          	TADetailedChartShowParameter: "pDetailedChartShow",
          	TADetailedChartTypeParameter: "pDetailedChartType",
          	TAHitlistFields: ["respid","interview_start","verbatim","overallsentiment","categories","mode"]
        },
    ];
}
```


