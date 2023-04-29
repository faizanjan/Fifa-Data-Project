const { top10Players, getGoalsByPlayers, getMatchesPlayedByPlayers } = require('../server/5-top-players-by-avg-goals.cjs');

describe("getMatchesPlayedByPlayers()", () => {

    let validPlayers = [
        {
            RoundID: '201',
            MatchID: '1093',
            'Team Initials': 'YUG',
            'Coach Name': 'SIMONOVIC Bosko (YUG)',
            'Line-up': 'N',
            'Shirt Number': '0',
            'Player Name': 'OSCARINO',
            Position: '',
            Event: "R47' OG56' "
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
            Event: "G51' G60' RSY68' "
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
            Event: "G67' "
        }]

    test("Throws Error if argument is not an Array", () => {
        expect(() => { getMatchesPlayedByPlayers("input") }).toThrow("Invalid Input Type");
        expect(() => { getMatchesPlayedByPlayers() }).toThrow("Invalid Input Type");
        expect(() => { getMatchesPlayedByPlayers(404) }).toThrow("Invalid Input Type");
        expect(() => { getMatchesPlayedByPlayers({}) }).toThrow("Invalid Input Type");
    })

    test("Returns an empty object if Player Name is not defined in the data", () => {
        let dataWithoutName = [{
            RoundID: '201',
            MatchID: '1093',
            'Team Initials': 'YUG',
            'Coach Name': 'SIMONOVIC Bosko (YUG)',
            'Line-up': 'N',
            'Shirt Number': '0',
            Position: '',
            Event: "R47' "
        }]
        expect(getMatchesPlayedByPlayers(dataWithoutName)).toEqual({});
        expect(getMatchesPlayedByPlayers(dataWithoutName)).toBeDefined();
        expect(getMatchesPlayedByPlayers(dataWithoutName)).not.toBeNull();
    })

    test("Returns an object with frequency of matches per player for proper data", () => {
        let expectedOutput = {
            OSCARINO: 2,
            'Branislav HRNJICEK': 1,
            BENVENUTTO: 1
        }
        expect(getMatchesPlayedByPlayers(validPlayers)).toEqual(expectedOutput);
    })

})

describe("getGoalsByPlayers()", () => {

    let validPlayers = [
        {
            RoundID: '201',
            MatchID: '1093',
            'Team Initials': 'YUG',
            'Coach Name': 'SIMONOVIC Bosko (YUG)',
            'Line-up': 'N',
            'Shirt Number': '0',
            'Player Name': 'OSCARINO',
            Position: '',
            Event: "R47' OG56' "
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
            Event: "G51' G60' RSY68' "
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
            Event: "G67' "
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
            Event: "G67' "
        }]

    test("Throws Error if argument is not an Array", () => {
        expect(() => { getGoalsByPlayers("input") }).toThrow("Invalid Input Type");
        expect(() => { getGoalsByPlayers() }).toThrow("Invalid Input Type");
        expect(() => { getGoalsByPlayers(404) }).toThrow("Invalid Input Type");
        expect(() => { getGoalsByPlayers({}) }).toThrow("Invalid Input Type");
    })

    test("Returns an empty object if Event is not defined in the match entry", () => {
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
        expect(getGoalsByPlayers(demoInput)).toEqual({});
    })

    test("Returns an object with number of goals per player for proper data", () => {
        let expectedOutput = {
            OSCARINO: 1,
            'Branislav HRNJICEK': 2,
            BENVENUTTO: 2
        }
        expect(getGoalsByPlayers(validPlayers)).toEqual(expectedOutput);
    })

})

describe("top10Players()", () => {

    let validPlayers = [
        {
            RoundID: '201',
            MatchID: '1093',
            'Team Initials': 'YUG',
            'Coach Name': 'SIMONOVIC Bosko (YUG)',
            'Line-up': 'N',
            'Shirt Number': '0',
            'Player Name': 'OSCARINO',
            Position: '',
            Event: "R47' OG56' "
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
            Event: "G51' G60' RSY68' "
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
            Event: "G67' "
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
            Event: "G67' "
        }]

    test("Throws Error if argument is not an Array", () => {
        expect(() => { top10Players("input") }).toThrow("Invalid Input Type");
        expect(() => { top10Players() }).toThrow("Invalid Input Type");
        expect(() => { top10Players(404) }).toThrow("Invalid Input Type");
        expect(() => { top10Players({}) }).toThrow("Invalid Input Type");
    })

    test("For proper arguments, returns an object with average goals per player per match", () => {
        let expectedOutput = { 'Branislav HRNJICEK': 2, BENVENUTTO: 1, OSCARINO: 0.5 }
        expect(top10Players(validPlayers)).toEqual(expectedOutput);
    })

})