/**
 * Created by Lidia Freitas on 05/07/2017.
 */

let pager = {
    init: function (htmlNode, table, callBack) {
        this.htmlElement = htmlNode;
        this.table = table;
        this.pages = null;
        this.callbackClick = callBack;

        return this;
    },
    setPages: function (resource) {
        let self = this;

        self.pages = Math.ceil(resource.meta.totalCount/self.table.pageTake);
    },
    toHtml: function () {
        let self = this;

        while (self.htmlElement.firstChild) {
            self.htmlElement.removeChild(self.htmlElement.firstChild);
        }

        self.htmlElement.innerHTML = self.getTemplate(self.pages);

        self.htmlElement.firstChild.childNodes[self.table.pageCurrent].classList.add('active');
    },
    initializeEvents: function () {
        let self = this;

        for(let listItem of self.htmlElement.firstChild.childNodes){
            listItem.getElementsByTagName('a')[0].addEventListener('click', function (e) {
                e.preventDefault();

                self.htmlElement.firstChild.childNodes[self.table.pageCurrent].classList.remove('active');
                self.table.pageCurrent = parseInt(this.getAttribute('href') - 1);
                self.table.pageSkip = parseInt(this.getAttribute('href') - 1) * self.table.pageTake;
                self.htmlElement.firstChild.childNodes[self.table.pageCurrent].classList.add('active');

                self.callbackClick();

            }, false)
        }
    },
    getTemplate: function (pages) {
        let listItem = '';

        for (let i = 1; i <= pages; i++){
            listItem += `<li><a class="page-link" href="${i}">${i}</a></li>`;
        }

        return `<ul class="pagination pagination-sm" id="pagination-list">${listItem}</ul>`;
    }
};
