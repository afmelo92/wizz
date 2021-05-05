import {
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Button,
  Icon
} from '@chakra-ui/react'
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
  useState
} from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

type InputProps = {
  name: string
  label?: string
  error?: FieldError
  help?: string
  buttonLabel?: string
} & ChakraInputProps

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error, label, buttonLabel, help },
  ref
) => {
  const [fieldValue, setFieldValue] = useState('')
  const { watch, register } = useFormContext()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    inputRef?.current.click()
  }

  useEffect(() => {
    setFieldValue(watch(name, '')[0]?.name)
  }, [watch(name)])

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <input
        name={name}
        type="file"
        {...register(name)}
        hidden
        ref={e => {
          ref
          inputRef.current = e
        }}
      />
      <Button
        size="lg"
        width="100%"
        background={'purple.500'}
        leftIcon={<Icon as={FiFile} />}
        _hover={{ background: 'purple.700' }}
        onClick={handleButtonClick}
      >
        {fieldValue || buttonLabel}
      </Button>
      {!!help && <FormHelperText color="gray.200">{help}</FormHelperText>}
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const FileInput = forwardRef(InputBase)
