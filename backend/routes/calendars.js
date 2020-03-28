const router = require('express').Router();
let Calendar = require('../models/calendar.model');

router.route('/all').get((req, res) => {
    Calendar.find()
        .then(calendars => res.json(calendars))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/public').get((req, res) => {
    Calendar.find({"public":"true"})
        .then(calendars => res.json(calendars))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/private/:calURL').get((req, res) => {
    Calendar.findOne({"calURL":req.params.calURL})
        .then(calendars => res.json(calendars))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const editKey = req.body.editKey
    const calName = req.body.calName;
    const calURL = req.body.calURL;
    const public = req.body.public;
    const description = req.body.description;
    const keywords = req.body.keywords;
    const creationDate = req.body.creationDate;

    const newCalendar = new Calendar({
        editKey,
        calName,
        calURL,
        public,
        description,
        keywords,
        creationDate
    });

    newCalendar.save()
        .then(() => res.json('New calendar added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Calendar.findById(req.params.id)
        .then(calendar => res.json(calendar))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    Calendar.findByIdAndDelete(req.params.id)
        .then(calendar => res.json("calendar deleted."))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(calendar => {
            calendar.editKey = req.body.editKey;
            calendar.calName = req.body.calName;
            calendar.calURL = req.body.calURL;
            calendar.public = req.body.public;
            calendar.description = req.body.description;
            calendar.keywords = req.body.keywords;
            calendar.creationDate = req.body.creationDate;

            calendar.save()
                .then(() => res.json("calendar updated..."))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;