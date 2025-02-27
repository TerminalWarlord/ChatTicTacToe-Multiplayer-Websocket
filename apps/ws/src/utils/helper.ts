


export function getWinner(state: string[][]): boolean {
    if (!state) {
        return false;
    }
    // @ts-ignore
    const diagonalMatch = (state[0][0] === state[1][1] && state[1][1]?.length && state[1][1] === state[2][2]) || (state[0][2] === state[1][1] && state[1][1] === state[2][0] && state[1][1]?.length);

    if (diagonalMatch) {
        return true;
    }

    for (let i = 0; i < 3; i++) {
        // @ts-ignore
        if ((state[i][0] === state[i][1] && state[i][1] === state[i][2] && state[i][2]?.length)
            // @ts-ignore
            || (state[0][i] === state[1][i] && state[1][i] === state[2][i] && state[2][i]?.length)
        ) {
            return true;
        }
    }
    return false;
}

export function checkMatchStatus(state: string[][]){

    let count=0;

    state.forEach(row=>{
        row.forEach(col=>{
            if(col!=""){
                count+=1;
            }
        })
    });


    return count===9;
}



// console.log(isDraw([
//     ["1","1","0",],
//     ["1","1","0",],
//     ["1","1","0",],
//     // ["","","",],
// ]))