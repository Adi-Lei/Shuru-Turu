const { log } = require('console');
const fs = require('fs');
// variables
const dataPath = './data/shuruTuru.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (!data) data = "{}";
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.log(err);
        }

        callback();
    });
};

date_format = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
isMail = /^\S+@\S+\.\S+$/
isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/

module.exports = {

    getTour: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                if (JSON.parse(data).hasOwnProperty(req.params.name) == false)
                    return res.status(404).send("The name tour is not exsist")
                res.send(!data ? JSON.parse("{}") : JSON.parse(data)[req.params.name]);
            }
        });
    },

    getTours: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                dataJson = JSON.parse(data)
                tours = []
                for (let key in dataJson) {
                    if (dataJson.hasOwnProperty(key)) {
                        tours.push(key)
                    }
                }
                tours.sort()
                let newData = {}
                for (let i = 0; i < tours.length; i++) {
                    for (let key in dataJson) {
                        if (dataJson.hasOwnProperty(key)) {
                            if (key == tours[i])
                                newData[key] = dataJson[key]
                        }
                    }
                }
                res.send(newData);
            }
        });
    },
    // CREATE

    createTour: function (req, res) {
        readFile(data => {
            //validtion
            for (let key in req.body) {
                if (!key) return res.status(400).send("Name tour is require")
                if (!req.body[key].start_date || !req.body[key].duration || !req.body[key].price)
                    return res.status(400).send("start date and duration and price is require")
                if (!req.body[key].guide.name || !req.body[key].guide.email || !req.body[key].guide.cellular)
                    return res.status(400).send("guide info is require")
            }
            for (let key in req.body) {
                if (data[key])
                    return res.status(400).send("The tour already exsist ")
                if (!date_format.test(req.body[key].start_date))
                    return res.status(400).send("invalid syntax1")
                if (typeof (req.body[key].duration) === 'string' || typeof (req.body[key].price) === 'string')
                    return res.status(400).send("invalid syntax2")
                if (typeof (req.body[key].guide.name) !== 'string')
                    return res.status(400).send("invalid syntax3")
                if (!isMail.test(req.body[key].guide.email))
                    return res.status(400).send("invalid syntax4")
                if (!isNumeric.test(req.body[key].guide.cellular) || typeof (req.body[key].guide.cellular) !== 'string')
                    return res.status(400).send("invalid syntax5")
            }

            if (!req.body) return res.sendStatus(500);
            data = { ...data, ...req.body } // merge the data and the new object


            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(data);
            });
        },
            true);
    },

    // UPDATE
    updateTour: function (req, res) {
        readFile(data => {
            const tourId = req.params["id"];
            if (Object.keys(req.body).length === 0) {
                return res.sendStatus(400).send("data is require");
            }
            if (data[tourId]) {
                for (let field of Object.keys(req.body)) {
                    if (field == "guide") {
                        for (let s of Object.keys(req.body["guide"])) {
                            data[tourId][field][s] = req.body[field][s]
                        }
                    }
                    else
                        data[tourId][field] = req.body[field]
                }
            }
            else {
                res.sendStatus(400).send("error in update")
            };
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(data);
            });
        },
            true);
    },

    createSiteInPath: function (req, res) {
        readFile(data => {
            const tourId = req.params["id"];
            if (Object.keys(req.body).length === 0)
                return res.sendStatus(400).send("data is require");

            if (data[tourId])     
            {
                for (obj in data[tourId].path) {
                    if (data[tourId].path[obj].name == req.body.name)
                        return res.status(400).send("The site already exsist")
                }
                data[tourId].path.push(req.body)
            }
            else res.sendStatus(400);
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(data);
            });
        },
            true);
    },

    // DELETE
    deleteSite: function (req, res) {
        readFile(data => {
            const tourId = req.params["id"];
            const siteName = req.params["name"];
            if (data[tourId]) {
                if (siteName === "ALL") // delete all sites
                    data[tourId].path.splice(0, data[tourId].path.length)
                for (obj in data[tourId].path) {
                    if (data[tourId].path[obj].name == siteName)
                        data[tourId].path.splice(obj, 1)
                }
            }
            else res.sendStatus(404).send("Tour not found");
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(data);
            });
        },
            true);
    },

    deleteTour: function (req, res) {
        readFile(data => {
            const tourId = req.params["id"];
            if (data[tourId]) {
                delete data[tourId]
            }
            else res.sendStatus(404).send("Tour not found");
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(data);
            });
        },
            true);
    }
};


