

const events = [
    // {
    //     editKey: 123456789,
    //     name: "",
    //     venue: "",
    //     startDate: new Date(1970, 0, 1, 17, 0),
    //     startTime: "",
    //     endDate: new Date(1970, 0, 1, 18, 0),
    //     endTime: "",
    //     description: "",
    //     ageRestriction: "",
    //     cover: "",
    //     keywords: ""
    // },
    // {
    //     editKey: 666,
    //     name: "ambient soup",
    //     venue: "someplace cozy",
    //     startDate: new Date(2020, 2, 13, 17, 0),
    //     startTime: "1:00",
    //     endDate: new Date(2020, 2, 13, 22, 0),
    //     endTime: "12:00",
    //     description: "ambient rave with soup ambient rave with soup ambient rave with soup ambient rave with soup ambient rave with soup dinner.. or are <you> the soup...?",
    //     ageRestriction: "on",
    //     cover: "20",
    //     keywords: "soup, ambient, djs"
    // },
    // {
    //     editKey: 69,
    //     name: "SOAK",
    //     venue: "Tygh Valley, OR",
    //     startDate: new Date(2020, 4, 21, 12, 0),
    //     startTime: "4:30pm",
    //     endDate: new Date(2020, 4, 25, 15, 0),
    //     endTime: "12:00",
    //     description: "burn everything, listen to tygh valley techno, and don't leave a fuckin trace okay?",
    //     ageRestriction: "off",
    //     cover: "15",
    //     keywords: "burn, burning man, y'alls camp"
    // },
    // {
    //     editKey: 420,
    //     name: "it's still february",
    //     venue: "home, mostly",
    //     startDate: new Date(2020, 2, 21, 12, 0),
    //     startTime: "11:00",
    //     endDate: new Date(2020, 2, 21, 15, 0),
    //     endTime: "12:00",
    //     description: "i wish it were sunny outside",
    //     ageRestriction: "on",
    //     cover: "free",
    //     keywords: "whatever, forever"
    // },
    // {
    //     editKey: 111113241,
    //     name: "daft punk is playing",
    //     venue: "my house (my house)",
    //     startDate: new Date(2020, 2, 21, 12, 0),
    //     startTime: "11:00",
    //     endDate: new Date(2020, 2, 21, 20, 0),
    //     endTime: "12:00",
    //     description: "i'll show you the ropes, kid, show you the. ropes.",
    //     ageRestriction: "on",
    //     cover: "free",
    //     keywords: "robots, people"
    // },
    // {
    //     editKey: 2,
    //     name: "groundhog's day",
    //     venue: "punxsatawney, PA",
    //     startDate: new Date(2020, 2, 2, 10, 0),
    //     startTime: "11:00",
    //     endDate: new Date(2020, 2, 2, 15, 0),
    //     endTime: "12:00",
    //     description: "i wish it were sunny outside",
    //     ageRestriction: "off",
    //     cover: "free",
    //     keywords: "rodent"
    // },
    // {
    //     editKey: 18,
    //     name: "this event is happening next month",
    //     venue: "venue",
    //     startDate: new Date(2020, 3, 1, 10, 0),
    //     startTime: "11:00",
    //     endDate: new Date(2020, 3, 1, 15, 0),
    //     endTime: "12:00",
    //     description: "doo be doo be doo",
    //     ageRestriction: "false",
    //     cover: "free",
    //     keywords: "just a simple test"
    // },
    // {
    //     editKey: 987654,
    //     name: "rave to the grave",
    //     venue: "a dark room",
    //     startDate: new Date(2020, 2, 21, 19, 0),
    //     startTime: "11:00",
    //     endDate: new Date(2020, 2, 22, 7, 0),
    //     endTime: "12:00",
    //     description: "d floor in a dark room whatchoo gonna do?",
    //     ageRestriction: "off",
    //     cover: "10",
    //     keywords: "techno"
    // }
];

const initState = { events }




function eventInfo(state=initState, action) {
    switch(action.type) {
        case 'CREATE_EVENT':
            console.log('created event!', action.event,state);
            return {
                events:[...state.events,action.event]
            }
        case 'GET_EVENTS':
            console.log('events received into reducer...', action.payload,state);
            action.payload.forEach(event => (event.startDate = new Date(event.startDate)));
            action.payload.forEach(event => (event.endDate = new Date(event.endDate)));
            return {
                events: [...state.events, ...action.payload]
            }
        default: return state}
    

}

export default eventInfo;