({
    doinit : function(component, event, helper) {
       var contactStub = { 'sobjectType': 'Contact'
        };

        component.set("v.contactForm", contactStub);
        try {
       
        console.log("dw");
        }catch(e) {
            console.log('init' + JSON.stringify(e));
        }
    },
    
    newPopup : function(component, event, helper){
        helper.initLevelPicklist(component);
        helper.initAccountList(component);
        var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
    },
    
    saveModal : function(component, event, helper){
       helper.createNewContact(component);
    },
    
    closeNewModal : function(component, event, helper){
        var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
    },
})