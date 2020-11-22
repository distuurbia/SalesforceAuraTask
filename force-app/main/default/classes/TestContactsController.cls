@isTest
public with sharing class TestContactsController {
    private static final String LAST_NAME = 'testCont';

    @TestSetup
    static void makeData(){
        Contact[] contacts = new Contact[] {
            new Contact(LastName= LAST_NAME +'0', Contact_Level__c = 'Primary'),
            new Contact(LastName= LAST_NAME + '1', Contact_Level__c = 'Secondary'),
            new Contact(LastName= LAST_NAME + '2', Contact_Level__c = 'Tertiary')
        };
        insert contacts;
    }
    
    @isTest
    public static void testGetContactsNoQuery() {
        Test.startTest();
        List<Contact> contacts = ContactsController.getContacts('', 1);
        Test.stopTest();

        System.assertEquals(3, contacts.size());
    }

    @isTest
    public static void testGetContactsWithQuery() {
        List<Contact> testContacts =[SELECT LastName FROM Contact];
        Id [] fixedSearchResults= new Id[3];
        fixedSearchResults[0] = testContacts[0].Id;
        fixedSearchResults[1] = testContacts[1].Id;
        fixedSearchResults[2] = testContacts[2].Id;
        
        Test.setFixedSearchResults(fixedSearchResults);

        List<Contact> contacts = ContactsController.getContacts(LAST_NAME, 1);

        System.assertEquals(3, contacts.size());
    }

    @isTest
    public static void testDeleteContact() {
        String searchName= LAST_NAME + '0';
        Contact c = [SELECT Id FROM Contact WHERE Name = :searchName LIMIT 1];

        Test.startTest();
        ContactsController.deleteContact(c.Id);
        Test.stopTest();

        List<Contact> contacts = [SELECT Id FROM Contact WHERE Name = :searchName LIMIT 1];
        System.assertEquals(0, contacts.size());

    }

    @isTest
    public static void testCreateContact() {
        Contact c = new Contact(LastName=LAST_NAME);

        Test.startTest();
        ContactsController.createContact(c);
        Test.stopTest();

        List<Contact> contacts = [SELECT Id FROM Contact WHERE Name = :LAST_NAME];
        System.assertEquals(1, contacts.size());
    }
}
