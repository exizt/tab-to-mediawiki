"use strict";
var Tab2Mediawiki = (function () {
    function Tab2Mediawiki() {
        this.output = '';
    }
    Tab2Mediawiki.prototype.convert = function (text, options) {
        return (options.isReverse) ? this.decodeText(text, options) : this.encodeText(text, options);
    };
    Tab2Mediawiki.prototype.encodeText = function (text, options) {
        var result = "";
        var list = text.split(/\n/);
        if (!options.isOnlyItems) {
            if (options.isSortable) {
                result += "{| class=\"wikitable sortable\"\n";
            }
            else {
                result += "{| class=\"wikitable\"\n";
            }
        }
        for (var key in list) {
            var i = +key;
            var item = list[key];
            if (item.replace(/(^\s*)|(\s*$)/gi, "") == "") {
                continue;
            }
            if (options.isIncludedHeader && i == 0) {
                item = item.replace(/\t/g, " !! ");
            }
            else {
                item = item.replace(/\t/g, " || ");
            }
            var it = "|-\n";
            if (options.isIncludedHeader && i == 0) {
                it += "! ";
            }
            else {
                it += "| ";
            }
            it += item;
            it += "\n";
            list[key] = it;
        }
        result += list.join('');
        if (!options.isOnlyItems) {
            result += "|}";
        }
        return result;
    };
    Tab2Mediawiki.prototype.decodeText = function (text, options) {
        var result = "";
        text = text.replace(/(\n\|\})/, "");
        var list = text.split(/(\n\|-\n)/);
        for (var key in list) {
            var i = +key;
            var item = list[key];
            if (item.replace(/(\n\|-\n)/gi, "") == "") {
                continue;
            }
            if (i <= 1) {
                var firstcheck = /(^\{\|)/i;
                if (firstcheck.test(item)) {
                    continue;
                }
            }
            item = item.replace(/(^!)/, "");
            item = item.replace(/(^\|)/, "");
            item = item.replace(/(^\s)|(\s*$)/gi, "");
            item = item.replace(/(\s*\|\|\s*)/g, "\|\|");
            item = item.replace(/(\s*!!\s*)/g, "!!");
            item = item.replace(/(\|\|)/gi, "\t");
            item = item.replace(/(!!)/gi, "\t");
            result += item;
            result += "\n";
        }
        return result;
    };
    return Tab2Mediawiki;
}());
