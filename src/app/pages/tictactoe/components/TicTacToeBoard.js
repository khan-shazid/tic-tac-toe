import { Grid } from '@chakra-ui/react';
import { BoardItem } from './BoardItem';
export const TicTacToeBoard = ({board}) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" borderWidth="1px">
    {
      board.map((row, i) => {
        return row.map((value, j) => {
          return <BoardItem value={value} key={`${i}_${j}`} />
        })
      })
    }
    </Grid>
  )
}
