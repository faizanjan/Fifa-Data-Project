const matchesWonPerTeam = require('../server/2-matches-won-per-team.cjs');


test("Returns an Object of Teams with the number of matches they won", () => {
  const input = [
    {
      Year: '1950',
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
    },
    {
      Year: '1950',
      Datetime: '25 Jun 1950 - 15:00 ',
      Stage: 'Group 3',
      Stadium: 'Pacaembu',
      City: 'Sao Paulo ',
      'Away Team Name': 'Sweden',
      'Away Team Goals': '3',
      'Home Team Goals': '2',
      'Home Team Name': 'Italy',
      'Win conditions': ' ',
      Attendance: '36502',
      'Half-time Home Goals': '2',
      'Half-time Away Goals': '1',
      Referee: 'LUTZ Jean (SUI)',
      'Assistant 1': 'BERANEK Alois (AUT)',
      'Assistant 2': 'TEJADA Carlos (MEX)',
      RoundID: '208',
      MatchID: '1219',
      'Home Team Initials': 'SWE',
      'Away Team Initials': 'ITA'
    },
    {
      Year: '1950',
      Datetime: '25 Jun 1950 - 15:00 ',
      Stage: 'Group 1',
      Stadium: 'Independencia',
      City: 'Belo Horizonte ',
      'Home Team Name': 'Yugoslavia',
      'Home Team Goals': '3',
      'Away Team Goals': '0',
      'Away Team Name': 'Switzerland',
      'Win conditions': ' ',
      Attendance: '7336',
      'Half-time Home Goals': '0',
      'Half-time Away Goals': '0',
      Referee: 'GALEATI Giovanni (ITA)',
      'Assistant 1': 'EKLIND Ivan (SWE)',
      'Assistant 2': 'DATTILO Generoso (ITA)',
      RoundID: '208',
      MatchID: '1230',
      'Home Team Initials': 'YUG',
      'Away Team Initials': 'SUI'
    },
    {
      Year: '1950',
      Datetime: '28 Jun 1950 - 15:00 ',
      Stage: 'Group 1',
      Stadium: 'Pacaembu',
      City: 'Sao Paulo ',
      'Home Team Name': 'Brazil',
      'Home Team Goals': '2',
      'Away Team Goals': '2',
      'Away Team Name': 'Switzerland',
      'Win conditions': ' ',
      Attendance: '42032',
      'Half-time Home Goals': '2',
      'Half-time Away Goals': '1',
      Referee: 'AZON ROMA Ramon (ESP)',
      'Assistant 1': 'BUSTAMANTE Sergio (CHI)',
      'Assistant 2': 'DE NICOLA Cayetano (PAR)',
      RoundID: '208',
      MatchID: '1188',
      'Home Team Initials': 'BRA',
      'Away Team Initials': 'SUI'
    }
  ];
  const expectedOutput = { Spain: 1, Sweden: 1, Yugoslavia: 1 }

  expect(matchesWonPerTeam(input)).toEqual(expectedOutput);
  expect(matchesWonPerTeam(input)).not.toBeNull();
  expect(matchesWonPerTeam(input)).toBeDefined();
})

test("Returns empty object if no valid winner can be extracted from in input", () => {
  const input = [
    { // winner is object/array
      Year: '1950',
      Datetime: '25 Jun 1950 - 15:00 ',
      Stage: 'Group 2',
      Stadium: 'Durival de Brito',
      City: 'Curitiba ',
      'Home Team Name': ['Spain'],
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
    },
    { // winner is number
      Year: '1950',
      Datetime: '25 Jun 1950 - 15:00 ',
      Stage: 'Group 3',
      Stadium: 'Pacaembu',
      City: 'Delhi',
      'Home Team Name': 404,
      'Home Team Goals': '3',
      'Away Team Goals': '2',
      'Away Team Name': 'Italy',
      'Win conditions': ' ',
      Attendance: '36502',
      'Half-time Home Goals': '2',
      'Half-time Away Goals': '1',
      Referee: 'LUTZ Jean (SUI)',
      'Assistant 1': 'BERANEK Alois (AUT)',
      'Assistant 2': 'TEJADA Carlos (MEX)',
      RoundID: '208',
      MatchID: '1219',
      'Home Team Initials': 'SWE',
      'Away Team Initials': 'ITA'
    },
    { // winner is boolean
      Year: '1950',
      Datetime: '25 Jun 1950 - 15:00 ',
      Stage: 'Group 1',
      Stadium: 'Independencia',
      City: 'Yugoslavia',
      'Home Team Name': true,
      'Home Team Goals': '3',
      'Away Team Goals': '0',
      'Away Team Name': 'Switzerland',
      'Win conditions': ' ',
      Attendance: '7336',
      'Half-time Home Goals': '0',
      'Half-time Away Goals': '0',
      Referee: 'GALEATI Giovanni (ITA)',
      'Assistant 1': 'EKLIND Ivan (SWE)',
      'Assistant 2': 'DATTILO Generoso (ITA)',
      RoundID: '208',
      MatchID: '1230',
      'Home Team Initials': 'YUG',
      'Away Team Initials': 'SUI'
    },
    { // winner is empty string
      Year: '1950',
      Datetime: '28 Jun 1950 - 15:00 ',
      Stage: 'Group 1',
      Stadium: 'Pacaembu',
      City: 'Srinagar',
      'Home Team Name': '',
      'Home Team Goals': '3',
      'Away Team Goals': '2',
      'Away Team Name': 'Switzerland',
      'Win conditions': ' ',
      Attendance: '42032',
      'Half-time Home Goals': '2',
      'Half-time Away Goals': '1',
      Referee: 'AZON ROMA Ramon (ESP)',
      'Assistant 1': 'BUSTAMANTE Sergio (CHI)',
      'Assistant 2': 'DE NICOLA Cayetano (PAR)',
      RoundID: '208',
      MatchID: '1188',
      'Home Team Initials': 'BRA',
      'Away Team Initials': 'SUI'
    }
  ]
  expect(matchesWonPerTeam(input)).toEqual({});
  expect(matchesWonPerTeam(input)).toBeDefined();
  expect(matchesWonPerTeam(input)).not.toBeNull();
})

test("Throws Error if input is not an Array", ()=>{
  expect(()=>{matchesWonPerTeam("input")}).toThrow("Invalid Input Type");
  expect(()=>{matchesWonPerTeam()}).toThrow("Invalid Input Type");
  expect(()=>{matchesWonPerTeam(404)}).toThrow("Invalid Input Type");
  expect(()=>{matchesWonPerTeam({})}).toThrow("Invalid Input Type");
})

test("Returns empty object if the match is drawn", ()=>{
    const input = [
        { // Match draw
            Year: '1950',
            Datetime: '28 Jun 1950 - 15:00 ',
            Stage: 'Group 1',
            Stadium: 'Pacaembu',
            City: 'Srinagar',
            'Home Team Name': 'Sweden',
            'Home Team Goals': '2',
            'Away Team Goals': '2',
            'Away Team Name': 'Switzerland',
            'Win conditions': ' ',
            Attendance: '42032',
            'Half-time Home Goals': '2',
            'Half-time Away Goals': '1',
            Referee: 'AZON ROMA Ramon (ESP)',
            'Assistant 1': 'BUSTAMANTE Sergio (CHI)',
            'Assistant 2': 'DE NICOLA Cayetano (PAR)',
            RoundID: '208',
            MatchID: '1188',
            'Home Team Initials': 'BRA',
            'Away Team Initials': 'SUI'
          },
        ]
        expect(matchesWonPerTeam(input)).toEqual({});
        expect(matchesWonPerTeam(input)).not.toBeNull();
        expect(matchesWonPerTeam(input)).toBeDefined();
})

test("Should throw error if number of goals are polluted with anything other than numbers",()=>{
    const input = [
        [{ // polluted goal count 
            'Home Team Name': 'Sweden',
            'Home Team Goals': '2$',
            'Away Team Goals': '2',
            'Away Team Name': 'Switzerland'
        }],
        [{ // invalid type of goals
            'Home Team Name': 'Sweden',
            'Home Team Goals': [],
            'Away Team Goals': '2',
            'Away Team Name': 'Switzerland'
        }],
        [{ // Invalid type of goals - 2
            'Home Team Name': 'Sweden',
            'Home Team Goals': '2',
            'Away Team Goals': 'two',
            'Away Team Name': 'Switzerland'
        }],
        ];
        for(let ip of input){
            expect(()=>{matchesWonPerTeam(ip)}).toThrow("Number of goals are not valid");
        }
})