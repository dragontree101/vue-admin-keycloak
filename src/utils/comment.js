import { deleteContract } from '@/api/contract'
import { MessageBox } from 'element-ui'

export function demo(message, multipleSelection, state) {
  if (multipleSelection === undefined) {
    return MessageBox.alert('嘻嘻')
  }
  const count = multipleSelection.length
  if (count > 0) {
    MessageBox.confirm(message, {
      confirmButtonText: '确定',
      cancelButtonText: '没有',
      type: 'warning'
    }).then(() => {
      let ids = ''
      multipleSelection.forEach(value => {
        ids += value.id + ','
      })
      deleteContract(ids, state)
      console.log(ids)
      return 'ok'
    })
  }
}

