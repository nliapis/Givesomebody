module.exports = function(Gift) {

    // method which lists all free gifts
    Gift.listFree = function(cb) {
        Gift.find({
            fields: {
                reserved: false
            }
        }, cb);
    };

    // expose the above method through the REST
    Gift.remoteMethod('listFree', {
        returns: {
            arg: 'gifts',
            type: 'array'
        },
        http: {
            path: '/list-free',
            verb: 'get'
        }
    });

    // method to return if the gift is free
    Gift.isFree = function(id, cb) {
        var response;
        Gift.find({
            fields: {
                id: id
            }
        }, function(err, gift) {
            if (err) return cb(err);

            if (gift.reserved)
                response = 'Sorry, the gift is reserved';
            else
                response = 'Great, this gift can be yours';

        });
        cb(null, response);
    };

    // expose the method through REST
    Gift.remoteMethod('isFree', {
        accepts: {
            arg: 'id',
            type: 'number'
        },
        returns: {
            arg: 'response',
            type: 'string'
        },
        http: {
            path: '/free',
            verb: 'post'
        }
    });
};