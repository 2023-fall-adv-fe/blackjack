import { durationFormatter } from 'human-readable';

const format = durationFormatter<string>();

const justDaysFormat = durationFormatter<string> ({
    allowMultiples: ["y", "mo", "d"]
});
export type GameResult = {
    
    // won: boolean;
    players: Player[];
    
    start: string;
    end: string;
};
export type HandStatus = "Won" | "Lost" | "Blackjack";
type Hand = {
    num: number;
    status: HandStatus;
}
export type Player = {
    name: string;
    hands: Hand[];
}

export interface GeneralFactsDisplay {
    totalGames: number;
    lastPlayed: string; // milliseconds for now, but "display" implies human-readable...
    shortestGame: string;
    longestGame: string;
};

export interface LeaderboardEntry  {
    wins: number;
    losses: number;
    avg: number;
    blackJacks: number;
    name: string
};

export const getGeneralGameTimeFacts = (
    results: GameResult[]
    , fromDateMilliseconds: number 
): GeneralFactsDisplay => {

    const gameEndDatesInMilliseconds = results
        .map(x => Date.parse(x.end))
        .filter(x => x <= fromDateMilliseconds)
    ;

    const gameDurationsInMilliseconds = results
        .filter(x => Date.parse(x.end) <= fromDateMilliseconds)
        .map(x => Date.parse(x.end) - Date.parse(x.start))
    ;

    return {
        totalGames: results.length
        , lastPlayed: justDaysFormat(fromDateMilliseconds - Math.max(...gameEndDatesInMilliseconds))
        , shortestGame: format(Math.min(...gameDurationsInMilliseconds))
        , longestGame: format(Math.max(...gameDurationsInMilliseconds))
    };
};



export const getPreviousPlayers = (results: GameResult[]): string[] => {

    const previousPlayers = results
    .flatMap(x => x.players)
    .map(x => x.name)

    return [
        ...new Set(previousPlayers)
    ].sort(
        (a, b) => a.localeCompare(b)
    );
};




const getPlayerRecord = (
    player: string
    , results: GameResult[]
): LeaderboardEntry => {

    const playerResults = results
    .flatMap((result) =>
      result.players.filter((playerInfo) => playerInfo.name === player)
    )
    .flatMap(playerInfo => playerInfo.hands);

    const wins = playerResults.filter(
        (hand) => hand.status === 'Won' || hand.status === 'Blackjack'
      ).length;
    const totalHandsPlayed = playerResults.length;
    const losses = totalHandsPlayed - wins;
    const blackJacks = playerResults.filter(
        (hand) => hand.status === 'Blackjack'
      ).length;

  return {
    wins: wins,
    losses: losses,
    avg: wins / totalHandsPlayed,
    blackJacks: blackJacks,
    name: player,
    /*const wins = results.filter(x => x.winner == player).length;
    
    const gamesPlayerPlayed = results.filter(
        x => x.players.some(
            y => y.name == player
        )
    ).length;

    const losses = gamesPlayerPlayed - wins;

    return {
        wins: wins
        , losses: losses
        , avg: wins / gamesPlayerPlayed
        , name: player
    };*/
};
}


export const getLeaderboardData = (results: Array<GameResult>): LeaderboardEntry[] => {

    const previousPlayers = getPreviousPlayers(results);

    return previousPlayers.map(
        x => getPlayerRecord(x, results)
    ).sort(
        (a, b) => (b.avg * 1000 + b.wins + b.losses) - (a.avg * 1000 + a.wins + a.losses)
    );
};