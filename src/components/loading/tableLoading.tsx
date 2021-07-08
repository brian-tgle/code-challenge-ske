import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import { TableLoadingProps } from 'intefaces'

const TableLoading: FC<TableLoadingProps> = ({ colSpan }) => (
  <tr>
    {Array.from({ length: colSpan }).map((_, index) => (
      <td key={index}>
        <Skeleton />
      </td>
    ))}
  </tr>
)

export default TableLoading
