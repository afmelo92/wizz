import { ButtonProps as ChakraButtonProps, Button } from '@chakra-ui/react'

type SubscribeButtonProps = {
  isLoading: boolean
} & ChakraButtonProps

export function SubscribeButton({
  isLoading,
  children,
  ...rest
}: SubscribeButtonProps) {
  return (
    <Button isLoading={isLoading} {...rest}>
      {children}
    </Button>
  )
}
