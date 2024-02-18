import { DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import Player, { IPlayer, Position } from "../Player.ts";
import { ILeague, League } from "../League.ts";
import { Day } from "../Day.ts";
import { Round } from "../Round.ts";
import { Match } from "../Match.ts";
import { Team } from "../Team.ts";
import { IPlayerData, IRepository } from "./Repository.js";
import NotionService from "../services/NotionService.ts";

export type NotionResultArray = Array<PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse>;
export type NotionResultObject = PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse;

export interface INotionRepository extends IRepository {
  results: NotionResultArray;
}

class NotionRepository implements INotionRepository {
    results: NotionResultArray = [];
    league: ILeague | undefined;

    constructor() {}

    /**
     * Order the results by the id field
     * @returns void
     */
    orderResultsById = (): void => {
        const resultsOrdered = this.results?.sort((a, b) => {
            const IdA = Number((a as any).properties["ID"].title[0].text.content);
            const IdB = Number((b as any).properties["ID"].title[0].text.content);
            return IdA - IdB;
        });
        this.results = resultsOrdered as NotionResultArray;
    }

    /**
     * All row results have the same id for Jornada field, so we need to change it by the id of the result to make it unique.
     * @returns void
     */
    changeDaysIds = (): void => {
        this.results?.forEach((result: NotionResultObject) => {
            const dbRowUniqueId = result.id;
            const dbRow = (result as PageObjectResponse);
            ((dbRow as any).properties["Jornada"] as any).select.id = dbRowUniqueId;
        });
    }

    /**
     * Query all database rows
     * @returns Promise<void>
     */
    queryAllDatabaseRows = async (): Promise<void> => {
        const response = await new NotionService().fetchAllDatabaseRows();
        this.results = response?.results as NotionResultArray;
    }

    /**
     * Get all different days names from the database
     * @example ["Jornada 1", "Jornada 2", "Jornada 3"]
     * @returns Array<string>
     */
    getAllDifferentDaysNames = (): Array<string> => {
        const dayNames = [...new Set(this.results?.map(result => ((result as PageObjectResponse).properties["Jornada"] as any).select.name)) || []];
        return dayNames;
    }

    /**
     * Build the league object with the data from the database
     * @returns Promise<void>
     */
    getLeagueData = async (): Promise<void> => {
        this.league = new League();

        process.env.NODE_ENV !== 'test' ? await this.queryAllDatabaseRows() : null;
        this.orderResultsById();
        this.changeDaysIds();
        this.getAllDifferentDaysNames().forEach(dayName => {
            const daysArray = this.results?.filter(result => {
                const dbRow = (result as PageObjectResponse).properties;
                return (dbRow["Jornada"] as any).select.name === dayName;
            });
            
            daysArray.forEach(result => {
                const dbRow = (result as PageObjectResponse).properties;

                const day = new Day(dayName);

                const roundDescription = (dbRow["Ronda"] as any).select.name;
                const rivalName = (dbRow["Equipo contrario"] as any).select.name;
                const round = new Round(roundDescription, rivalName);
                day.setRound(round);

                const matchId = (dbRow["Partido"] as any).number;
                const match = new Match(matchId, rivalName);
                round.setMatch(match);

                const teamA = new Team('Panxes Rotges');
                const teamB = new Team(rivalName);

                const leftPlayerName = (dbRow["Jugador reves"] as any).select.name;
                const leftPlayerId = (dbRow["Jugador reves"] as any).select.id;
                const leftPlayerPosition = 'reves' as Position;
                const leftPlayerObject = this.league?.getPlayer(leftPlayerId) ?? new Player(leftPlayerId, leftPlayerName, leftPlayerPosition);
                leftPlayerObject.incrementMatchesPlayed();
                
                const rightPlayerName = (dbRow["Jugador drive"] as any).select.name;
                const rightPlayerId = (dbRow["Jugador drive"] as any).select.id;
                const rightPlayerPosition = 'drive' as Position;
                const rightPlayerObject = this.league?.getPlayer(rightPlayerId) ?? new Player(rightPlayerId, rightPlayerName, rightPlayerPosition);
                rightPlayerObject.incrementMatchesPlayed();

                teamA.setPlayers([leftPlayerObject as Player, rightPlayerObject as Player]);
                teamB.setPlayers([]);

                const pointsRegex = /^[0-7]$/;

                const firstSetResult = (dbRow["Set 1"] as any).rich_text.length > 0 ? (dbRow["Set 1"] as any).rich_text[0].text.content : undefined;
                const firstSetResultArray = firstSetResult?.split('-');
                if (
                    firstSetResultArray
                    && firstSetResultArray.length === 2
                    && pointsRegex.test(firstSetResultArray[0])
                    && pointsRegex.test(firstSetResultArray[1])
                ) {
                    const [ gamesLocalTeamFirstSet, gamesRivalTeamFirstSet ] = firstSetResult.split('-');
                    teamA.setGamesFirstSet(Number(gamesLocalTeamFirstSet));
                    rightPlayerObject.setGamesWon(Number(gamesLocalTeamFirstSet));
                    leftPlayerObject.setGamesWon(Number(gamesLocalTeamFirstSet));
                    teamB.setGamesFirstSet(Number(gamesRivalTeamFirstSet));
                }
                const secondSetResult = (dbRow["Set 2"] as any).rich_text.length > 0 ? (dbRow["Set 2"] as any).rich_text[0].text.content : undefined;
                const secondSetResultArray = secondSetResult?.split('-');
                if (
                    secondSetResultArray
                    && secondSetResultArray.length === 2
                    && pointsRegex.test(secondSetResultArray[0])
                    && pointsRegex.test(secondSetResultArray[1])
                ) {
                    const [ gamesLocalTeamSecondSet, gamesRivalTeamSecondSet ] = secondSetResult.split('-');
                    teamA.setGamesSecondSet(Number(gamesLocalTeamSecondSet));
                    rightPlayerObject.setGamesWon(Number(gamesLocalTeamSecondSet));
                    leftPlayerObject.setGamesWon(Number(gamesLocalTeamSecondSet));
                    teamB.setGamesSecondSet(Number(gamesRivalTeamSecondSet));
                }
                const thirdSetResult = (dbRow["Set 3"] as any).rich_text.length > 0 ? (dbRow["Set 3"] as any).rich_text[0].text.content : undefined;
                const thirdSetResultArray = thirdSetResult?.split('-');
                if (
                    thirdSetResultArray
                    && thirdSetResultArray.length === 2
                    && pointsRegex.test(thirdSetResultArray[0])
                    && pointsRegex.test(thirdSetResultArray[1])
                ) {
                    const [ gamesLocalTeamThirdSet, gamesRivalTeamThirdSet ] = thirdSetResult.split('-');
                    teamA.setGamesThirdSet(Number(gamesLocalTeamThirdSet));
                    rightPlayerObject.setGamesWon(Number(gamesLocalTeamThirdSet));
                    leftPlayerObject.setGamesWon(Number(gamesLocalTeamThirdSet));
                    teamB.setGamesThirdSet(Number(gamesRivalTeamThirdSet));
                }

                let teamASetsWon = 0;
                let teamBSetsWon = 0;
                if (teamA.getFirstSet().getGames() > teamB.getFirstSet().getGames()) {
                    rightPlayerObject.incrementSetsWon();
                    leftPlayerObject.incrementSetsWon();
                    teamASetsWon++;
                } else if (teamA.getFirstSet().getGames() < teamB.getFirstSet().getGames()) {
                    rightPlayerObject.incrementSetsLost();
                    leftPlayerObject.incrementSetsLost();
                    teamBSetsWon++;
                }

                if (teamA.getSecondSet().getGames() > teamB.getSecondSet().getGames()) {
                    rightPlayerObject.incrementSetsWon();
                    leftPlayerObject.incrementSetsWon();
                    teamASetsWon++;
                } else if (teamA.getSecondSet().getGames() < teamB.getSecondSet().getGames()) {
                    rightPlayerObject.incrementSetsLost();
                    leftPlayerObject.incrementSetsLost();
                    teamBSetsWon++;
                }

                if (
                    teamASetsWon < 2
                    && teamA.getThirdSet().getGames() > teamB.getThirdSet().getGames()
                ) {
                    rightPlayerObject.incrementSetsWon();
                    leftPlayerObject.incrementSetsWon();
                } else if (
                    teamASetsWon < 2
                    && teamA.getThirdSet().getGames() < teamB.getThirdSet().getGames()
                ) {
                    rightPlayerObject.incrementSetsLost();
                    leftPlayerObject.incrementSetsLost();
                }

                if (teamASetsWon > teamBSetsWon) {
                    rightPlayerObject.incrementMatchesWon();
                    leftPlayerObject.incrementMatchesWon();
                } else {
                    rightPlayerObject.incrementMatchesLost();
                    leftPlayerObject.incrementMatchesLost();
                }

                match.setLocalTeam(teamA);
                match.setRivalTeam(teamB);
                round.setMatch(match);
                day.setRound(round);
                this.league?.setPlayer(leftPlayerObject);
                this.league?.setPlayer(rightPlayerObject);
                this.league?.setDay(day);
            });
        });
    }

    /**
     * Returns a promise with the clasification data
     * @override IRepository.getClasificationData
     * @returns Promise<any>
     */
    getClasificationData = (): any => {}

    /**
     * Returns a promise with the matches data
     * @override IRepository.getMatchesData
     * @returns Promise<any>
     */
    getMatchesData = (): any => {}

    /**
     * Returns a promise with the stats data
     * @override IRepository.getStatsData
     * @returns Promise<any>
     */
    getStatsData = (): any => {}

    /**
     * Returns a promise with the players data
     * @override IRepository.getPlayersData
     * @returns Promise<Array<IPlayerData>>
     */
    getPlayersData = async (): Promise<Array<IPlayerData>> => {
        await this.getLeagueData();

        return this.league?.getPlayers().map((player: IPlayer) => {
            return player.toJSON();
        }) || [] as Array<IPlayerData>;
    }
}

export default NotionRepository;