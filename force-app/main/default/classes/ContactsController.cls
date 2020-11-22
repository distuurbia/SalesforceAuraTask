public class ContactsController {
    private static final Integer PAGE_SIZE = 10;
    
    @AuraEnabled
    public static List<Contact> getContacts(String query, Integer pageNum){

        Integer offset = (pageNum - 1) * PAGE_SIZE;
        if(query == '' || query == null) {
            return [SELECT FirstName, LastName, Email, Owner.Name, Account.Name, CreatedBy.Name, CreatedDate, Contact_Level__c FROM Contact ORDER BY CreatedDate desc LIMIT :PAGE_SIZE OFFSET :offset];
        } else {
            String queryString = 'FIND \'*' + query + '*\' IN NAME FIELDS RETURNING Contact(FirstName, LastName, Email, Account.Name, Owner.Name, CreatedBy.Name, CreatedDate, Contact_Level__c LIMIT :PAGE_SIZE OFFSET :offset)';
            List<List<sObject>> results = Search.query(queryString);

            return (List<Contact>)results[0];
        }
    }

    @AuraEnabled
    public static void deleteContact(String contactId){
       Contact contact = new Contact(Id = contactId);
       List<Case> relatedCases = [SELECT Id FROM Case WHERE ContactId= :contactId];
       delete relatedCases;
       delete contact;
    }

    @AuraEnabled
    public static void createContact(Contact newContact){ 
    	insert newContact;
    }

    @AuraEnabled
    public static List<Account> getAccounts(){ 
    	return [SELECT Name FROM Account];
    }
    
    @AuraEnabled
    public static List<String> getContactLevels(){
        List<String> pickListValues= new List<String>();
		Schema.DescribeFieldResult fieldResult = Contact.Contact_Level__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValues.add(pickListVal.getLabel());
        }     
        system.debug(pickListValues);
		return pickListValues;
    }
}