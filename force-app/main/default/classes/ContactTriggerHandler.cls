public with sharing class ContactTriggerHandler implements TriggerInterface {
    public void afterUpdate(List<SObject> newRecordsList, List<SObject> oldRecordsList){    }

    public void afterInsert(List<SObject> newRecordsList){
        List<Case> newCases = new List<Case>();
        for(Contact c: (List<Contact>) newRecordsList) {
            Case newCase = new Case(ContactId = c.Id, Status='Working', Origin='New Contact', OwnerId=c.OwnerId);

            switch on c.Contact_Level__c {
                when 'Primary' {
                    newCase.Priority='High';
                }
                when 'Secondary' {
                    newCase.Priority='Medium';
                } 
                when 'Tertiary' {
                    newCase.Priority='Low';
                }
            }

            newCases.add(newCase);
        }

        insert newCases;
    }
    
    public void beforeUpdate(List<SObject> newRecordsList, List<SObject> oldRecordsList){}

    public void beforeInsert(List<SObject> newRecordsList){}

    public void beforeDelete(List<SObject> oldRecordsList){}

    public void afterDelete(List<SObject> oldRecordsList){}

    public void afterUnDelete(List<SObject> newRecordsList){}
}