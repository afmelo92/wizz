import { forwardRef, ForwardRefRenderFunction } from 'react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

type InputProps = {
  name: string
  label?: string
  error?: FieldError
  help?: string
} & ChakraInputProps

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, help, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="pink.500"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!help && <FormHelperText color="gray.200">{help}</FormHelperText>}

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
