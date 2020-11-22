({
    init : function(cmp, event, helper) {
        cmp.set("v.pageNum", 1);
        helper.initColumns(cmp);
        helper.getContactList(cmp);
    },

    submitContactName : function(cmp, event, helper) {
        helper.getContactList(cmp);
    },
    
    onCreatePressed: function(cmp, event, helper) {
        helper.createNewAccount(cmp);
    },

    deleteContactById: function(cmp, event, helper){
        console.log(JSON.stringify(event));
        helper.deleteContactById(cmp, event.Uo.row.Id);
    },

    handleNext: function(cmp, event, helper) {
        var pageNumber = cmp.get("v.pageNum");
        cmp.set("v.pageNum", pageNumber + 1);
        helper.getContactList(cmp);
    },

    handlePrevious: function(cmp, event, helper) {
        var pageNumber = cmp.get("v.pageNum");
        cmp.set("v.pageNum", pageNumber - 1);
        helper.getContactList(cmp);
    },

    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
})