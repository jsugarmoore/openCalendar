const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/:calURL').get((req, res) => {
    
    Event.find({"calendar":req.params.calURL}).sort({"startDate":1})
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req,res) => {
    const editKey = req.body.editKey;
    const calendar = req.body.calendar;
    const name = req.body.name;
    const venue = req.body.venue;
    const startDate = req.body.startDate;
    const startTime = req.body.startTime;
    const endDate = req.body.endDate;
    const endTime = req.body.endTime;
    const description = req.body.description;
    const ageRestriction = req.body.ageRestriction;
    const cover = req.body.cover;
    const keywords = req.body.keywords;
    const creationDate = req.body.creationDate;

    const newEvent = new Event({
      editKey,
      calendar,
      name,
      venue,
      startDate,
      startTime,
      endDate,
      endTime,
      description,
      ageRestriction,
      cover,
      keywords,
      creationDate
    });

    newEvent.save()
        .then(() => res.json('New event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/delete/:editKey').delete((req,res) => {
    Event.deleteOne({"editKey":req.params.editKey})
        .then(event => res.json("event deleted."))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:editKey').post((req,res) => {
    Event.findOne({"editKey":req.params.editKey})
        .then(event => {
            event.editKey = req.body.editKey;
            event.calendar = req.body.calendar;
            event.name = req.body.name;
            event.venue = req.body.venue;
            event.startDate = req.body.startDate;
            event.startTime = req.body.startTime;
            event.endDate = req.body.endDate; 
            event.endTime = req.body.endTime;
            event.description = req.body.description;
            event.ageRestriction = req.body.ageRestriction;
            event.cover = req.body.cover;
            event.keywords = req.body.keywords;
            event.creationDate = req.body.creationDate;
    
            event.save()
            .then(() => res.json("event updated..."))
            .catch(err => res.status(400).json('Error: ' + err))
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;