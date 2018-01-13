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
    diShuTotalNumber: 9,
    letterTotalNumber: 25,  //index from 0
	letterACode: 65,
};

var egg_sprite = null;
var egg_open_sprite = null;
// 加载 Texture，不需要后缀名

cc.Class({
    extends: cc.Component,
    properties: {
        _currentLetter: null,
        _dishumen:null,
        _currDishuNode: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._dishumen = this.node.children;
        console.log("Cleaning all dishu...");
        for(var i=0; i<this._dishumen.length; i++) {
        	this._dishumen[i].active = false;
        }

        cc.loader.loadRes("imgs/egg", cc.SpriteFrame, function (err, spriteFrameEgg) {
            if (err) {
                cc.error(err.message || err);
                console.log("DEBUG: err"+err);
                return;
            }
            egg_sprite = spriteFrameEgg;
        });
        // load the sprite frame of (project/assets/resources/imgs/eggopen.png) from resources folder
        cc.loader.loadRes('imgs/eggopen', cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                console.log("DEBUG: err"+err);
                return;
            }
            // cc.log('Result should be a sprite frame: ' + (spriteFrame instanceof cc.SpriteFrame));
            egg_open_sprite = spriteFrame;
        });

        console.log("Init one dishu...");
        this.scheduleOnce(function () {
            //2秒钟后执行
            this._newDiShu();
        },1);

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
        var audios = this.getComponents(cc.AudioSource);
        console.log('current letter:'+this._currentLetter+", PresedKey:"+String.fromCharCode(keyCode) );
        if( this._currentLetter.charCodeAt() == keyCode  ){
            console.log('Hit!!!!');
            //更改成功的egg图片
            this._currDishuNode.getChildByName("egg").getComponent(cc.Sprite).spriteFrame = egg_open_sprite;
            this._currDishuNode.getChildByName("letter").active=false;
            //播放成功声音声音
            audios[0].play();
            //显示3秒钟egg_open图片后，更换egg
            this.scheduleOnce(function () {
                //2秒钟后执行
                this._currDishuNode.active = false;
                this._newDiShu();
            },2);
        } else {
        	console.log('Missed ~~~');
            // 播放失败声音
            audios[1].play();
        }
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
        // recover egg
        this._currDishuNode.getChildByName("egg").getComponent(cc.Sprite).spriteFrame = egg_sprite;
        this._currDishuNode.getChildByName("letter").active=true;
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
