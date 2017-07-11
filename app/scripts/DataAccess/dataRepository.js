/**
 * Created by Lidia Freitas on 05/07/2017.
 */

'use strict';


let dataRepository = {
    getAll: function (take, skip, searchString, orderColumn, ascending) {
        let localApi = 'http://localhost:53258/api/albumRest';
        let remoteApi = 'http://aleatorium.gear.host/api/albumRest';

        let resourceApi = Object.create(resorce).init(`${remoteApi}?take=${take}&skip=${skip}&searchString=${searchString}&orderColumn=${orderColumn}&ascending=${ascending}`);

        return new Promise (function (resolve, reject) {
            resourceApi.query().then(success).catch(fail);

            function success(result) {
                return resolve(result)
            }

            function fail(reason) {
                return reject(reason)
            }
        });
    }
};
