import { ChangeEvent, useState } from 'react'
import useDebounce from 'hooks/useDebounce'
import { UnavailableItems } from 'intefaces'
import { unionList } from 'utils'
import { DEBOUNCE_TIME, TEST_DATA } from '../constants'

const ChallengeTwo = () => {
  const defaultTestData = JSON.stringify(TEST_DATA)
  const [data, setData] = useState<string>(defaultTestData)
  const [result, setResult] = useState('')
  const debouncedData: string = useDebounce(data, DEBOUNCE_TIME)

  const handleProcess = () => {
    try {
      const unavailableItems: Array<UnavailableItems> = JSON.parse(debouncedData)
      const processedData = unionList(unavailableItems)
      setResult(JSON.stringify(processedData))
    } catch (exception: any) {
      setResult(`Error: ${exception?.message}`)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData(event?.target?.value)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card__title">
          <span>
            <b>Note: </b>
            <i>Edit the value to get the new result</i>
          </span>
        </div>
        <div className="card__body">
          <textarea className="textarea" rows={5} onChange={handleChange} value={data}></textarea>
          <button onClick={handleProcess}>Process</button>
          <p>{result}</p>
        </div>
      </div>
    </div>
  )
}

export default ChallengeTwo
