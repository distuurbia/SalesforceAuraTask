trigger ContactTrigger on Contact (after insert) {
    TriggerDispatcher.execute(new ContactTriggerHandler());
}