import { forwardRef, ForwardRefRenderFunction } from 'react'
import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

type TextareaProps = {
  name: string
  label?: string
  error?: FieldError
  help?: string
} & ChakraTextareaProps

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, label, error = null, help, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraTextarea
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

export const Textarea = forwardRef(TextareaBase)
