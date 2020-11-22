public class TriggerDispatcher {
    public static void execute(TriggerInterface handler){
        switch on Trigger.operationType {
           when  BEFORE_INSERT{
               handler.beforeInsert(Trigger.new);
           }
           when  BEFORE_DELETE{
                handler.beforeDelete(Trigger.old);
           }
           when  BEFORE_UPDATE{
               handler.beforeUpdate(Trigger.new, Trigger.old);
           }
           when  AFTER_UPDATE{
               handler.afterUpdate(Trigger.new, Trigger.old);
           }
           when  AFTER_INSERT{
                handler.afterInsert(Trigger.new);
           }
           when  AFTER_DELETE{
                handler.afterDelete(Trigger.old);
           }
           when  AFTER_UNDELETE{
                handler.afterUnDelete(Trigger.new);
           }
        }
    }
}