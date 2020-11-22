({
    initColumns : function(cmp) {
        cmp.set('v.columns', [
            {label: 'First Name', fieldName: 'FirstName', type: 'text', sortable: true},
            {label: 'Last Name', fieldName: 'LastName', type: 'text', sortable: true},
            {label: 'Email', fieldName: 'Email', type: 'email', sortable: true},
            {label: 'Account Name', fieldName: 'AccountName', type: 'text', sortable: true},
            {label: 'Owner', fieldName: 'OwnerName', type: 'text', sortable: true},
            {label: 'Created by', fieldName: 'CreatedByName', type: 'text', sortable: true},
            {label: 'CreatedDate', fieldName: 'CreatedDate', type:'Date', sortable: true},
            {label: 'Contact Level', fieldName: 'Contact_Level__c', type:'text', sortable: true},
            {label: 'Action', type: 'button', typeAttributes: {
                    label: 'Delete',
                    name: 'deleteContact'
                }
            }
        ]);
    },

    getContactList : function(cmp) {
        let getContactsAction = cmp.get("c.getContacts");
        getContactsAction.setParam("query", cmp.get("v.query"));
        getContactsAction.setParam("pageNum", cmp.get("v.pageNum"));

        getContactsAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let isEmpty = response.getReturnValue().length == 0;
                cmp.set("v.isNextEmpty", isEmpty);
                let pageNum =  cmp.get("v.pageNum");
                if(!isEmpty) {
                    var contacts = response.getReturnValue();
                    this.alignContactsToTable(contacts)
                    cmp.set("v.contacts", contacts);
                } else if(pageNum > 1){
                    cmp.set("v.pageNum", pageNum- 1);
                }
            }
        });
        $A.enqueueAction(getContactsAction);

    }, 

    alignContactsToTable : function(rows) {
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            // checking if any account related data in row
            if (row.Account) {
                row.AccountName = row.Account.Name;
            }
            // checking if any owner related data in row
            if(row.Owner) {
                row.OwnerName = row.Owner.Name;
            } 

            if(row.CreatedBy) {
                row.CreatedByName = row.CreatedBy.Name;
            }
            // formatting created date 
            row.CreatedDate = $A.localizationService.formatDate(row.CreatedDate, "MMMM DD YYYY, hh:mm:ss a");
        }
    },

    deleteContactById: function(cmp, contactId) {
        let deleteContactAction = cmp.get("c.deleteContact");
        deleteContactAction.setParam("contactId", contactId);

        deleteContactAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                this.getContactList(cmp);
                this.showToast("Success", "Contact successfully deleted", "success");
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        this.showToast("Error", errors[0].message, "error");
                    }
                }
            }
        });
        $A.enqueueAction(deleteContactAction);
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

    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.contacts");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse));
        cmp.set("v.contacts", data);
    },

    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
})