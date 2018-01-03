// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
window.Global = {
    diShuTotalNumber: 1,
    letterTotalNumber: 25,  //index from 0
	letterACode: 65,
};

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        _currentLetter: null,
        _dishumen:null,
        _currDishuNode: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._dishumen = this.node.children;
        console.log("Cleaning all dishu...");
        for(var i=0; i<this._dishumen.length; i++) {
        	this._dishumen[i].active = false;
        }
        
        console.log("Init one dishu...");
    	this._newDiShu();
    	
        // keyboard events
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: (keyCode, event) => {
                this._keyHandler(keyCode, true);
            }//,
            //onKeyReleased: (keyCode, event) => {
            //    this._keyHandler(keyCode, false);
            //},
        }, this.node);
    },

	_keyHandler: function(keyCode, isDown) {
        console.log('current letter:'+this._currentLetter+", PresedKey:"+String.fromCharCode(keyCode) );
        if( this._currentLetter.charCodeAt() == keyCode  ){
            console.log('Hit!!!!');
            // console.log('Hit'+this._currDishuNode.getComponent(cc.Sprite).sprite-frame);
            // console.log('Hit'+this._currDishuNode.Sprite.sprite-frame);
            this._currDishuNode.active = false;
            this._newDiShu();
        } else {
        	console.log('Missed ~~~');

        }
        /*
        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this._left = isDown;
                this._updateMove(-1);
                break;
            default:
                return;
        }*/
    },
    
    _newDiShu: function() {
		var num = this._GetRandomNum(1, Global.diShuTotalNumber);  //包括左右边界
		var letterNum = this._GetRandomNum(0, Global.letterTotalNumber);  // 字母个数
		var randLetter = String.fromCharCode(Global.letterACode + letterNum); // A: 65
		console.log("Get dishu"+num);
		this._currDishuNode = this.node.getChildByName("dishu"+num);
		this._currDishuNode.active = true;
		this._currDishuNode.getChildByName("letter").getComponent(cc.Label).string = randLetter;
        this._currentLetter = randLetter;
        console.log("Current letter is:"+this._currentLetter);
    },
    
    _GetRandomNum: function (Min,Max)
	{   
		var Range = Max - Min;   
		var Rand = Math.random();   //范围[0~1]
		return(Min + Math.round(Rand * Range));   
	},   
	  
    start () {
    	console.log("start function invoked");
    },

    // update (dt) {},
});
