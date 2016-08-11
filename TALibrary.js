class TALibrary extends TAConfig{
    //Globals
    static var flag: Boolean = false;
    static var pageContext: ScriptPageContext;
    static var log: Logger;
    static var report: Report;
    static var confirmit: ConfirmitFacade;
    static var user: User;

    static var questions = [];
    static var currentQuestion: TAQuestion;

    /**
     * function to configure TA variables and set globals to libraries
     * @param {Logger} l - log
     * @param {Report} r - report
     * @param {ConfirmitFacade} c - confirmit
     * @param {User} u - user
     */
    static function setReport(p: ScriptPageContext,l: Logger,r: Report,c: ConfirmitFacade,u: User){
        var question: TAQuestion;

   		pageContext = p,
		log = l;
		report = r;
		confirmit = c;
		user = u;

		setGlobals(pageContext,log,report,confirmit,user);
			
		if(!flag){
			log.LogDebug("setReportAgain");
			
            for(var i = 0 ; i<TAQuestions.length; i++){
                question = new TAQuestion(log,report,confirmit,user,TAQuestions[i]);
                questions.push(question);
            }

            currentQuestion = questions[0];
            flag = true;
        }
    }

    /**
     * function to transfer globals to libraries
     * @param {Report} r - report
     * @param {ConfirmitFacade} c - confirmit
     * @param {User} u - user
     */
    static function setGlobals(p: ScriptPageContext,l: Logger,r: Report,c: ConfirmitFacade,u: User){
        pageContext = p;
        log = l;
        report = r;
        confirmit = c;
        user = u;

        try{
            TATableUtils.setGlobals(pageContext,log,report,confirmit,user);
        }catch(e){
            log.LogDebug("There is no TATableUtils Class. "+e);
        }

        try{
            TAFilterUtils.setGlobals(pageContext,log,report,confirmit,user);
        }catch(e){
            log.LogDebug("There is no TAFilterUtils Class. "+e);
        }

        try{
            TAParameterUtils.setGlobals(pageContext,log,report,confirmit,user);
        }catch(e){
            log.LogDebug("There is no TAParameterUtils Class. "+e);
        }

        try{
            TAChartUtils.setGlobals(pageContext,log,report,confirmit,user);
        }catch(e){
            log.LogDebug("There is no TAChartUtils Class. "+e);
        }
      
      	try{
            ZoomableTreemap.setGlobals(pageContext,log,report,confirmit,user);
        }catch(e){
            log.LogDebug("There is no ZoomableTreemap Class. "+e);
        }
      
      	try{
            TATableData.setGlobals(pageContext,log,report,confirmit,user);
        }catch(e){
            log.LogDebug("There is no TATableData Class. "+e);
        }
    }

    /**
     * function to set current TA question
     * @param {Byte} i - question number in TAConfig
     */
    static function setCurrentQuestion(i){
        if(!i || i>=questions.length){
            currentQuestion = questions[0];
        }else{
            currentQuestion = questions[i];
        }
    }
}