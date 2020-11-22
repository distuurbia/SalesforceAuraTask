@isTest
public with sharing class TestContactTrigger {
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
    public static void testCasesCreated() { 
        String searchKeyword = LAST_NAME + '%';
        List<Contact> contacts = [SELECT LastName, (SELECT Priority FROM Cases) FROM Contact WHERE LastName LIKE :searchKeyword ORDER BY LastName ASC];

        System.assertEquals('High', contacts[0].Cases[0].Priority);
        System.assertEquals('Medium', contacts[1].Cases[0].Priority);
        System.assertEquals('Low', contacts[2].Cases[0].Priority);
    }
}
