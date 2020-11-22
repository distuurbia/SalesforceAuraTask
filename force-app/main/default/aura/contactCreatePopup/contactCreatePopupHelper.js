({
    createNewContact: function(component){
        var contactForm = component.get("v.contactForm");
        var action = component.get("c.createContact");
        action.setParams({newContact  : contactForm});
        action.setCallback(this, function(response) {
            var state = response.getState();          
            if (state === "SUCCESS") {
                this.showToast("Success", "Contact successfully created", "success");
                $A.get('e.force:refreshView').fire();
                var cmpTarget = component.find('Modalbox1');
                var cmpBack = component.find('Modalbackdrop');
                $A.util.removeClass(cmpBack,'slds-backdrop--open');
                $A.util.removeClass(cmpTarget, 'slds-fade-in-open');

                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        this.showToast("Error", errors[0].message, "error");
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } 
                else {
                    console.log(response.getReturnValue());
                }
            }
        });
        $A.enqueueAction(action);
    },

    showToast : function(title, message, type) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type
        });
        toastEvent.fire();
    },

    initLevelPicklist : function(component) {
        var action = component.get("c.getContactLevels");
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if (state === "SUCCESS") {
                console.log("resp" +JSON.stringify(response));
                var contactLevels = response.getReturnValue();
                console.log("lev" + JSON.stringify(contactLevels));
                var picklistOptions = [];
                for(var i = 0; i < contactLevels.length; i++) {
                    var row = contactLevels[i];
                    var option = {label: row, value: row};
                    picklistOptions.push(option);
                }
                component.set("v.contactLevels", picklistOptions);
            
            } else {
                console.log("p" +state);
            }
        });
        $A.enqueueAction(action);
    },

    initAccountList : function(component) {
        var action = component.get("c.getAccounts");
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if (state === "SUCCESS") {
                var accounts = response.getReturnValue();
                console.log("accounts" + JSON.stringify(accounts));
                for(var i = 0; i < accounts.length; i++) {
                    console.log('ef');
                    var row = accounts[i];
                    row.label = row.Name;
                    row.value = row.Id;
                }
                component.set("v.accountOptions", accounts);
            }
            else {
                console.log("p" +state);
            }
        });
        $A.enqueueAction(action);
    }
})
