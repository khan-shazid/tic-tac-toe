import { Text, Box } from '@chakra-ui/react';
import { BASE_BLUE, blue_300, BASE_GRAY } from '../../../constants';

export const ActivityLog = ({ activities }) => {
  return (
    <Box>
    {
      activities.length ?
      <Text align="center" fontWeight={800} p={1} color={BASE_BLUE}>Activity Log</Text>
      : <></>
    }
    {
      activities.map((item, i) => {
        return (
          <Text key={`activity_${i}`} align="center" fontWeight={500} p={1} color={i%2 === 1 ? blue_300 : BASE_GRAY}>{`#${i + 1} - ${item.player.name} has chosen row - ${item.row}, column - ${item.column}`}</Text>
        )
      })
    }
    </Box>
  )
}
