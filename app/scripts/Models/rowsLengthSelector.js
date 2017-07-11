/**
 * Created by Lidia Freitas on 05/07/2017.
 */

let rowsLengthSelector = {
    init: function (htmlNode, table, callBack) {
        this.htmlElement = htmlNode;
        this.table = table;
        this.select = null;
        this.options = null;
        this.callbackChange = callBack;

        return this;
    },
    setOptions: function (resource) {
        let self = this;
        self.options = Math.ceil(resource.meta.totalCount/10);
    },
    toHtml: function () {
        let self = this;

        while (self.htmlElement.firstChild) {
            self.htmlElement.removeChild(self.htmlElement.firstChild);
        }

        self.htmlElement.innerHTML = self.getTemplate();

        for(let item of self.htmlElement.elements){
            if(item.id === 'rows-length-element'){
                self.select  = item;            }
        }

        self.select.value = self.table.pageTake;
    },
    initializeEvents: function(){
        let self = this;

        self.select.addEventListener('change', function () {
            self.table.pageCurrent = 0;
            self.table.pageTake = parseInt(this.value);
            self.table.pageSkip = 0;

            self.callbackChange();
        }, false);
    },
    getTemplate: function () {
        let self = this;
        let option = '';

        for(let i = 1; i<= self.options; i++){
            option += `<option value="${i * 10}">${i * 10}</option>`;
        }

        return `<fieldset class="form-group">
                    <label for="rows-length">Items by page:</label>
                    <select class="form-control input-sm" id="rows-length-element">${option}</select>
                </fieldset>`;
    }
};
