
var MessageBoxType = {
    "ALERT": 1
    , "ERROR": 2
    , "INFO": 3
    , "QUESTION": 4
    , "WARNING": 5
    , "CONFIRM": 6
    , "USER": 999
}

var MessageBoxButtons = {
    "OK": 1
    , "OK_CANCEL": 2
    , "YES": 3
    , "YES_NO": 4
    , "YSE_NO_CANCEL": 5
    , "CLOSE" : 6
    , "NONE": 998
    , "USER": 999
}
var MessageBoxAline = {
    "LEFT": 1
    , "CENTER": 2
    , "RIGHT": 3
}

var MESSAGE_RESULT = {
    "OK": 1
    , "CANCEL": 2
    , "YES": 3
    , "NO": 4
    , "CLOSE": 6
}


function fnMessageBox(text, options, fnUseCallback) {
    var dOption = {
        "type": MessageBoxType.ALERT
            , "buttons": MessageBoxButtons.OK
            , "aline": MessageBoxAline.CENTER
            , "title": ""
            , "width": 400
            , "height": 300
            , "outoScroll": false
            , "userButtons": null
            , "userIconUrl": ""
            , "userIconSize": { "width": 16, "height": 12 }
            , "fn": {
                "close": function () {
                    dialogDiv.dialog("close");
                    if (fnUseCallback) {
                        fnUseCallback(MESSAGE_RESULT.CLOSE, { "sender": dialogDiv });
                    }
                }
                , "preClose": function () { }
                , "closed": function () { }
                ,
                "ok": function () {
                    dialogDiv.dialog("close");
                    if (fnUseCallback) {
                        fnUseCallback(MESSAGE_RESULT.OK, { "sender": dialogDiv });
                    }
                }
                , "preOk": function () { }
                , "oked": function () { }
                ,
                "yes": function () {
                    dialogDiv.dialog("close");
                    if (fnUseCallback) {
                        fnUseCallback(MESSAGE_RESULT.YES, { "sender": dialogDiv });
                    }
                }
                , "preYes": function () { }
                , "yesed": function () { }
                , "no": function () {
                    dialogDiv.dialog("close");
                    if (fnUseCallback) {
                        fnUseCallback(MESSAGE_RESULT.NO, { "sender": dialogDiv });
                    }
                }
                , "preNo": function () { }
                , "noed": function () { }
                , "cancle": function () {
                    dialogDiv.dialog("close");
                    if (fnUseCallback) {
                        fnUseCallback(MESSAGE_RESULT.CANCEL, { "sender": dialogDiv });
                    }
                }
                , "preCancle": function () { }
                , "cancled": function () { }
            }
        }
        // 초기값을 설정

    if (options && options.fn) {
        options.fn = jQuery.extend(dOption.fn, options.fn || {});
    }

    if (options && options.userIconSize) {
        options.userIconSize = jQuery.extend(dOption.userIconSize, options.userIconSize || {});
    }
    var option = jQuery.extend(dOption, options || {});



    //내부 함수 정의
    this.getTitle = function (title, option) {

        if (title) {
            return title;
        }

        switch (option.type) {
            case MessageBoxType.ALERT:
                return "경고";
            case MessageBoxType.ERROR:
                return "오류";
            case MessageBoxType.INFO:
                return "알림";
            case MessageBoxType.QUESTION:
                return "문의";
            case MessageBoxType.WARNING:
                return "위험";
            default:
                return "알림";
        }
    }

    var btnClose = {
        text: "닫기",
        click: function () {
            option.fn.preClose();
            option.fn.close();
            option.fn.closed();
        }
    };

    var btnOk = {
        text: "확인",
        click: function () {
            option.fn.preOk();
            option.fn.ok();
            option.fn.oked();
        }
    };

    var btnYes = {
        text: "예",
        click: function () {
            option.fn.preYes();
            option.fn.yes();
            option.fn.yesed();
        }
    };

    var btnNo = {
        text: "아니오",
        click: function () {
            option.fn.preNo();
            option.fn.no();
            option.fn.noed();
        }
    };
    var btnCancle = {
        text: "취소",
        click: function () {
            option.fn.preCancle();
            option.fn.cancle();
            option.fn.cancled();
        }
    };



    // 버튼 설정
    var buttons = new Array();

    switch (option.buttons) {
        case MessageBoxButtons.OK:
            buttons.push(btnOk);
            break;
        case MessageBoxButtons.OK_CANCEL:
            buttons.push(btnOk);
            buttons.push(btnCancle);
            break;
        case MessageBoxButtons.YES:
            buttons.push(btnYes);
            break;
        case MessageBoxButtons.YES_NO:
            buttons.push(btnYes);
            buttons.push(btnNo);
            break;
        case MessageBoxButtons.YSE_NO_CANCEL:
            buttons.push(btnYes);
            buttons.push(btnNo);
            buttons.push(btnCancle);
            break;
        case MessageBoxButtons.CLOSE:
            buttons.push(btnClose);
            break;
        case MessageBoxButtons.USER:
            buttons = option.userButtons;
            break;
    }


    var dialogDiv = jQuery("<div></div>");

    dialogDiv.attr("title", getTitle(option.title, option));
    var contentP = jQuery("<p></p>");
    contentP.html(text);
    dialogDiv.append(contentP);

    dialogDiv.dialog({
        autoOpen: true,
        width: option.width,
        buttons: buttons
    });


	event.preventDefault();

    // 생성된 MessageBox 객체 반환
	return dialogDiv;

}