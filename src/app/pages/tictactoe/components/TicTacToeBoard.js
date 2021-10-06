import { Grid, Center } from '@chakra-ui/react';
import { BoardItem } from './BoardItem';
import { BASE_BORDER_WIDTH } from '../../../constants';

export const TicTacToeBoard = ({board, onChange, matchedCombinationTiles,isHistory}) => {
  return (
    <Center>
      <Grid templateColumns="repeat(3, 1fr)" borderWidth={BASE_BORDER_WIDTH}>
      {
        board.map((row, i) => {
          return row.map((value, j) => {
            let withSuccessBackground = false;
            if (matchedCombinationTiles && matchedCombinationTiles.length) {
              matchedCombinationTiles.forEach((tile) => {
                if (tile[0] === i && tile[1] === j) {
                  withSuccessBackground = true;
                }
              });

            }
            return <BoardItem value={value} key={`${i}_${j}`} onChange={() => onChange(i, j)} withSuccessBackground={withSuccessBackground} isHistory={isHistory}/>
          })
        })
      }
      </Grid>
    </Center>
  )
}
