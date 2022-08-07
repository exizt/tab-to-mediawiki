var Tab2Dokuwiki = (function () {
    function Tab2Dokuwiki() {
    }
    Tab2Dokuwiki.prototype.convert = function (text, options) {
        return this.encodeText(text, options);
    };
    Tab2Dokuwiki.prototype.encodeText = function (text, options) {
        var result = "";
        var list = text.split(/\n/);
        for (var key in list) {
            var i = +key;
            var item = list[key];
            if (item.replace(/(^\s*)|(\s*$)/gi, "") == "") {
                continue;
            }
            if (options.isIncludedHeader && i == 0) {
                item = item.replace(/\t/g, " ^ ");
            }
            else {
                item = item.replace(/\t/g, " | ");
            }
            var it = "";
            if (options.isIncludedHeader && i == 0) {
                it += "^ ";
                it += item;
                it += " ^";
            }
            else {
                it += "| ";
                it += item;
                it += " |";
            }
            it += "\n";
            list[key] = it;
        }
        result += list.join('');
        return result;
    };
    return Tab2Dokuwiki;
}());
