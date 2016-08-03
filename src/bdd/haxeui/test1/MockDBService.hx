package bdd.haxeui.test1;

class MockDBService {
    private var _records:Array<MockDBRecord> = new Array<MockDBRecord>();
    
    public function new() {
        
    }
    
    public function getRecord(id:String):MockDBRecord {
        var record:MockDBRecord = null;
        for (test in _records) {
            if (test.id == id) {
                record = test;
                break;
            }
        }
        return record;
    }
    
    public function addRecord(record:MockDBRecord):Bool {
        if (hasRecord(record.id)) {
            throw 'Record ${record.id} already exists';
        }
        //trace('Adding record: ${record}');
        _records.push(record);
        return true;
    }
    
    public function updateRecord(record:MockDBRecord):Bool {
        if (hasRecord(record.id) == false) {
            throw 'Record ${record.id} does not exist';
        }
        
        var record:MockDBRecord = getRecord(record.id);
        record.name = record.name;
        record.value = record.value;
        
        return true;
    }
    
    public function verifyRecord(record:MockDBRecord):Bool {
        if (hasRecord(record.id) == false) {
            throw 'Record ${record.id} does not exist';
        }
        
        var test:MockDBRecord = getRecord(record.id);
        if (test.name != record.name) {
            throw 'Found records name doesnt match';
        }
        if (test.value != record.value) {
            throw 'Found records value doesnt match';
        }
        
        //trace('Verifying record: ${record}');
        return true;
    }
    
    public function deleteRecord(id:String):Bool {
        if (hasRecord(id) == true) {
            //trace('Deleting record: ${id}');
            var record = getRecord(id);
            _records.remove(record);
        }
        return true;
    }
    
    public function hasRecord(id:String):Bool {
        return getRecord(id) != null;
    }
}
