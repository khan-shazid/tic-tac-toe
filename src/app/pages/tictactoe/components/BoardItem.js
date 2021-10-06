import { Flex, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { BASE_BORDER_WIDTH, BaseBorderColor, WHITE, yellow_100, gray_300 } from '../../../constants';

export const BoardItem = ({value, onChange, withSuccessBackground, isHistory}) => {
  if (value === 1) {
    return (
      <Flex align="center" justify="center" height="20" width="20" border={BASE_BORDER_WIDTH} borderColor={BaseBorderColor()} background={withSuccessBackground ? yellow_100 : WHITE}>
        <Text fontSize="60">O</Text>
      </Flex>
    )
  }
  if (value === 2) {
    return (
      <Flex align="center" justify="center" height="20" width="20" border={BASE_BORDER_WIDTH} borderColor={BaseBorderColor()} background={withSuccessBackground ? yellow_100 : WHITE}>
        <CloseIcon  w={10} h={10} color="red.500"/>
      </Flex>
    )
  }
  if (isHistory) {
    return (
      <Flex align="center" justify="center" height="20" width="20" bg={gray_300} border={BASE_BORDER_WIDTH} borderColor={BaseBorderColor()}>
      </Flex>
    )
  }
  return (
    <Flex align="center" justify="center" height="20" width="20" bg={gray_300} border={BASE_BORDER_WIDTH} borderColor={BaseBorderColor()} cursor={"pointer"} onClick={onChange}>
    </Flex>
  )
}
