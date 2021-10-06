import { Flex, Spacer, Grid, Center, Text, useToast, Input, Stack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export const BoardItem = ({value, onChange, withSuccessBackground}) => {
  if (value === 1) {
    return (
      <Flex align="center" justify="center" height="20" width="20" border="1px" borderColor="gray.200" background={withSuccessBackground ? 'yellow.100' : 'white'}>
        <Text fontSize="60">O</Text>
      </Flex>
    )
  }
  if (value === 2) {
    return (
      <Flex align="center" justify="center" height="20" width="20" border="1px" borderColor="gray.200" background={withSuccessBackground ? 'yellow.100' : 'white'}>
        <CloseIcon  w={10} h={10} color="red.500"/>
      </Flex>
    )
  }
  return (
    <Flex align="center" justify="center" height="20" width="20" bg="gray.300" border="1px" borderColor="gray.200" cursor="pointer" onClick={onChange}>
    </Flex>
  )
}
