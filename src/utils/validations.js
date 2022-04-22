//內部驗證規則//定義正則表達式
const
    hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
    hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
    hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
    rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
    rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,
    emailPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
    positiveIntegerIncludeZero = /^\+?[1-9][0-9]*$|^(0|[1-9][0-9]*)$/,
    //包含0的正整數
    positiveInteger = /^\+?[1-9][0-9]*$/,
    // 限定英數字
    limitEN = /^[A-Za-z0-9]+$/,
    //正整數
    numberPattern = /^[0-9]*$/
//0-9
//定義規則引用
export const Rules = {
    date: v => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v) || '請輸入正確的日期格式',
    time: v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v) || '請輸入正確的時間格式',
    // fulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
    // timeOrFulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),    hexColor: v => hex.test(v),
    hexaColor: v => hexa.test(v),
    hexOrHexaColor: v => hexOrHexa.test(v),
    rgbColor: v => rgb.test(v),
    rgbaColor: v => rgba.test(v),
    rgbOrRgbaColor: v => rgb.test(v) || rgba.test(v),
    hexOrRgbColor: v => hex.test(v) || rgb.test(v),
    hexaOrRgbaColor: v => hexa.test(v) || rgba.test(v),
    anyColor: v => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v),
    email: v => emailPattern.test(v) || '請輸入正確的信箱格式',
    required: v => !!v || '該欄位為必填項目',
    requiredSelect: v => !!v ? v.length > 0 || `至少需選擇一個項目` : true,
    //   required: (label,v) => !!v || ``${label?label:'該欄位'}該欄位為必填項目`,
    maxSize: (label, Length, v) =>
        v => !!v ? v.length <= Length || `${label ? label : '該欄位'}不得超過${Length}字` : true,
    //存在再判斷長度，否則會出錯
    minSize: (label, Length, v) =>
        v => !!v ? v.length >= Length || `${label ? label : '該欄位'}必須超過${Length}字` : true,
    //如果該欄位必須大於多少字，那邏輯上應該是必填?若需要處理非必填，要改這邊}
    rangeSize: (label, min, max, v) => v => !!v ? v.length >= min && v.length <= max || `${label ? label : '該欄位'}必須介於${min}至${max}字之間` : true,
    rangeNumber: (label, min, max, v) => v => !!v ? v >= min && v <= max || `${label ? label : '該欄位'}必須介於${min}~${max}之間` : true,
    //欄位必須填的長度
    mustSize: (label, Length, v) =>
        v => !!v ? v.length == Length || `${label ? label : '該欄位'}長度必須為${Length}字` : true,
    //自然數(正整數或零)    
    naturalNumberIZ: v => v ? positiveIntegerIncludeZero.test(v) || "該欄位需為正整數或零" : true,
    naturalNumber: v => v ? positiveInteger.test(v) || "該欄位需為正整數" : true,
    notZero: v => v ? v != 0 || '該欄位不得為零' : true,
    //以上三項不處理必填
    maxNumber: (max, v) => v => !!v ? v <= max || `該欄位不得超過${max}` : true,
    minNumber: (min, v) => v => !!v ? v >= min || `該欄位不得低於${min}` : true,
    // 限定英數字
    checkEeglishNum: v => v ? limitEN.test(v) || "該欄位限英數字" : true,

    // #region ITEM的驗證
    responseError(name) {
        const err = _.join(
            // 多個項目間逗號
            _.map(
                _.filter(this.errorMessage, function (item, index, array) {
                    //過濾項目，保留符合KEY值得
                    return _.upperCase(item.Key) == _.upperCase(name) ? item : false;
                    //upperCase解決API跟後端名稱大小寫不同的問題
                }),
                function (item, index, array) {
                    return item.Message;
                    //取每一個的MESSAGE
                }
            ),
            "、"
        );
        return err;
    },
    responseErrorHas(name) {
        //一項符合就回傳TRUE，觸發responseError事件
        const errHas = _.some(this.errorMessage, function (item, index, array) {
            return _.upperCase(item.Key) == _.upperCase(name);
            //upperCase解決API跟後端名稱大小寫不同的問題
        });
        return errHas;
    },
    blurError(name) {
        //    比對是否符合(?
        this.responseErrorHas(name) ? this.removeError(name) : "nothing";
    },
    //驗證
    removeError(name) {
        // blur狀態時把驗證項目移除
        // 傳進來的值，要去判斷錯誤訊息，然後移除
        this.errorMessage = _.remove(this.errorMessage, function (item, index, array) {
            //過濾項目，保留符合KEY值得
            return _.upperCase(item.Key) == _.upperCase(name) ? false : true;
        });
    },
    // #endregion
}
export default {
    Rules,
}