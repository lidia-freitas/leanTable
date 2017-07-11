/**
 * Created by Lidia Freitas on 05/07/2017.
 */

'use strict';

let repository = Object.create(dataRepository);

let dataService = {
    getAll: function (take, skip, searchString, orderColumn, ascending) {
        return new Promise(function (resolve, reject) {
            repository.getAll(take, skip, searchString, orderColumn, ascending).then(success).catch(fail);

            function success(response) {
                return resolve(response)
            }

            function fail(reason) {
                return reject(reason)
            }
        });
    }
};
