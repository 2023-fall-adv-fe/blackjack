
export type GameResult = {
    won: boolean;
    start: string;
    end: string;
};

export interface WinningPercentageDisplay {
    totalGames: number;
    winningPercentage: string; // Formatted to two decimal places with a % sign
};

export const getWinningPercentageDisplay = (results: GameResult[]): WinningPercentageDisplay => {

    const wins = results.filter(x => x.won).length;
    const totalGames = results.length;
    const wp = totalGames > 0
        ? (wins / totalGames) * 100
        : 0
    ;

    // console.log(wins, results.length);

    return {
        // totalGames: totalGames
        totalGames
        , winningPercentage: `${wp.toFixed(2)}%`
    };
};

