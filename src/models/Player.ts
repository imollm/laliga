import type { ILeague } from "./League.ts";
import type { IMatch } from "./Match.ts";
import type { IPlayerData, IPlayerGameStats, IPlayerMatchStats, IPlayerSetStats, IPlayerStats } from "./repositories/Repository.ts";

export type Position = "drive" | "reves";

export interface IPlayer extends IPlayerData {
    id: string;
    name: string;
    position: Position;
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    setsWon: number;
    setsLost: number;
    gamesWon: number;
    isMVP: boolean;
    stats: IPlayerStats | undefined;

    getId: () => string;
    setId: (value: string) => void;
    getName: () => string;
    setName: (value: string) => void;
    getPosition: () => Position;
    setPosition: (value: Position) => void;
    getMatchesPlayed: () => number;
    incrementMatchesPlayed: () => void;
    getMatchesWon: () => number;
    incrementMatchesWon: () => void;
    getMatchesLost: () => number;
    incrementMatchesLost: () => void;
    getSetsWon: () => number;
    incrementSetsWon: () => void;
    getSetsLost: () => number;
    incrementSetsLost: () => void;
    getGamesWon: () => number;
    setGamesWon: (games: number) => void;
    setIsMVP: (value: boolean) => void;
    getIsMVP: () => boolean;
    toJSONWithStats: (league: ILeague) => IPlayerStats;
    toJSON: () => any;
}   

class Player implements IPlayer {
    id: string;
    name: string;
    position: Position;
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    setsWon: number;
    setsLost: number;
    gamesWon: number;
    isMVP: boolean;
    stats: IPlayerStats | undefined;
    
    constructor(id: string, name: string, position: Position) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.matchesPlayed = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.setsWon = 0;
        this.setsLost = 0;
        this.gamesWon = 0;
        this.isMVP = false;
        this.stats = undefined;
    }

    getId(): string {
        return this.id;
    }

    setId(value: string) {
        this.id = value;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
    }

    getPosition(): Position {
        return this.position;
    }

    setPosition(value: Position) {
        this.position = value;
    }

    getMatchesPlayed(): number {
        return this.matchesPlayed;
    }

    incrementMatchesPlayed() {
        this.matchesPlayed = this.getMatchesPlayed() + 1;
    }

    getMatchesWon(): number {
        return this.matchesWon;
    }

    incrementMatchesWon() {
        this.matchesWon = this.getMatchesWon() + 1;
    }

    getMatchesLost(): number {
        return this.matchesLost;
    }

    incrementMatchesLost() {
        this.matchesLost = this.getMatchesLost() + 1;
    }

    getSetsWon(): number {
        return this.setsWon;
    }

    incrementSetsWon() {
        this.setsWon = this.getSetsWon() + 1;
    }

    getSetsLost(): number {
        return this.setsLost;
    }

    incrementSetsLost() {
        this.setsLost = this.getSetsLost() + 1;
    }

    getGamesWon(): number {
        return this.gamesWon;
    }

    setGamesWon(games: number) {
        this.gamesWon = this.getGamesWon() + games;
    }

    setIsMVP(value: boolean) {
        this.isMVP = value;
    }

    getIsMVP(): boolean {
        return this.isMVP;
    }

    toJSONWithStats = (league: ILeague): IPlayerStats => {
        const playerData = this.toJSON() as IPlayerStats;
        const players: Array<IPlayer> = league.getPlayers().filter((player: IPlayer) => player.id !== this.id);
        const matches: Array<IMatch> = league.getMatchesByPlayerId(this.id);
        const playerStats: IPlayerStats = {
            ...playerData,
            stats: {
                matches: [],
                sets: [],
                games: []
            }
        };

        console.log(matches.length);

        for (let i = 0; i < players.length; i++) {
            const player = players.at(i) as IPlayer;
            const matchesPlayedWithCurrentColleague = matches.filter((match: IMatch) => {
                return match.getLocalTeam().getColleague(player)?.getId() === player.id;
            });

            if (matchesPlayedWithCurrentColleague.length === 0) {
                continue;
            }

            const colleagueToJson = player.toJSON();
            const matchStats: IPlayerMatchStats = {
                colleague: colleagueToJson,
                matches: {
                    won: {
                        count: 0,
                        percentage: 0,
                        percentageLabel: ""
                    },
                    lost: {
                        count: 0,
                        percentage: 0,
                        percentageLabel: ""
                    },
                    matchCount: 0
                }
            } as IPlayerMatchStats;
            const setsStats: IPlayerSetStats = {
                colleague: colleagueToJson,
                sets: {
                    won: {
                        count: 0,
                        percentage: 0,
                        percentageLabel: ""
                    },
                    lost: {
                        count: 0,
                        percentage: 0,
                        percentageLabel: ""
                    },
                    matchCount: 0
                }
            } as IPlayerSetStats;
            const gamesStats: IPlayerGameStats = {
                colleague: colleagueToJson,
                games: {
                    won: {
                        count: 0,
                        percentage: 0,
                        percentageLabel: ""
                    },
                    lost: {
                        count: 0,
                        percentage: 0,
                        percentageLabel: ""
                    },
                    matchCount: 0
                }
            } as IPlayerGameStats;

            matchesPlayedWithCurrentColleague.forEach((match: IMatch) => {
                match.isItWon() ? matchStats.matches.won.count++ : matchStats.matches.lost.count++;
                match.getLocalTeam().getSets().forEach((set, i) => {
                    const rivalSetGames = match.getRivalTeam().getSets().at(i)?.getGames();
                    const localSetGames = set.getGames();

                    if (localSetGames && rivalSetGames) {
                        localSetGames > rivalSetGames ? setsStats.sets.won.count++ : setsStats.sets.lost.count++;
                    }

                    gamesStats.games.won.count += localSetGames || 0;
                    gamesStats.games.lost.count += rivalSetGames || 0;
                });
            });

            matchStats.matches.matchCount = matchesPlayedWithCurrentColleague.length;
            matchStats.matches.won.percentage = (matchStats.matches.won.count / matchStats.matches.matchCount) * 100;
            matchStats.matches.won.percentageLabel = `${matchStats.matches.won.percentage.toFixed(2)}%`;
            matchStats.matches.lost.percentage = (matchStats.matches.lost.count / matchStats.matches.matchCount) * 100;
            matchStats.matches.lost.percentageLabel = `${matchStats.matches.lost.percentage.toFixed(2)}%`;

            setsStats.sets.matchCount = matchesPlayedWithCurrentColleague.length;
            setsStats.sets.won.percentage = (setsStats.sets.won.count / setsStats.sets.matchCount) * 100;
            setsStats.sets.won.percentageLabel = `${setsStats.sets.won.percentage.toFixed(2)}%`;
            setsStats.sets.lost.percentage = (setsStats.sets.lost.count / setsStats.sets.matchCount) * 100;
            setsStats.sets.lost.percentageLabel = `${setsStats.sets.lost.percentage.toFixed(2)}%`;

            gamesStats.games.matchCount = matchesPlayedWithCurrentColleague.length;
            gamesStats.games.won.percentage = (gamesStats.games.won.count / gamesStats.games.matchCount) * 100;
            gamesStats.games.won.percentageLabel = `${gamesStats.games.won.percentage.toFixed(2)}%`;
            gamesStats.games.lost.percentage = (gamesStats.games.lost.count / gamesStats.games.matchCount) * 100;
            gamesStats.games.lost.percentageLabel = `${gamesStats.games.lost.percentage.toFixed(2)}%`;

            playerStats.stats.matches.push(matchStats);
            playerStats.stats.sets.push(setsStats);
            playerStats.stats.games.push(gamesStats);
        }

        return playerStats;
    }

    toJSON = (): any => {
        return {
            id: this.id,
            name: this.name,
            position: this.position,
            matchesPlayed: this.matchesPlayed,
            matchesWon: this.matchesWon,
            matchesLost: this.matchesLost,
            setsWon: this.setsWon,
            setsLost: this.setsLost,
            gamesWon: this.gamesWon,
            isMVP: this.isMVP
        }
    }
}

export default Player;
