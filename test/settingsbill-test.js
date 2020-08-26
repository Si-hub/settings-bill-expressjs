const assert = require("assert");
const BillWithSettings = require('../settings-bill');

describe("The bill with settings function", function(){
    it("should be able to set the settings" , function(){

        let settingsBill = BillWithSettings();
        settingsBill.setSettings({
            theCallCost: 2.75,
            theSmsCost: 0.65,
            theWarningLevel: 10,
            theCriticalLevel: 20,
        })

        assert.deepEqual({
            theCallCost: 2.75,
            theSmsCost: 0.65,
            theWarningLevel: 10,
            theCriticalLevel: 20,
        }, settingsBill.getSettings());
    });

it("should return a grandTotal of 5.50 for 2 calls" , function(){

    let settingsBill = BillWithSettings();
    settingsBill.setSettings({
        theCallCost: 2.75,
        theSmsCost: 0.65,
        theWarningLevel: 10,
        theCriticalLevel: 20,
    })

    settingsBill.recordAction("call");
    settingsBill.recordAction("call");

    assert.equal(settingsBill.totals().callTotal, 5.50);
    assert.equal(settingsBill.totals().smsTotal, 0.00);
    assert.equal(settingsBill.totals().grandTotal, 5.50);
    });

    it("should return a grandTotal of 6.15 for 2 calls and 1 sms" , function(){

        let settingsBill = BillWithSettings();
    
        settingsBill.setSettings({
            theCallCost: 2.75,
            theSmsCost: 0.65,
            theWarningLevel: 10,
            theCriticalLevel: 20,
        })
    
        settingsBill.recordAction("call");
        settingsBill.recordAction("call");
        settingsBill.recordAction("sms");
    
        assert.equal(settingsBill.totals().callTotal, 5.50);
        assert.equal(settingsBill.totals().smsTotal, 0.65);
        assert.equal(settingsBill.totals().grandTotal, 6.15);
        });


    it("should know when the warning level is reached" , function(){

        let settingsBill = BillWithSettings();
        settingsBill.setSettings({
            theCallCost: 2.75,
            theSmsCost: 0.65,
            theWarningLevel: 10,
            theCriticalLevel: 20,
        })
    
        settingsBill.recordAction("call");
        settingsBill.recordAction("call");
        settingsBill.recordAction("call");
        settingsBill.recordAction("sms");
        settingsBill.recordAction("sms");
        settingsBill.recordAction("sms");
    
        assert.equal(true, settingsBill.hasReachedWarningLevel());
        });

        it("should know when the critical level is reached" , function(){

            let settingsBill = BillWithSettings();
            settingsBill.setSettings({
                theCallCost: 5.00,
                theSmsCost: 2.65,
                theWarningLevel: 10,
                theCriticalLevel: 20,
            })
        
            settingsBill.recordAction("call");
            settingsBill.recordAction("call");
            settingsBill.recordAction("call");
            settingsBill.recordAction("sms");
            settingsBill.recordAction("sms");
            settingsBill.recordAction("sms");
            
            assert.equal(true, settingsBill.hasReachedCriticalLevel());
        });

});