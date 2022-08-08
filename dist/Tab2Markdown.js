"use strict";
var Tab2Markdown = (function () {
    function Tab2Markdown() {
    }
    Tab2Markdown.prototype.convert = function (text, options) {
        return this.encodeText(text, options);
    };
    Tab2Markdown.prototype.encodeText = function (text, options) {
        var result = "";
        var list = text.split(/\n/);
        for (var key in list) {
            var i = +key;
            var item = list[key];
            if (item.replace(/(^\s*)|(\s*$)/gi, "") == "") {
                continue;
            }
            item = item.replace(/\t/g, " | ");
            var it = "";
            it += "| ";
            it += item;
            it += " |";
            if (options.isIncludedHeader && i == 0) {
                var tabCount = (list[key].match(/\t/g) || []).length + 1;
                if (tabCount > 0) {
                    it += "\n" + '|---'.repeat(tabCount) + '|';
                }
            }
            it += "\n";
            list[key] = it;
        }
        result += list.join('');
        return result;
    };
    return Tab2Markdown;
}());
