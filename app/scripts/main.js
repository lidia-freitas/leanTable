/**
 * Created by Lidia Freitas on 05/07/2017.
 */

'use strict';

let service = Object.create(dataService);

let table = Object.create(table).init(document.getElementById('leanTable'), tHeadOnClick);
let pager = Object.create(pager).init(document.getElementById('pager'), table, pagerOnClick);
let rowsLength = Object.create(rowsLengthSelector).init(document.getElementById('rows-length'), table, rowLengthOnChange);
let search = Object.create(search).init(document.getElementById('component-input-search'), table, searchOnSubmit);
let notification = Object.create(notification).init(document.getElementById('notification'));

activate();

function activate() {
    service.getAll(table.pageTake, table.pageSkip, table.searchString, table.orderColumn, table.ascending).then(success).catch(fail);

    function success(result) {
        if(result.meta.count === 0){
            createNotificationElement();
            notification.show('warning', 'no results');
            return;
        }
        createTableElement(result);
        createPagerElement(result);
        createRowsLengthElement(result);
        createSearchElement();
        createNotificationElement();
    }

    function fail(reason) {
        console.log(reason);
        createNotificationElement();
        notification.show('danger', reason);
    }
}

// ui interactions callbacks
function rowLengthOnChange() {
    service.getAll(table.pageTake, table.pageSkip, table.searchString, table.orderColumn, table.ascending).then(success).catch(fail);

    function success(result) {
        createTableElement(result);
        createPagerElement(result);
        createRowsLengthElement(result);
    }

    function fail(reason) {
        console.log(reason);
    }
}

function pagerOnClick() {
    service.getAll(table.pageTake, table.pageSkip, table.searchString, table.orderColumn, table.ascending).then(success).catch(fail);

    function success(result) {
        createTableElement(result);
        createPagerElement(result);
        createRowsLengthElement(result);
    }

    function fail(reason) {
        console.log(reason);
    }
}

function tHeadOnClick() {
    service.getAll(table.pageTake, table.pageSkip, table.searchString, table.orderColumn, table.ascending).then(success).catch(fail);

    function success(result) {
        createTableElement(result);
        createPagerElement(result);
        createRowsLengthElement(result);
    }

    function fail(reason) {
        console.log(reason);
    }
}

function searchOnSubmit() {
    service.getAll(table.pageTake, table.pageSkip, table.searchString, table.orderColumn, table.ascending).then(success).catch(fail);

    function success(result) {
        if(result.meta.count === 0){
            notification.show('warning', `Sorry, we did not find any results for the search term ${table.searchString}`);
            table.searchString = '';
            return;
        }
        createTableElement(result);
        createPagerElement(result);
        createRowsLengthElement(result);
    }

    function fail(reason) {
        console.log(reason);
    }
}


// initializers
function createTableElement(response) {
    table.setHeader(response);
    table.setBody(response);
    table.toHtml();
    table.initializeEvents();
}

function createPagerElement(response) {
    pager.setPages(response);
    pager.toHtml();
    pager.initializeEvents();
}

function createRowsLengthElement(response) {
    rowsLength.setOptions(response);
    rowsLength.toHtml();
    rowsLength.initializeEvents();
}

function createSearchElement() {
    search.toHtml();
    search.initializeEvents();
}

function createNotificationElement() {
    notification.toHtml();
    notification.initializeEvents();
}
