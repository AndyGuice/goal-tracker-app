import { format } from 'date-fns'

export const displayGoalOnCadence = (cadence: String, quantity: Number) => {
  // console.log('Cadence: ', cadence)
  // console.log('Quantity :', quantity)

  let today = format(new Date(), 'MM/dd/yyyy')

  // console.log('Today: ', today)

  if (cadence === 'daily') {
    // daily means always display, basically
  }

  if (cadence === 'weekly') {
    // display only 
  }

  if (cadence === 'monthly') {
    
  }

  return false
}
