module.exports = function BillWithSettings(){

    var theCallCost;
    var theSmsCost;
    var theWarningLevel;
    var theCriticalLevel;

   let actionList = [];

   function setSettings(settings){
       theCallCost = Number(settings.theCallCost);
       theSmsCost = Number(settings.theSmsCost);
       theWarningLevel = settings.theWarningLevel;
       theCriticalLevel = settings.theCriticalLevel;
   }

   function getSettings(){
       return {
           theCallCost,
           theSmsCost,
           theWarningLevel,
           theCriticalLevel,
       }
   }

   function hasReachedWarningLevel(){
       const total = grandTotal()
       const reachedWarningLevel = total > theWarningLevel && total < theCriticalLevel;
       return reachedWarningLevel;
   }

   function hasReachedCriticalLevel(){
    const total = grandTotal()
    return total >=  theCriticalLevel;
}


   function recordAction(action){

    let cost = 0;
    if (action === "sms"){
        cost = theSmsCost;
    }else if (action === "call"){
        cost = theCallCost;
    }

    actionList.push({
        type: action,
        cost,
        timestamp: new Date()
    });
   }

   function actions(){
       return actionList;
   }

   function actionsFor(type){
        filteredList = [];

        //loop through all the index in the actionList array
        for(var i = 0; i < actionList.length; i++ ){
            const move = actionList[i]
            //check if this is the type we are doing the total for
            if(move.type === type){
                //push the action to the filteredList
                filteredList.push(move)
            }
        }
        return filteredList;
   }

   function getTotal(type){
    total = 0;

    //loop through all the index in the actionList array
    for(var i = 0; i < actionList.length; i++ ){
        const move = actionList[i]
        //check if this is the type we are doing the total for
        if(move.type === type){
            //add the total to list
            total += move.cost
        }
    }
    return total;

   }

   function grandTotal(){
       return getTotal("sms") + getTotal("call");
   }

   function totals(){
       let smsTotal = getTotal("sms")
       let callTotal = getTotal("call")
       return{
           smsTotal,
           callTotal,
           grandTotal : grandTotal()
       }
   }

   function color(){
       let total = grandTotal()

       if(total >= theWarningLevel && total < theCriticalLevel){
        //add the warning that will make the color red
        return "warning"
    }else if(total >= theCriticalLevel){
        return "danger"
    }
   }
return{
    setSettings,
    getSettings,
    hasReachedWarningLevel,
    hasReachedCriticalLevel,
    recordAction,
    actions,
    actionsFor,
    getTotal,
    grandTotal,
    totals,
    color,
}

   
}