const {redCardsPerTeamInAYear, getMatchsForYear} = require('../server/3-red-cards-per-team-in-2014.cjs');

describe("getMatchesForYear()", ()=>{
    test("Throws Error if first argument is not an Array", ()=>{
        expect(()=>{getMatchsForYear("input",2014)}).toThrow("Invalid Input Types");
        expect(()=>{getMatchsForYear(2014)}).toThrow("Invalid Input Types");
        expect(()=>{getMatchsForYear(404,2014)}).toThrow("Invalid Input Types");
        expect(()=>{getMatchsForYear({})}).toThrow("Invalid Input Types");
      })

    let validArg1 = [{
        Year: '2014',
        Datetime: '25 Jun 1950 - 15:00 ',
        Stage: 'Group 2',
        Stadium: 'Durival de Brito',
        City: 'Curitiba ',
        'Home Team Name': 'Spain',
        'Home Team Goals': '3',
        'Away Team Goals': '1',
        'Away Team Name': 'USA',
        'Win conditions': ' ',
        Attendance: '9511',
        'Half-time Home Goals': '0',
        'Half-time Away Goals': '1',
        Referee: 'VIANA Mario (BRA)',
        'Assistant 1': 'DA COSTA VIEIRA Jose (POR)',
        'Assistant 2': 'DE LA SALLE Charles (FRA)',
        RoundID: '208',
        MatchID: '1208',
        'Home Team Initials': 'ESP',
        'Away Team Initials': 'USA'
      }]
    test("Throws Error if second argument is not a number", ()=>{
        expect(()=>{getMatchsForYear(validArg1,"input")}).toThrow("Invalid Input Types");
        expect(()=>{getMatchsForYear(validArg1,[2014])}).toThrow("Invalid Input Types");
        expect(()=>{getMatchsForYear(validArg1)}).toThrow("Invalid Input Types");
        expect(()=>{getMatchsForYear(validArg1,{})}).toThrow("Invalid Input Types");
      })
    test("Returns an object when proper arguments are passed",()=>{
        expect(getMatchsForYear(validArg1,2014)).toEqual({'1208':true});
    })
})

describe("redCardsPerTeamInAYear()", ()=>{
    let validMatches = [{
        Year: '2014',
        Datetime: '25 Jun 1950 - 15:00 ',
        Stage: 'Group 2',
        Stadium: 'Durival de Brito',
        City: 'Curitiba ',
        'Home Team Name': 'Spain',
        'Home Team Goals': '3',
        'Away Team Goals': '1',
        'Away Team Name': 'USA',
        'Win conditions': ' ',
        Attendance: '9511',
        'Half-time Home Goals': '0',
        'Half-time Away Goals': '1',
        Referee: 'VIANA Mario (BRA)',
        'Assistant 1': 'DA COSTA VIEIRA Jose (POR)',
        'Assistant 2': 'DE LA SALLE Charles (FRA)',
        RoundID: '208',
        MatchID: '1093',
        'Home Team Initials': 'ESP',
        'Away Team Initials': 'USA'
      }];
    let validPlayers = [{
        RoundID: '201',
        MatchID: '1093',
        'Team Initials': 'YUG',
        'Coach Name': 'SIMONOVIC Bosko (YUG)',
        'Line-up': 'N',
        'Shirt Number': '0',
        'Player Name': 'Teofilo SPASOJEVIC',
        Position: '',
        Event: "R47' " 
      },
      {
        RoundID: '201',
        MatchID: '1093',
        'Team Initials': 'BRA',
        'Coach Name': 'DE CARVALHO Pindaro (BRA)',
        'Line-up': 'N',
        'Shirt Number': '0',
        'Player Name': 'OSCARINO',
        Position: '',
        Event: "G25' R28' "
      },
      {
        RoundID: '201',
        MatchID: '1093',
        'Team Initials': 'YUG',
        'Coach Name': 'SIMONOVIC Bosko (YUG)',
        'Line-up': 'N',
        'Shirt Number': '0',
        'Player Name': 'Branislav HRNJICEK',
        Position: '',
        Event: "OG51' RSY68' "
      },
      {
        RoundID: '201',
        MatchID: '1093',
        'Team Initials': 'BRA',
        'Coach Name': 'DE CARVALHO Pindaro (BRA)',
        'Line-up': 'N',
        'Shirt Number': '0',
        'Player Name': 'BENVENUTTO',
        Position: '',
        Event: ''
      }]

    test("Throws Error if first argument is not an Array", ()=>{
        expect(()=>{redCardsPerTeamInAYear("input",validPlayers,2014)}).toThrow("Invalid Input Types");
        expect(()=>{redCardsPerTeamInAYear(validPlayers,2014)}).toThrow("Invalid Input Types");
        expect(()=>{redCardsPerTeamInAYear(404,validPlayers,2014)}).toThrow("Invalid Input Types");
        expect(()=>{redCardsPerTeamInAYear({},validPlayers,2014)}).toThrow("Invalid Input Types");
      })

    test("Throws Error if second argument is not an Array", ()=>{
        expect(()=>{redCardsPerTeamInAYear(validMatches,"input",2014)}).toThrow("Invalid Input Types");
        expect(()=>{redCardsPerTeamInAYear(validMatches,2014)}).toThrow("Invalid Input Types");
        expect(()=>{redCardsPerTeamInAYear(validMatches,{},2014)}).toThrow("Invalid Input Types");
      })

    test("Throws Error if third argument is not a number", ()=>{
        expect(()=>{redCardsPerTeamInAYear((validMatches, validPlayers, "2014"))}).toThrow("Invalid Input Types");
        expect(()=>{redCardsPerTeamInAYear((validMatches, validPlayers, [2014]))}).toThrow("Invalid Input Types");
        expect(()=>{redCardsPerTeamInAYear((validMatches, validPlayers, {}))}).toThrow("Invalid Input Types");
        expect(()=>{redCardsPerTeamInAYear((validMatches, validPlayers))}).toThrow("Invalid Input Types");
      })

    test("Returns an object containing red cards freq of teams when proper arguments are passed",()=>{
        expect(redCardsPerTeamInAYear(validMatches,validPlayers,2014)).toEqual({ YUG: 2, BRA: 1 })
    })

    test("Returns an empty object if Event is not defined in the match entry",()=>{
        let demoInput = [{
            RoundID: '201',
            MatchID: '1093',
            'Team Initials': 'YUG',
            'Coach Name': 'SIMONOVIC Bosko (YUG)',
            'Line-up': 'N',
            'Shirt Number': '0',
            'Player Name': 'Teofilo SPASOJEVIC',
            Position: '',
          }];
        expect(redCardsPerTeamInAYear(validMatches,demoInput,2014)).toEqual({});
    })
})