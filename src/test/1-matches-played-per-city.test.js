const matchesPerCity = require('../server/1-matches-played-per-city.cjs');


test("Returns an Object of Cities with the number of matches played there", () => {
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
      'Home Team Name': 'Sweden',
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
  const expectedOutput = {
    'Curitiba ': 1,
    'Sao Paulo ': 2,
    'Belo Horizonte ': 1,
  };

  expect(matchesPerCity(input)).toEqual(expectedOutput);
  expect(matchesPerCity(input)).not.toBeNull();
  expect(matchesPerCity(input)).toBeDefined();
})

test("Returns empty object if no valid city is provided in input", () => {
  const input = [
    { // city is object/array
      Year: '1950',
      Datetime: '25 Jun 1950 - 15:00 ',
      Stage: 'Group 2',
      Stadium: 'Durival de Brito',
      City: ['Curitiba '],
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
    { // city is number
      Year: '1950',
      Datetime: '25 Jun 1950 - 15:00 ',
      Stage: 'Group 3',
      Stadium: 'Pacaembu',
      City: 100,
      'Home Team Name': 'Sweden',
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
    { // city is boolean
      Year: '1950',
      Datetime: '25 Jun 1950 - 15:00 ',
      Stage: 'Group 1',
      Stadium: 'Independencia',
      City: true,
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
    { // city is empty string
      Year: '1950',
      Datetime: '28 Jun 1950 - 15:00 ',
      Stage: 'Group 1',
      Stadium: 'Pacaembu',
      City: '',
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
  ]
  expect(matchesPerCity(input)).toEqual({});
  expect(matchesPerCity(input)).toBeDefined();
  expect(matchesPerCity(input)).not.toBeNull();
})

test("Throws Error if input is not an Array", ()=>{
  expect(()=>{matchesPerCity("input")}).toThrow("Invalid Input Type");
  expect(()=>{matchesPerCity()}).toThrow("Invalid Input Type");
  expect(()=>{matchesPerCity(404)}).toThrow("Invalid Input Type");
  expect(()=>{matchesPerCity({})}).toThrow("Invalid Input Type");
})