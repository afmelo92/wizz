import { forwardRef, ForwardRefRenderFunction } from 'react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

type InputProps = {
  name: string
  label?: string
  error?: FieldError
} & ChakraInputProps

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        type="email"
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.800'
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
