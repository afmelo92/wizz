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
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
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
  const { register, setValue } = useFormContext()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    inputRef.current.value = ''
    inputRef?.current.click()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target?.files
    setFieldValue(value[0].name)
    setValue(name, value)
  }

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <input
        name={name}
        type="file"
        {...register(name)}
        hidden
        onChange={handleChange}
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
