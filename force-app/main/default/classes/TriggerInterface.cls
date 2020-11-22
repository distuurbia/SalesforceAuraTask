public interface TriggerInterface {
    void beforeInsert(List<SObject> newRecordsList);

    void afterInsert(List<SObject> newRecordsList);
    
    void beforeUpdate(List<SObject> newRecordsList, List<SObject> oldRecordsList);
    
    void afterUpdate(List<SObject> newRecordsList,  List<SObject> oldRecordsList);
                
    void beforeDelete(List<SObject> oldRecordsList);

    void afterDelete(List<SObject> oldRecordsList);

    void afterUnDelete( List<SObject> newRecordsList);
    
}