/**
 * Created by Lidia Freitas on 05/07/2017.
 */

let table = {
    init: function (htmlNode, callBack) {
        this.htmlElement = htmlNode;
        this.header = [];
        this.body = [];
        this.callbackClick = callBack;

        this.pageTake = 10;
        this.pageSkip = 0;
        this.pageCurrent = 0;
        this.totalCount = 0;
        this.searchString = '';
        this.orderColumn = '';
        this.ascending = true;

        return this;
    },
    setHeader: function (resource) {
        let self = this;

        self.header = Object.keys(resource.multipleData[0]);
    },
    setBody: function (resource) {
        let self = this;

        self.totalCount = resource.meta.totalCount;
        self.orderColumn = resource.meta.orderColumn;
        self.body = [];

        resource.multipleData.forEach(function (obj) {
            let row = [];

            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    row.push(obj[prop]);
                }
            }
            self.body.push(row);
        });
    },
    toHtml: function () {
        let self = this;

        while (this.htmlElement.firstChild) {
            this.htmlElement.removeChild(this.htmlElement.firstChild);
        }

        self.htmlElement.innerHTML = self.getTemplate();

        for (let item of self.htmlElement.getElementsByTagName('th')) {
            if(item.innerText === self.orderColumn){
                item.classList.add('active');

               let icon = item.getElementsByTagName('i')[0];

                if(self.ascending){
                    icon.classList.add('glyphicon-sort-by-attributes');
                }else {
                    icon.classList.add('glyphicon-sort-by-attributes-alt');
                }
            }
        }
    },
    createSummary: function () {
        let self = this;
        let initialEntry = self.pageCurrent * self.pageTake + 1;
        let finalEntry = self.pageCurrent * self.pageTake + self.pageTake;

        finalEntry = finalEntry > self.totalCount ? self.totalCount : finalEntry;

        return 'Showing <span>' + initialEntry + '</span> to <span>' + finalEntry + '</span> of <span>' + self.totalCount + '</span> entries'
    },
    initializeEvents: function () {
        let self = this;

        for (let header of self.htmlElement.getElementsByTagName('th')) {
            header.addEventListener('click', function () {
                if (self.orderColumn === this.innerText) {
                    self.ascending = !self.ascending;
                } else {
                    self.orderColumn = this.innerText;
                    self.ascending = true;
                }

                self.callbackClick();
            }, false);
        }
    },
    getTemplate: function () {
        let self = this;

        return `<thead>
                    <tr>${self.header.map(item => `<th>${item}<i class="glyphicon"></i></th>`).join('')}</tr>
                </thead>
                <tbody>
                    ${self.body.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}                    
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="${self.header.length}">${self.createSummary()}</td>
                    </tr>
                </tfoot>`;
    }
};




