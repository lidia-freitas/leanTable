/**
 * Created by Lidia Freitas on 06/07/2017.
 */

let search = {
    init: function (htmlNode, table, callBack) {
        this.htmlElement = htmlNode;
        this.table = table;
        this.callbackSubmit = callBack;

        return this;
    },
    toHtml: function () {
        let self = this;
        self.htmlElement.innerHTML = self.getTemplate();
    },
    initializeEvents: function () {
        let self = this;

        self.htmlElement.addEventListener('submit', function (e) {
            e.preventDefault();

            for (let el of this.elements){
                if(el.getAttribute('type') === 'search'){
                    self.table.searchString = el.value;
                }
            }

            self.table.pageCurrent = 0;
            self.table.pageTake = 10;
            self.table.pageSkip = 0;

            self.callbackSubmit();
        }, false);
    },
    getTemplate: function () {
        return `<fieldset class="form-group">
                    <label for="input-search">Search: </label>
                    <div class="input-group">
                        <input class="form-control input-sm" type="search" placeholder="Search" name="search-term">
                        <button class="input-group-addon">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </fieldset>`;
    }
};
