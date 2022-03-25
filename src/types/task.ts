class TrackingSettings {
  amount: Number = 0
  cadence: String = ''
}

class Task {
  id: String = ''
  title: String = ''
  goalId: String = ''
  startOn: String = ''
  endOn: String = ''
  createdOn: String = ''
  updatedOn: String = ''
  datesCompleted: String[] = []
  settings: TrackingSettings = { amount: 0, cadence: '' }
}

export default Task
