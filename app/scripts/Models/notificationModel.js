/**
 * Created by Lidia Freitas on 06/07/2017.
 */

let notification = {
    init: function (htmlNode) {
        this.htmlElement = htmlNode;
        this.type = null;
        this.msg = null;

        return this;
    },
    toHtml: function () {
        let self = this;

        while (self.htmlElement.firstChild) {
            self.htmlElement.removeChild(self.htmlElement.firstChild);
        }

        self.htmlElement.innerHTML = self.getTemplate();

    },
    show: function (type, msg) {
        let self = this;

        self.type = type;
        self.msg = msg;
        self.htmlElement.getElementsByClassName('msg')[0].innerText = self.msg;
        self.htmlElement.classList.add('alert-'+self.type);
        self.htmlElement.style.display = 'block';
    },
    hide: function () {
        let self = this;

        self.type = null;
        self.msg = null;
        self.htmlElement.style.display = 'none';
    },
    initializeEvents: function () {
      let self = this;

      self.htmlElement.getElementsByClassName('btn-close')[0].addEventListener('click', function () {
        self.hide();
      }, false);

    },
    getTemplate: function () {
        let self = this;

        return `<span class="msg">${self.msg}</span>
                <button class="close btn-close" datadismiss="alert" arialabel="close">
                    <span class="glyphicon glyphicon-remove" ariahidden="true"></span>
                </button>`;
    }
};
