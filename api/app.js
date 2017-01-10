
  /*
  * This is an api that consumes football data from football-data.org
  * It displays the league-table of popular leagues in the football
  * world for the year 2016/2017 
  */

  // setting up the required variables and constants
  var requestPromise = require('request-promise'),
      requireReadline = require('readline'),
        apiUrl = "",
         chalk = require('chalk'),
           num = 0;

  const readLine = requireReadline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // handles the input from the user so the required league can be accessed
  console.log(chalk.green("Enter the appropriate number to check the league table for the following leagues. EPL -> 1  ::  Championship -> 2  ::  Champions League -> 3"));

  readLine.question('==>  ', (ref) => {
    num = parseInt(ref);

    switch (num) {
      case 1: 
        apiUrl = 'http://api.football-data.org/v1/competitions/426/leagueTable';
        getLeagueTable();
        break;
      case 2: 
        apiUrl = 'http://api.football-data.org/v1/competitions/427/leagueTable';
        getLeagueTable();
        break;
      case 3: 
        apiUrl = 'http://api.football-data.org/v1/competitions/440/leagueTable';
        getLeagueTable();
        break;
      default:
        console.log(chalk.red("Please enter a valid number"));
    } 

    readLine.close();
  });

  // function that performs the http request to football-data.org
  function getLeagueTable() {
    var options = {
      uri: apiUrl,
      json: true
    };

    requestPromise(options)

    .then(function(response) {
      if (!response) getLeagueTable();
       
      var leagueTableInfo = response;
      printLeagueTable(leagueTableInfo);
    })

    .catch(function(err) {
      console.log(chalk.red('Unable to fetch data', err));
    })
  }

  // function that prints out the league-table
  function printLeagueTable(leagueTableInfo) {  
    console.log("");

    if (num === 3) {
      var leagueStanding = leagueTableInfo.standings;
      console.log(chalk.cyan.bold("Champions League (CL)"));
      cl();     
      for (var groups in leagueStanding) {
        for (var info in leagueStanding[groups]) {
          console.log(chalk.gray(outputFormat(leagueStanding[groups][info].group,"grp") 
            + outputFormat(leagueStanding[groups][info].rank,"rank") 
            + outputFormat(leagueStanding[groups][info].team,"teamCL") 
            + outputFormat(leagueStanding[groups][info].playedGames,"") 
            + outputFormat(leagueStanding[groups][info].goals,"") 
            + outputFormat(leagueStanding[groups][info].goalsAgainst,"") 
            + outputFormat(leagueStanding[groups][info].goalDifference) 
            + outputFormat(leagueStanding[groups][info].points)
        	));
        }  
      }
    } else {    
      var leagueStanding = leagueTableInfo.standing; 

      if (num === 1) {
        console.log(chalk.cyan.bold("English Premier League (EPL)"));
      } else {
        console.log(chalk.cyan.bold("Championship (ELC)"));
      }

      eplAndElc();
      for (var info in leagueStanding) {
        console.log(chalk.gray(outputFormat(leagueStanding[info].position,"#") 
          + outputFormat(leagueStanding[info].teamName,"teamName") 
          + outputFormat(leagueStanding[info].playedGames,"")
          + outputFormat(leagueStanding[info].wins,"") 
          + outputFormat(leagueStanding[info].draws,"") 
          + outputFormat(leagueStanding[info].losses,"") 
          + outputFormat(leagueStanding[info].goals,"")
					+ outputFormat(leagueStanding[info].goalsAgainst,"") 
          + outputFormat(leagueStanding[info].goalDifference,"") 
          + outputFormat(leagueStanding[info].points,"")
				));
      }
    }
  } 
   
  // heading to display EPL and ELC league-tables 
  function eplAndElc() {
    console.log(chalk.black.bgWhite("#    " 
			+ "           TEAMNAME           "  
			+ " GP  " 
			+ "  W  " 
			+ " D  " 
			+ "  L  " 
			+ "   G  " 
			+ " GA  " 
			+ " GD  " 
			+ " PTS "
		));
  }

  // heading to display the Champions League(CL) table
  function cl() {
    console.log(chalk.black.bgWhite("GROUP  " 
			+ " RANK  " 
			+ "             TEAM             " 
			+ "  GP  " 
			+ " G   " 
			+ " GA  " 
			+ " GD  " 
			+ " PTS  "
		));
  }

  // to space out the output in a redable format (f -> format)
  function outputFormat(value, sign) {
    var space = 5;

    if (sign === "#") {
      value = value.toString();
      space -= value.length;
    } else if (sign === "teamName") {
      space = 31;
      space -= value.length;
    } else if (sign === "grp") {
      space = 9;
      space -= value.length;
    } else if (sign === "rank") {
      value = value.toString();
      space = 10;
      space -= value.length;
    } else if (sign === "teamCL") {
      space = 27;
      space -= value.length;
    } else {
      value = value.toString();
      space -= value.length;
    }

    for (var i = 1; i <= space; i++) {
      value = value + " ";
    }

    return value;
  }
