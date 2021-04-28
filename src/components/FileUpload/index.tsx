import { ReactNode, useRef } from 'react'
import {
  Button,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Icon,
  InputGroup
} from '@chakra-ui/react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

type FileUploadProps = {
  name?: string
  label: string
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
  children?: ReactNode
  error?: FieldError
  buttonLabel?: string
  buttonColor?: string
  help?: string
} & ChakraInputProps

const FileUpload = ({
  name,
  register,
  accept,
  multiple,
  error,
  label,
  buttonLabel,
  help
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void
  }

  const handleClick = () => inputRef.current?.click()
  return (
    <FormControl isInvalid={!!error} isRequired>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup onClick={handleClick}>
        <input
          type={'file'}
          multiple={multiple || false}
          hidden
          accept={accept}
          {...rest}
          ref={e => {
            ref(e)
            inputRef.current = e
          }}
        />

        <Button
          size="lg"
          width="100%"
          background={'purple.500'}
          leftIcon={<Icon as={FiFile} />}
          _hover={{ background: 'purple.700' }}
        >
          {buttonLabel}
        </Button>
      </InputGroup>
      {!!help && <FormHelperText color="gray.200">{help}</FormHelperText>}
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default FileUpload
