const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

var { Student } = require('../model/student');

//For getting list of students
router.get('/', (req, res) => {
    Student.find((err, docs) => {
        if (!err) {
            res.send(docs);
            console.log(JSON.stringify(docs));
        } else {
            console.log('Error in retrieve students: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


//For getting student by Id
router.get('/:id', (req, res) => {
    if (!objectId.isValid(req.params.id))
        return res.status(400).send('No record with given ID: ' + req.params.id);
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error while retrieving student by ID: ' + $(req.params.id) + ". Error: " + JSON.stringify(err, undefined, 2));
        }
    });
});

//For post/insert
router.post('/', (req, res) => {
    var student = new Student({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        major: req.body.major,
        campus: req.body.campus
    });
    student.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error while saving the Student record: ' + JSON.stringify(err, undefined, 2));
            res.status(409).send(JSON.stringify(err));
        }
    });
});

//For put/update record
router.put('/:id', (req, res) => {
    if (!objectId.isValid(req.params.id))
        return res.status(400).send('No record with given ID: ' + req.params.id);
    var student = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        major: req.body.major,
        campus: req.body.campus
    };

    //new: true means doc will have updated record of student otherwise contains old data
    Student.findByIdAndUpdate(req.params.id, { $set: student }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error while updating the Student record with id: ' + req.params.id + '. Error: ' + + JSON.stringify(err, undefined, 2));
        }
    });

});

//For deleting student
router.delete('/:id', (req, res) => {
    if (!objectId.isValid(req.params.id))
        return res.status(400).send('No record with given ID: ' + req.params.id);

    Student.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error while deleting the Student record with id: ' + req.params.id + '. Error: ' + + JSON.stringify(err, undefined, 2));
        }
    });

});

module.exports = router;